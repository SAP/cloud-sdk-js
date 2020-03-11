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

const pipe = (...fns) => start => fns.reduce((state, fn) => fn(state), start);

/*
GitHub pages have special requirement for links, so additional adjustment is necessary. See examples below:
https://username.github.io/repo/modules/sap_cloud_sdk_analytics works
https://username.github.io/repo/modules/sap_cloud_sdk_analytics.html not
https://username.github.io/repo/modules/_sap_cloud_sdk_analytics not
https://username.github.io/repo/modules/_sap_cloud_sdk_analytics.html not
 */
function adjustmentForGitHubPages() {
  const paths = flatten(readDir('./documentation')).filter(isHtmlFile);
  paths.forEach(path => replaceSearchbar(path));
  paths.forEach(path => replaceUnderlinePrefixAndHtmlSuffixFromLinks(path));
  paths.forEach(path => removeUnderlinePrefixFromFileName(path));

}

function replaceSearchbar(path) {
  const labelEl = '<label for="tsd-search-field" class="tsd-widget search no-caption">Search</label>';
  const inputEl = '<input id="tsd-search-field" type="text" />';

  const html = fs.readFileSync(path, { encoding: 'utf8' });
  if (html.includes(labelEl) && html.includes(inputEl)) {
    const replaced = html.replace(labelEl, '').replace(inputEl, '');
    fs.writeFileSync(path, replaced, { encoding: 'utf8' });
  } else {
    throw Error('Searchbar could not be hidden. Label and input tags are not defined.');
  }
}

function replaceUnderlinePrefixAndHtmlSuffixFromLinks(path){
  const html = fs.readFileSync(path, { encoding: 'utf8' });
  const replaced = html.replace(/<a href="[^>]*_[^>]*.html">/gi, removeUnderlinePrefixAndHtmlSuffixFromLink);
  fs.writeFileSync(path, replaced, { encoding: 'utf8' });
}

function removeUnderlinePrefixAndHtmlSuffixFromLink(aHref) {
  const i = aHref.indexOf('_');
  // remove the first `_` and `.html`
  return aHref.substring(0, i) +  aHref.substring( i+1, aHref.length - 7 ) + '\">'
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
// zipping from outside produces wrong results in the documentation system
const zipDocs = 'cd documentation && zip documentation.zip * -r && cd ..';

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
execSync(zipDocs);
