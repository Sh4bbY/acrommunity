import fs from 'fs';
import {Browser, Page} from 'puppeteer';

export class Scraper {
  browser: Browser = null;
  page: Page = null;

  protected saveResults(results: any, fileName) {
    try {
      const data = JSON.stringify(results, null, 2);
      const filePath = `output/${fileName}`;
      fs.writeFileSync(filePath, data);
      console.log(`results written to ${filePath}`);
    } catch (e) {
      console.error(e);
    }
  }
}
