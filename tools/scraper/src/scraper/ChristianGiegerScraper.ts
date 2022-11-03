import puppeteer from 'puppeteer';
import {Scraper} from './Scraper';

export class ChristianGiegerScraper extends Scraper {
  async run() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();

    const poses = await this.getPoses();
    const detailedPoses = await this.getPoseDetails(poses);

    this.saveResults(detailedPoses, 'poses/christian-gieger-poses.json');

    await this.browser.close();
  }

  async getPoses() {
    const url = 'https://www.christiangieger.de/acroyoga-poses/';
    await this.page.goto(url);

    const resultsSelector = '.e-add-posts-wrapper article.e-add-post-item';
    await this.page.waitForSelector(resultsSelector);

    return await this.page.evaluate(resultsSelector => {
      const poses = Array.from(document.querySelectorAll(resultsSelector));
      return poses.map(pose => ({
        name: pose.querySelector('.e-add-item_custommeta span').textContent.trim(),
        url: pose.querySelector('.e-add-item_image a').getAttribute('href'),
        thumbnail: pose.querySelector('.e-add-item_image img').getAttribute('src'),
      }));
    }, resultsSelector);
  }

  async getPoseDetails(poses: { name: string, url: string }[]) {
    const detailed = [];
    for (let pose of poses) {
      console.log(`progress pose "${pose.name}" at ${pose.url}`);

      await this.page.goto(pose.url);
      const resultsSelector = '.elementor-container';
      await this.page.waitForSelector(resultsSelector);

      const details = await this.page.evaluate(resultsSelector => {
        const image = document.querySelector(resultsSelector + ' img.attachment-full').getAttribute('src');

        const entries = Array.from(document.querySelectorAll(resultsSelector + ' ul.elementor-icon-list-items .elementor-icon-list-text'));
        const aliasesHTML = entries.find(entry => entry.textContent.includes('alternative Bezeichnungen'))?.innerHTML.trim();
        const aliases = aliasesHTML?.substr(aliasesHTML.indexOf('</b>') + 4).trim().split(',').map(alias => alias.trim());
        const variationElements = Array.from(document.querySelectorAll(resultsSelector + ' .e-add-querytype-attachment .e-add-querytype-post'));
        const variations = variationElements.map(el => ({
          name: el.querySelector('.e-add-item_caption p').textContent.trim(),
          img: el.querySelector('a.e-add-post-image').getAttribute('href'),
        }));

        return {image, aliases, variations};
      }, resultsSelector);

      detailed.push({...pose, ...details});
    }

    return detailed;
  }
}
