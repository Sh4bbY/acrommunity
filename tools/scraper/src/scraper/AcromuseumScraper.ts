import puppeteer from 'puppeteer';
import {Scraper} from './Scraper';

export class AcromuseumScraper extends Scraper {
  async run() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();

    const images = await this.getImages();
    this.saveResults(images, 'acromuseum-images.json', false);
    console.log('images: ', images.length);

    const videos = await this.getVideos();
    this.saveResults(videos, 'acromuseum-videos.json', false);
    console.log('videos: ', videos.length);

    await this.browser.close();
  }

  async getImages() {
    const options = {
      persons: ['Duo', 'Trio', 'Four+people', 'Five+people', 'Six+people', 'Other'],
      bases: ['Single+base', 'Double+base', 'Triple+base', 'Multiple+base'],
      baseTypes: ['Standing+base', 'L-base', 'Belly+base', 'Base+on+hands', 'Other'],
    };

    let images = [];

    for (let persons of options.persons) {
      for (let bases of options.bases) {
        for (let baseType of options.baseTypes) {
          const url = `https://www.acromuseum.com/photos.php?view=bytype&f1=${persons}&f2=${bases}&f3=${baseType}&f4=Any`;
          await this.page.goto(url);

          const resultsSelector = '#paging_and_set';
          await this.page.waitForSelector(resultsSelector);

          const pagination = await this.page.evaluate(() => {
            const pagingationLinks = Array.from(document.querySelectorAll('#paging_content a'));
            return pagingationLinks.map(link => link.getAttribute('href'));
          });

          const pageImages = await this.getPageImages(persons, bases, baseType);
          images = images.concat(pageImages);

          for (let i = 0; i < pagination.length; i++) {
            const url = 'https://www.acromuseum.com/photos.php' + pagination[i];
            console.log(`process url ${i + 1} from ${pagination.length}: `, url);
            await this.page.goto(url);
            const pageImages = await this.getPageImages(persons, bases, baseType);
            images = images.concat(pageImages);
          }
        }
      }
    }

    return images;
  }

  async getPageImages(persons, bases, baseType) {
    const images = await this.page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('#set .item'));
      return items.map(item => ({
        text: item.textContent.trim(),
        thumb: item.querySelector('img').getAttribute('src').replace('../', 'https://www.acromuseum.com/'),
        img: item.querySelector('span.url_for_cinema').textContent.trim().replace('../', 'https://www.acromuseum.com/'),
        urlForCinema: item.querySelector('span.url_for_cinema').textContent,
        id: item.querySelector('small:first-of-type').textContent.trim(),
        date: item.querySelector('small:nth-of-type(2)').textContent.trim(),
      }));
    });
    return images.map(item => ({
      thumb: item.thumb,
      img: item.img,
      persons: this.mapPersons(persons),
      bases: this.mapBases(bases),
      baseType: this.mapBaseType(baseType),
      mediaId: item.id.substring('ID:'.length).trim(),
      copyright: item.text.replace(item.urlForCinema, '').replace(item.id, '').replace(item.date, '').trim().substr(1).trim(),
    }));
  }


  async getVideos() {
    const options = {
      persons: ['Duo', 'Trio', 'Four+people', 'Five+people', 'Six+people', 'Other'],
      bases: ['Single+base', 'Double+base', 'Multiple+base', 'Passing+flyer', 'Changing+roles', 'Single+and+loader', 'Double+and+loader'],
      baseTypes: ['Standing+base', 'L-base', 'Belly+base', 'Walking+base', 'Moving+base', 'Other'],
    };

    let videos = [];

    for (let persons of options.persons) {
      for (let bases of options.bases) {
        for (let baseType of options.baseTypes) {
          const url = `https://www.acromuseum.com/videos.php?view=bytype&f1=${persons}&f2=${bases}&f3=${baseType}&f4=Any`;
          await this.page.goto(url);

          const resultsSelector = '#paging_and_set';
          await this.page.waitForSelector(resultsSelector);

          const pagination = await this.page.evaluate(() => {
            const pagingationLinks = Array.from(document.querySelectorAll('#paging_content a'));
            return pagingationLinks.map(link => link.getAttribute('href'));
          });

          const pageVideos = await this.getPageVideos(persons, bases, baseType);
          videos = videos.concat(pageVideos);

          // console.log('page Videos', pageVideos.length, {persons, bases, baseType});

          for (let i = 0; i < pagination.length; i++) {
            const url = 'https://www.acromuseum.com/videos.php' + pagination[i];
            console.log(`process url ${i + 1} from ${pagination.length}: `, url);
            await this.page.goto(url);
            const pageVideos = await this.getPageVideos(persons, bases, baseType);
            videos = videos.concat(pageVideos);
          }
        }
      }
    }

    return videos;
  }

  async getPageVideos(persons, bases, baseType) {
    const items = await this.page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('#set .item'));
      return items.map(item => ({
        thumb: item.querySelector('img').getAttribute('src').replace('../', 'https://www.acromuseum.com/'),
        video: 'https://www.acromuseum.com/2019/instagram/videos/' + item.getAttribute('id'),
        text: item.textContent.trim(),
        id: item.querySelector('small:first-of-type').textContent.trim(),
        date: item.querySelector('small:nth-of-type(2)').textContent.trim(),
      }));
    });
    return items.map(item => ({
      thumb: item.thumb,
      video: item.video,
      persons: this.mapPersons(persons),
      bases: this.mapBases(bases),
      baseType: this.mapBaseType(baseType),
      mediaId: item.id.substring('ID:'.length).trim(),
      copyright: item.text.replace(item.id, '').replace(item.date, '').trim().substr(1).trim(),
    }));
  }

  mapPersons(input) {
    switch (input) {
      case 'Duo':
        return 2;
      case 'Trio':
        return 3;
      case 'Four+people':
        return 4;
      case 'Five+people':
        return 5;
      case 'Six+people':
        return 6;
      case 'Other':
        return null;
    }
  }

  mapBases(input) {
    switch (input) {
      case 'Single+base':
        return 1;
      case 'Double+base':
        return 2;
      case 'Triple+base':
        return 3;
      case 'Multiple+base':
        return 'multiple';
    }
  }

  mapBaseType(input) {
    switch (input) {
      case 'Standing+base':
        return 'standing';
      case 'L-base':
        return 'l_base';
      case 'Belly+base':
        return 'belly_base';
      case 'Base+on+hands':
        return 'on_hands';
      case 'Walking+base':
        return 'walking';
      case 'Moving+base':
        return 'moving';
      case 'Other':
        return 'other';
    }
  }
}
