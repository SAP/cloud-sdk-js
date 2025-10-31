/* eslint-disable no-console */
import { lstatSync, readdirSync, renameSync, readFileSync } from 'fs';
import { resolve, basename, extname } from 'path';
import execa from 'execa';
import { unixEOL } from '@sap-cloud-sdk/util';
import { transformFile } from './util';
import { deflate } from 'zlib';
import { promisify } from 'util';

const deflateP = promisify(deflate);

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
const isNavigationJs = fileName => basename(fileName) === 'navigation.js';

const pipe =
  (...fns) =>
  start =>
    fns.reduce((state, fn) => fn(state), start);

async function adjustForGitHubPages() {
  const documentationFilePaths = flatten(readDir(resolve(docPath)));
  const htmlPaths = documentationFilePaths.filter(isHtmlFile);

  await adjustSearchJs(documentationFilePaths);
  await adjustNavigationJs(documentationFilePaths);

  await Promise.all(
    htmlPaths.map(filePath =>
      transformFile(filePath, file =>
        file.replace(/<a href="[^>]*_[^>]*.html[^>]*>/gi, removeUnderlinePrefix)
      )
    )
  );

  htmlPaths.forEach(filePath => removeUnderlinePrefixFromFileName(filePath));
}

/**
 * Decompresses Base64-encoded deflate compressed data and parses it into a JSON object.
 * @link https://github.com/TypeStrong/typedoc/blob/82449253188582f6b63695fecf608d9887ba1761/src/lib/output/themes/default/assets/typedoc/utils/decompress.ts
 *
 * @param base64 - The Base64-encoded string representing the deflate-compressed JSON string.
 * @returns A promise that resolves to the parsed JSON object.
 */
export async function decompressJson(base64: string) {
  const binaryData = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  const blob = new Blob([binaryData]);
  const decompressedStream = blob
    .stream()
    .pipeThrough(new DecompressionStream('deflate'));
  const decompressedText = await new Response(decompressedStream).text();
  return JSON.parse(decompressedText);
}

/**
 * Compresses a JSON-serializable object into a Base64-encoded deflate string.
 * @link https://github.com/TypeStrong/typedoc/blob/82449253188582f6b63695fecf608d9887ba1761/src/lib/utils/compress.ts
 * @param data - The JSON-serializable object to compress.
 * @returns A promise that resolves to a Base64-encoded string of the deflate-compressed data.
 */
export async function compressJson(data: any) {
  const gz = await deflateP(Buffer.from(JSON.stringify(data)));
  return gz.toString('base64');
}

async function adjustSearchJs(paths) {
  const filtered = paths.filter(isSearchJs);
  if (filtered.length !== 1) {
    throw Error(`Expected one 'search.js', but found: ${filtered.length}.`);
  }

  await transformFile(filtered[0], async file => {
    const dataRegexResult = /window.searchData = "(.*)";/.exec(file);
    if (!dataRegexResult) {
      throw Error(
        `Cannot adjust links in 'search.js'. File content did not match expected pattern.`
      );
    }

    const searchItems = await decompressJson(dataRegexResult[1]);
    searchItems.rows.forEach(s => {
      s.url = removeUnderlinePrefix(s.url);
    });

    const encodedAdjustedData = await compressJson(searchItems);
    return `window.searchData = "${encodedAdjustedData}"`;
  });
}

async function adjustNavigationJs(paths) {
  const filtered = paths.filter(isNavigationJs);
  if (filtered.length !== 1) {
    throw Error(`Expected one 'navigation.js', but found: ${filtered.length}.`);
  }

  await transformFile(filtered[0], async file => {
    const dataRegexResult = /window.navigationData = "(.*)"/.exec(file);
    if (!dataRegexResult) {
      throw Error(
        `Cannot adjust links in 'navigation.js'. File content did not match expected pattern.`
      );
    }

    const navigationItems = await decompressJson(dataRegexResult[1]);
    navigationItems
      .filter(n => n.path)
      .forEach(n => {
        n.path = removeUnderlinePrefix(n.path);
        n.children.forEach(c => {
          c.path = removeUnderlinePrefix(c.path);
        });
      });

    const encodedAdjustedData = await compressJson(navigationItems);
    return `window.navigationData = "${encodedAdjustedData}"`;
  });
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

async function insertCopyright() {
  const filePaths = flatten(readDir(docPath)).filter(isHtmlFile);

  await Promise.all(
    filePaths.map(async filePath => {
      const copyrightDiv = `<div class="container"><p>Copyright Ⓒ ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.</p></div>`;
      return transformFile(filePath, file => {
        const lines = file.split(unixEOL);
        // Insert the copyright div before the line including </footer> #yikes
        lines.splice(
          lines.findIndex(line => line.includes('</footer>')),
          0,
          copyrightDiv
        );
        return lines.join(unixEOL);
      });
    })
  );
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
