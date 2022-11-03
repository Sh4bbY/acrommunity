import puppeteer from 'puppeteer';
import {Scraper} from './Scraper';

export class PartneracrobaticsScraper extends Scraper {
  async run() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();

    const sections = await this.getSections();
    const flows = await this.getFlows(sections);
    // const detailedPoses = await this.getPoseDetails(poses);

    this.saveResults(flows, 'flows/partneracrobatics-flows.json');

    await this.browser.close();
  }

  async getSections() {
    const url = 'https://partneracrobatics.com/manual/l-basing';
    await this.page.goto(url);

    const resultsSelector = '.bialty-container > p:first-of-type a';
    await this.page.waitForSelector(resultsSelector);

    return await this.page.evaluate(resultsSelector => {
      const sections = Array.from(document.querySelectorAll(resultsSelector));
      return sections.map(section => ({
        name: section.textContent.trim(),
        url: section.getAttribute('href'),
      }));

    }, resultsSelector);
  }

  async getFlows(sections) {
    const subSectionData = [];

    for (let section of sections) {
      await this.page.goto(section.url);

      const resultsSelector = '.tg-filters-holder .tg-filter.tg-show-filter';
      await this.page.waitForSelector(resultsSelector);
      await this.page.waitForTimeout(500);

      const subSections = await this.page.evaluate(resultsSelector => {
        const subSections = Array.from(document.querySelectorAll(resultsSelector));
        return subSections.map(filter => filter.textContent);

      }, resultsSelector);

      for (let i = 1; i < subSections.length; i++) {
        console.log('process section', section.name, ' - ', subSections[i]);
        await this.page.evaluate((resultsSelector, idx) => document.querySelectorAll(resultsSelector)[idx].dispatchEvent(new Event('click')), resultsSelector, i);
        await this.page.waitForTimeout(50);

        const items = await this.page.evaluate(() => {
          const items = Array.from(document.querySelectorAll('.tg-grid-holder .tg-item:not(.tg-item-hidden)'));
          return items.map(item => ({
            youtube: item.querySelector('iframe.tg-item-youtube')?.getAttribute('data-src'),
            url: item.querySelector('.tg-item-title a')?.getAttribute('href'),
            name: item.querySelector('.tg-item-title a')?.textContent,
          }));
        });

        subSectionData.push(items.map(item => ({
          ...item,
          section: section.name,
          subSection: subSections[i].substring(0, subSections[i].lastIndexOf('(')).trim(),
        })));
      }
    }
    return subSectionData;
  }
}
