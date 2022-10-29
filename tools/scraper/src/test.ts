import fs from 'fs';

const file = fs.readFileSync('output/acrodicted-poses.json', 'utf-8');
const content = JSON.parse(file);

const item = content[0];

console.log('BEFORE');
console.log(content.length);
