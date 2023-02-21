/* eslint-disable no-console */
import { lstatSync, readdirSync, renameSync, readFileSync } from 'fs';
import { resolve, basename, extname } from 'path';
import execa from 'execa';
import { unixEOL } from '@sap-cloud-sdk/util';
import { transformFile } from './util';

const docPath = resolve(
  JSON.parse(readFileSync('tsconfig.typedoc.json', 'utf8')).typedocOptions.out
);

const isDirectory = entryPath => lstatSync(entryPath).isDirectory();
const flatten = arr =>
  arr.reduce(
    (prev, curr) =>
      curr instanceof Array ? [...prev, ...flatten(curr)] : [...prev, curr],
    []
  );
const inputDirAbsPath = input => resolve(__dirname, input);

const readDir = input =>
  pipe(inputDirAbsPath, absPath =>
    readdirSync(absPath)
      .map(file => resolve(absPath, file))
      .map(file => (isDirectory(file) ? readDir(file) : file))
  )(input);

const isHtmlFile = fileName => extname(fileName) === '.html';
const isSearchJs = fileName => basename(fileName) === 'search.js';
const pipe =
  (...fns) =>
  start =>
    fns.reduce((state, fn) => fn(state), start);

function adjustForGitHubPages() {
  const documentationFiles = flatten(readDir(resolve(docPath)));
  const htmlPaths = documentationFiles.filter(isHtmlFile);
  adjustSearchJs(documentationFiles);
  htmlPaths.forEach(filePath =>
    transformFile(filePath, file =>
      file.replace(/<a href="[^>]*_[^>]*.html[^>]*>/gi, removeUnderlinePrefix)
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
    file.replace(/"[^"]*_[^"]*.html[^"]*"/gi, removeUnderlinePrefix)
  );
}

function removeUnderlinePrefix(str) {
  const i = str.indexOf('_');
  // Remove the first `_`
  return str.substring(0, i) + str.substring(i + 1);
}

function removeUnderlinePrefixFromFileName(filePath) {
  const newPath = filePath.replace(/_.*.html/gi, function (x) {
    return x.substring(1);
  });
  renameSync(filePath, newPath);
}

function insertCopyrightAndTracking() {
  const filePaths = flatten(readDir(docPath)).filter(isHtmlFile);
  filePaths.forEach(filePath => {
    const copyrightDiv = `<div class="container"><p>Copyright Ⓒ ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.</p></div>`;
    const trackingTag =
      '<script src="https://sap.github.io/cloud-sdk/js/swa.js"></script>';
    transformFile(filePath, file => {
      const lines = file.split(unixEOL);
      // Insert the copyright div before the line including </footer> #yikes
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
      return lines.join(unixEOL);
    });
  });
}

function validateLogs(generationLogs: string) {
  const invalidLinksMessage =
    'Found invalid symbol reference(s) in JSDocs, they will not render as links in the generated documentation.';
  const [, invalidLinks] = generationLogs.split(invalidLinksMessage);
  if (invalidLinks) {
    throw Error(`Error: ${invalidLinksMessage}${unixEOL}${invalidLinks}`);
  }
}

async function generateDocs() {
  const generationLogs = await execa.command(
    'typedoc --tsconfig tsconfig.typedoc.json',
    {
      cwd: resolve(),
      encoding: 'utf8'
    }
  );
  validateLogs(generationLogs.stdout);
  adjustForGitHubPages();
  insertCopyrightAndTracking();
}

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection at: ${reason}`);
  process.exit(1);
});

generateDocs();
