import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';

const inputFile = fs.readFileSync('input/attachments.json', 'utf-8');
const attachments = JSON.parse(inputFile);
const images = attachments.filter(attachment => attachment.type === 'image');

async function downloadAttachments(attachments) {
  console.log(`start downloading ${attachments.length} attachments`);
  const nameMap = {};
  await Promise.all(attachments.map(attachment => downloadAttachment(attachment, nameMap)));
  fs.writeFileSync('output/map.json', JSON.stringify(nameMap, null, 2));
}

function downloadAttachment(attachment, nameMap) {
  return new Promise<void>((resolve, _reject) => {
    const fileName = getFilename(attachment, nameMap);
    const dest = path.join('output/images', fileName);
    const ws = fs.createWriteStream(dest);
    const client = attachment.url.startsWith('https') ? https : http;

    client.get(attachment.url, response => {
      response.pipe(ws);
      ws.on('finish', () => {
        console.log(`downloaded ${attachment.url} to ${dest}`);
        ws.close();
        resolve();
      });
    });
  });
}

function getFilename(attachment, nameMap) {
  let fileName = path.basename(attachment.url);
  if (fileName.includes('?')) {
    fileName = fileName.substring(0, fileName.indexOf('?'));
  }
  if (nameMap[fileName] && nameMap[fileName] !== attachment.url) {
    console.log('conflict!');
    console.log(attachment.url);
    console.log(nameMap[fileName]);
    console.log('---------------');
  } else {
    nameMap[fileName] = attachment.url;
  }
  return fileName;
}

downloadAttachments(images)
  .then(() => console.log(`loaded ${images.length} images`))
  .catch(e => console.error(e));
