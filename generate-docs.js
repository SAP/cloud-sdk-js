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

function hideSearchbar() {
  const paths = flatten(readDir('./documentation')).filter(isHtmlFile);
  paths.forEach(path => replaceSearchbar(path));
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
hideSearchbar();
addCopyrightNotice();
execSync(zipDocs);
