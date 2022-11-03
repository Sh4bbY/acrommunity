import fs from 'fs';

function test() {
  fixCopyright();
}

test();

function fixCopyright() {
  const images = JSON.parse(fs.readFileSync('output/scrape/acromuseum-images.json', 'utf-8'));

  const fixedImages = images.map(image => ({
    ...image,
    copyright: image.copyright.substr(image.copyright.indexOf('©') + 1).trim(),
  }));
  fs.writeFileSync('output/scrape/acromuseum-images.json', JSON.stringify(fixedImages));


  const videos = JSON.parse(fs.readFileSync('output/scrape/acromuseum-videos.json', 'utf-8'));
  const fixedVideos = videos.map(video => ({
    ...video,
    copyright: video.copyright.substr(video.copyright.indexOf('©') + 1).trim(),
  }));
  fs.writeFileSync('output/scrape/acromuseum-videos.json', JSON.stringify(fixedVideos));
}
