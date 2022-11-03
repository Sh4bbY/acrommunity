import puppeteer from 'puppeteer';
import {Scraper} from './Scraper';

export class AcrodictedScraper extends Scraper {
  async run() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();

    const poses = [];
    for (let i = 1; i <= 172; i++) {
      const pose = await this.getPose(i);
      if (pose) {
        poses.push(pose);
        console.log('processed pose #' + i);
      } else {
        console.log('skipped pose #' + i);
      }
    }

    this.saveResults(poses, 'poses/acrodicted-poses.json');

    await this.browser.close();
  }

  async getPose(id: number) {
    await this.page.goto('http://www.acrodicted.com/poses/' + id);

    await this.page.waitForNetworkIdle();
    const isErrorPage = await this.page.evaluate(() => !!document.querySelector('.error-spacer'));
    if (isErrorPage) {
      return null;
    }

    // Wait for the results page to load and display the results.
    const resultsSelector = '.panel.panel-default.pose';
    await this.page.waitForSelector(resultsSelector);

    // Extract the results from the page.
    const name = await this.page.evaluate(resultsSelector => document.querySelector(resultsSelector + ' h2').textContent.trim(), resultsSelector);
    const descriptionHTML = await this.page.evaluate(resultsSelector => document.querySelector(resultsSelector + ' .description').innerHTML.trim(), resultsSelector);
    const thumbnail = await this.page.evaluate(resultsSelector => document.querySelector(resultsSelector + ' .media-container img').getAttribute('src'), resultsSelector);
    const image = thumbnail.replace('thumbnail', 'original');

    const {flyerPosition, basePosition, contactPoint} = await this.page.evaluate(resultsSelector => ({
      basePosition: document.querySelector(resultsSelector + ' .table.table tr:nth-of-type(1) td:nth-of-type(2)').textContent.trim(),
      flyerPosition: document.querySelector(resultsSelector + ' .table.table tr:nth-of-type(2) td:nth-of-type(2)').textContent.trim(),
      contactPoint: document.querySelector(resultsSelector + ' .table.table tr:nth-of-type(3) td:nth-of-type(2)').textContent.trim(),
    }), resultsSelector);


    const {fromSource, toTarget} = await this.page.evaluate((resultsSelector, name) => {
      function getNthPosition(input, search, n) {
        return input.split(search, n).join(search).length + search.length;
      }

      function getNthLastPosition(input, search, n) {
        let idx = input.length - search.length;
        let occurrences = 0;
        for (; occurrences < n && idx > 0; idx--) {
          if (input.substr(idx).startsWith(search)) {
            occurrences++;
          }
        }
        return occurrences < n ? -1 : idx + 1;
      }

      const transitions = document.querySelectorAll(resultsSelector + ' .transitions');
      const sources = transitions[0];
      let results = Array.from(sources.querySelectorAll('.neighbour a h4')).map(el => el.textContent.trim());
      const nameToCount = (name.match(/ to /g) || []).length;

      const fromSource = results.map(result => result.substr(0, getNthLastPosition(result, ' to ', nameToCount + 1)).trim());

      const targets = transitions[1];
      results = Array.from(targets.querySelectorAll('.neighbour a h4')).map(el => el.textContent.trim());
      const toTarget = results.map(result => result.substr(getNthPosition(result, ' to ', nameToCount + 1)).trim());

      return {fromSource, toTarget};
    }, resultsSelector, name);

    const description = descriptionHTML.replace(/\n/g, '')
      .replace(/[\t ]+\</g, '<')
      .replace(/\>[\t ]+\</g, '><')
      .replace(/\>[\t ]+$/g, '>');

    return {id, name, image, thumbnail, description, basePosition, flyerPosition, contactPoint, fromSource, toTarget};
  }
}
