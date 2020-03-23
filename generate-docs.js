const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const isDirectory = path => fs.lstatSync(path).isDirectory();
const flatten = arr => arr.reduce((prev, curr) => (curr instanceof Array ? [...prev, ...flatten(curr)] : [...prev, curr]), []);
const inputDirAbsPath = inputDir => path.resolve(__dirname, inputDir);

const readDir = inputDir =>
  pipe(
    inputDirAbsPath,
    absPath =>
      fs
        .readdirSync(absPath)
        .map(file => path.resolve(absPath, file))
        .map(file => (isDirectory(file) ? readDir(file) : file))
  )(inputDir);

const isHtmlFile = fileName => fileName.endsWith('.html');

const isSearchJs = fileName => fileName.endsWith('search.js');

const pipe = (...fns) => start => fns.reduce((state, fn) => fn(state), start);

/*
GitHub pages have special requirement for links, so additional adjustment is necessary. See examples below:
https://username.github.io/repo/modules/sap_cloud_sdk_analytics works
https://username.github.io/repo/modules/sap_cloud_sdk_analytics.html not
https://username.github.io/repo/modules/_sap_cloud_sdk_analytics not
https://username.github.io/repo/modules/_sap_cloud_sdk_analytics.html not
 */
function adjustmentForGitHubPages() {
  const documentationFiles = flatten(readDir('./documentation'));
  const htmlPaths = documentationFiles.filter(isHtmlFile);
  adjustSearchJs(documentationFiles);
  htmlPaths.forEach(path => replaceUnderlinePrefixAndHtmlSuffixFromLinks(path));
  htmlPaths.forEach(path => removeUnderlinePrefixFromFileName(path));
}

function adjustSearchJs(paths){
  const filtered = paths.filter(isSearchJs);
  if(filtered.length !== 1){
    throw Error(`Expect one 'search.js', but found: ${filtered.length}.`);
  }
  replaceUnderlinePrefixAndHtmlSuffixFromSearchJs(filtered[0]);
}

function replaceUnderlinePrefixAndHtmlSuffixFromSearchJs(path){
  const html = fs.readFileSync(path, { encoding: 'utf8' });
  const replaced = html.replace(/"[^"]*_[^"]*.html[^"]*"/gi, removeUnderlinePrefixAndHtmlSuffix);
  fs.writeFileSync(path, replaced, { encoding: 'utf8' });
}

function replaceUnderlinePrefixAndHtmlSuffixFromLinks(path){
  const html = fs.readFileSync(path, { encoding: 'utf8' });
  const replaced = html.replace(/<a href="[^>]*_[^>]*.html[^>]*>/gi, removeUnderlinePrefixAndHtmlSuffix);
  fs.writeFileSync(path, replaced, { encoding: 'utf8' });
}

function removeUnderlinePrefixAndHtmlSuffix(str) {
  const i = str.indexOf('_');
  // remove the first `_`
  const firstUnderlineRemoved = str.substring(0, i) +  str.substring(i + 1);
  // remove `.html`
  return firstUnderlineRemoved.replace('.html', '');
}

function removeUnderlinePrefixFromFileName(path){
  const newPath = path.replace(/_.*.html/gi, function (x) {
    return x.substring(1)
  });
  fs.rename(path, newPath, ()=>{});
}

const copyrightDiv = `<div class="container"><p>Copyright Ⓒ ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.</p></div>`;

function addCopyrightNotice() {
  const paths = flatten(readDir('./documentation')).filter(isHtmlFile);
  paths.forEach(path => insertCopyrightNotice(path));
}

function insertCopyrightNotice(path) {
  const lines = fs.readFileSync(path, { encoding: 'utf8' }).split('\n');
  // inplace insert the copyright div before the line including </footer> #yikes
  lines.splice(lines.findIndex(line => line.includes('</footer>')), 0, copyrightDiv);
  fs.writeFileSync(path, lines.join('\n'), 'utf8');
}

const cleanDocsDir = 'rm -rf documentation';
const generateDocs = 'npx typedoc .';

const version = getCurrentSDKVersion();

function createDocFolder(version) {
  return `mkdir -p docs/${version}`;
}

function readJson(filePath){
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getCurrentSDKVersion(){
  const lernaJson = readJson('./lerna.json');
  return lernaJson.version;
}

function moveDocs(version){
  return `mv -v documentation/* docs/api/${version}`;
}

function updateIndex(){
  const indexPath  = './docs/api/index.md';
  const originalData = fs.readFileSync(indexPath, 'utf8');
  const newLine = `\n- [Version ${version}](${version})`;
  const newData = originalData + newLine;
  fs.writeFileSync(indexPath, newData, 'utf8');
}

function addNewDocs(){
  execSync(createDocFolder(version));
  execSync(moveDocs(version));
}

execSync(cleanDocsDir);
const generationLogs = execSync(generateDocs, { encoding: 'utf8' });
const [relevantLogs] = generationLogs.split('Documentation generated at');
const invalidLinksMessage = 'Found invalid symbol reference(s) in JSDocs, they will not render as links in the generated documentation.';
const [_, invalidLinks] = relevantLogs.split(invalidLinksMessage);
if (invalidLinks) {
  throw Error(`Error: ${invalidLinksMessage}\n${invalidLinks}`);
}
adjustmentForGitHubPages();
addCopyrightNotice();
addNewDocs();
updateIndex();
