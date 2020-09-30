const fs = require('fs');
const path = require('path');

const version = JSON.parse(fs.readFileSync('lerna.json', 'utf8')).version;
const docsDir = path.resolve('docs');
const apiDocsDir = path.resolve(docsDir, 'api');

function transformFile(filePath, tranformFn) {
  const file = fs.readFileSync(filePath, { encoding: 'utf8' });
  const transformedFile = tranformFn(file);
  fs.writeFileSync(filePath, transformedFile, { encoding: 'utf8' });
}

function jsonStringify(json) {
  return JSON.stringify(json, null, 2) + '\n';
}

function openFile(filePath) {
  return fs.readFileSync(filePath, { encoding: 'utf8' });
}

module.exports = {
  version,
  docsDir,
  apiDocsDir,
  transformFile,
  jsonStringify,
  openFile
};
