/* eslint-disable no-console */
import { lstatSync, readdirSync, renameSync, readFileSync } from 'fs';
import { resolve, basename, extname } from 'path';
import execa from 'execa';
import { unixEOL } from '@sap-cloud-sdk/util';
import { transformFile, transformFileSync } from './util';
import { gunzip, gzip } from 'zlib';
import { promisify } from 'util';
import { search } from 'voca';

const gunzipP = promisify(gunzip)
const gzipP = promisify(gzip)

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
const isNavigationJs = fileName => basename(fileName) === 'navigation.js'

const pipe =
  (...fns) =>
  start =>
    fns.reduce((state, fn) => fn(state), start);

async function adjustForGitHubPages() {
  const documentationFilePaths = flatten(readDir(resolve(docPath)));
  const htmlPaths = documentationFilePaths.filter(isHtmlFile);
  
  await adjustSearchJs(documentationFilePaths);
  await adjustNavigationJs(documentationFilePaths);
  
  htmlPaths.forEach(filePath =>
    transformFileSync(filePath, file =>
      file.replace(/<a href="[^>]*_[^>]*.html[^>]*>/gi, removeUnderlinePrefix)
    )
  );
  htmlPaths.forEach(filePath => removeUnderlinePrefixFromFileName(filePath));
}

async function adjustSearchJs(paths) {
  const filtered = paths.filter(isSearchJs);
  if (filtered.length !== 1) {
    throw Error(`Expected one 'search.js', but found: ${filtered.length}.`);
  }
  
  await transformFile(filtered[0], async file => {
    const blob = /window.searchData = "data:application\/octet-stream;base64,(.*)"/.exec(file)![1]
  
    const ungzipped = (await gunzipP(Buffer.from(blob, 'base64'))).toString('utf8')
    const searchItems = JSON.parse(ungzipped)

    searchItems.rows.forEach(s => {
      s.url = removeUnderlinePrefix(s.url);
    })

    const newData = (await gzipP(JSON.stringify(searchItems))).toString('base64');
    return `window.searchData = "data:application/octet-stream;base64,${newData}"`
  })
}

async function adjustNavigationJs(paths) {
  const filtered = paths.filter(isNavigationJs);
  if (filtered.length !== 1) {
    throw Error(`Expected one 'navigation.js', but found: ${filtered.length}.`);
  }
  
  await transformFile(filtered[0], async file => {
    const blob = /window.navigationData = "data:application\/octet-stream;base64,(.*)"/.exec(file)![1]
  
    const ungzipped = (await gunzipP(Buffer.from(blob, 'base64'))).toString('utf8')
    const navigationItems = JSON.parse(ungzipped)

    navigationItems.forEach(n => {
      n.path = removeUnderlinePrefix(n.path)
      n.children.forEach(c => {
        c.path = removeUnderlinePrefix(c.path)
      })
    })

    const newData = (await gzipP(JSON.stringify(navigationItems))).toString('base64');
    return `window.navigationData = "data:application/octet-stream;base64,${newData}"`
  })
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

function insertCopyright() {
  const filePaths = flatten(readDir(docPath)).filter(isHtmlFile);
  filePaths.forEach(filePath => {
    const copyrightDiv = `<div class="container"><p>Copyright Ⓒ ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.</p></div>`;
    transformFileSync(filePath, file => {
      const lines = file.split(unixEOL);
      // Insert the copyright div before the line including </footer> #yikes
      lines.splice(
        lines.findIndex(line => line.includes('</footer>')),
        0,
        copyrightDiv
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
  insertCopyright();
}

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection at: ${reason}`);
  process.exit(1);
});

generateDocs();
