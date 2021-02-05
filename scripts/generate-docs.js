const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const compareVersions = require('compare-versions');
const { jsonStringify, transformFile } = require('./dist/util');

const apiDocPath = path.resolve('docs', 'api');

const isDirectory = entryPath => fs.lstatSync(entryPath).isDirectory();
const flatten = arr =>
  arr.reduce(
    (prev, curr) =>
      curr instanceof Array ? [...prev, ...flatten(curr)] : [...prev, curr],
    []
  );
const inputDirAbsPath = inputDir => path.resolve(__dirname, inputDir);

const readDir = inputDir =>
  pipe(inputDirAbsPath, absPath =>
    fs
      .readdirSync(absPath)
      .map(file => path.resolve(absPath, file))
      .map(file => (isDirectory(file) ? readDir(file) : file))
  )(inputDir);

const isHtmlFile = fileName => path.extname(fileName) === '.html';
const isSearchJs = fileName => path.basename(fileName) === 'search.js';
const pipe = (...fns) => start => fns.reduce((state, fn) => fn(state), start);

/**
 * GitHub pages has requirements for links, so additional adjustment is necessary. See example below:
 * https://username.github.io/repo/modules/sap_cloud_sdk_analytics works
 * https://username.github.io/repo/modules/sap_cloud_sdk_analytics.html does not
 */
function adjustForGitHubPages() {
  const documentationFiles = flatten(
    readDir(path.resolve(apiDocPath, version))
  );
  const htmlPaths = documentationFiles.filter(isHtmlFile);
  adjustSearchJs(documentationFiles);
  htmlPaths.forEach(filePath =>
    transformFile(filePath, file =>
      file.replace(
        /<a href="[^>]*_[^>]*.html[^>]*>/gi,
        removeUnderlinePrefixAndHtmlSuffix
      )
    )
  );
  htmlPaths.forEach(filePath => removeUnderlinePrefixFromFileName(filePath));
}

function adjustSearchJs(paths) {
  const filtered = paths.filter(isSearchJs);
  if (filtered.length !== 1) {
    throw Error(`Expected one 'search.json', but found: ${filtered.length}.`);
  }
  transformFile(filtered[0], file =>
    file.replace(
      /"[^"]*_[^"]*.html[^"]*"/gi,
      removeUnderlinePrefixAndHtmlSuffix
    )
  );
}

function removeUnderlinePrefixAndHtmlSuffix(str) {
  const i = str.indexOf('_');
  // Remove the first `_`
  const firstUnderlineRemoved = str.substring(0, i) + str.substring(i + 1);
  // Remove `.html`
  return firstUnderlineRemoved.replace('.html', '');
}

function removeUnderlinePrefixFromFileName(filePath) {
  const newPath = filePath.replace(/_.*.html/gi, function (x) {
    return x.substring(1);
  });
  fs.renameSync(filePath, newPath);
}

function insertCopyrightAndTracking() {
  const filePaths = flatten(readDir(path.resolve(apiDocPath, version))).filter(
    isHtmlFile
  );
  filePaths.forEach(filePath => {
    const copyrightDiv = `<div class="container"><p>Copyright Ⓒ ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.</p></div>`;
    const trackingTag =
      '<script src="https://sap.github.io/cloud-sdk/js/swa.js"></script>';
    transformFile(filePath, file => {
      const lines = file.split('\n');
      // Inplace insert the copyright div before the line including </footer> #yikes
      lines.splice(
        lines.findIndex(line => line.includes('</footer>')),
        0,
        copyrightDiv
      );
      lines.splice(
        lines.findIndex(line => line.includes('</head>')),
        0,
        trackingTag
      );
      return lines.join('\n');
    });
  });
}

const version = JSON.parse(fs.readFileSync('lerna.json', 'utf8')).version;

function getSortedApiVersions() {
  return fs
    .readdirSync(apiDocPath)
    .filter(entry =>
      fs.lstatSync(path.resolve(apiDocPath, entry)).isDirectory()
    )
    .sort(compareVersions)
    .reverse();
}

function writeVersions() {
  const apiVersions = getSortedApiVersions();
  fs.writeFileSync(
    path.resolve('docs', 'api', 'versions.js'),
    `export default ${jsonStringify(apiVersions)}`,
    'utf8'
  );
  fs.writeFileSync(
    path.resolve('docs', 'api', 'versions.json'),
    `${jsonStringify(apiVersions)}`,
    'utf8'
  );
}

function validateLogs(generationLogs) {
  const invalidLinksMessage =
    'Found invalid symbol reference(s) in JSDocs, they will not render as links in the generated documentation.';
  const [_, invalidLinks] = generationLogs.split(invalidLinksMessage);
  if (invalidLinks) {
    throw Error(`Error: ${invalidLinksMessage}\n${invalidLinks}`);
  }
}

function generateDocs() {
  const generationLogs = execSync('typedoc --tsconfig tsconfig.typedoc.json', {
    cwd: path.resolve(),
    encoding: 'utf8'
  });
  validateLogs(generationLogs);
  adjustForGitHubPages();
  insertCopyrightAndTracking();
  writeVersions();
}

generateDocs();
