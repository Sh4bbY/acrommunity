import puppeteer from 'puppeteer';
import {Scraper} from './Scraper';

export class AcropediaScraper extends Scraper {
  async run() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();

    const poses = await this.getPoses();
    const detailedPoses = await this.getPoseDetails(poses);

    this.saveResults(detailedPoses, 'poses/acropedia-poses.json');

    await this.browser.close();
  }

  async getPoses() {
    const url = 'https://www.acropedia.org/poses/?_sf_ppp=175';
    await this.page.goto(url);

    const resultsSelector = '.search-filter-results';
    await this.page.waitForSelector(resultsSelector);

    return await this.page.evaluate(resultsSelector => {
      const poses = Array.from(document.querySelectorAll(resultsSelector + ' .post-item'));
      return poses.map(pose => ({
        name: pose.querySelector('.entry-title a').textContent.trim(),
        url: pose.querySelector('.entry-title a').getAttribute('href'),
      }));

    }, resultsSelector);
  }

  async getPoseDetails(poses: { name: string, url: string }[]) {
    const detailed = [];
    for (let pose of poses) {
      console.log(`progress pose "${pose.name}" at ${pose.url}`);

      await this.page.goto(pose.url);
      const resultsSelector = 'article.poses';
      await this.page.waitForSelector(resultsSelector);

      const details = await this.page.evaluate(resultsSelector => {
        const image = document.querySelector(resultsSelector + ' .entry-content img').getAttribute('src');
        const tableRows = Array.from(document.querySelectorAll(resultsSelector + ' table.acro-meta-fields tr'));
        const positionType = tableRows.find(row => row.textContent.includes('Position Type'))?.querySelector('td:nth-of-type(2)').textContent.trim();
        const difficulty = tableRows.find(row => row.textContent.includes('Difficulty'))?.querySelector('td:nth-of-type(2)').textContent.trim();
        const numberOfPersons = tableRows.find(row => row.textContent.includes('Number of Persons'))?.querySelector('td:nth-of-type(2)').textContent.trim();
        const persons = Number(numberOfPersons.substr(0, 1));

        const tags = Array.from(tableRows.find(row => row.textContent.includes('Tagged'))?.querySelectorAll('td:nth-of-type(2) a') || []).map(a => ({
          name: a.textContent,
          url: a.getAttribute('href'),
        }));
        const skills = Array.from(tableRows.find(row => row.textContent.includes('Skills with'))?.querySelectorAll('td:nth-of-type(2) a') || []).map(a => ({
          name: a.textContent,
          url: a.getAttribute('href'),
        }));
        const text = Array.from(document.querySelectorAll(resultsSelector + ' .entry-content p')).map(p => p.outerHTML.trim()).reduce((desc, p) => desc + p, '');

        return {image, positionType, difficulty, persons, text, tags, skills};
      }, resultsSelector);

      detailed.push({...pose, ...details});
    }

    return detailed;
  }
}
