/* eslint-disable no-console */
import { lstatSync, readdirSync, renameSync, readFileSync } from 'fs';
import { resolve, basename, extname } from 'path';
import execa from 'execa';
import { transformFile } from './util';
import { deflate } from 'zlib';
import { promisify } from 'util';

const deflateP = promisify(deflate);

const docPath = resolve(
  JSON.parse(readFileSync('tsconfig.typedoc.json', 'utf8')).typedocOptions.out
);

const isDirectory = (entryPath: string) => lstatSync(entryPath).isDirectory();
type NestedArray<T> = (T | NestedArray<T>)[];

const flatten = <T>(arr: NestedArray<T>): T[] =>
  arr.reduce<T[]>(
    (prev, curr) =>
      Array.isArray(curr) ? [...prev, ...flatten(curr)] : [...prev, curr],
    []
  );
const inputDirAbsPath = (input: string) => resolve(__dirname, input);

const readDir = (input: string): NestedArray<string> => {
  const absPath = inputDirAbsPath(input);
  return readdirSync(absPath)
    .map(file => resolve(absPath, file))
    .map(file => (isDirectory(file) ? readDir(file) : file));
};

const isHtmlFile = (fileName: string) => extname(fileName) === '.html';
const isSearchJs = (fileName: string) => basename(fileName) === 'search.js';
const isNavigationJs = (fileName: string) =>
  basename(fileName) === 'navigation.js';

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

async function adjustSearchJs(paths: string[]) {
  const filtered = paths.filter(isSearchJs);
  if (filtered.length !== 1) {
    throw Error(`Expected one 'search.js', but found: ${filtered.length}.`);
  }

  await transformFile(filtered[0], async (file: string) => {
    const dataRegexResult = /window.searchData = "(.*)";/.exec(file);
    if (!dataRegexResult) {
      throw Error(
        `Cannot adjust links in 'search.js'. File content did not match expected pattern.`
      );
    }

    const searchItems = await decompressJson(dataRegexResult[1]);
    searchItems.rows.forEach((s: { url: string }) => {
      s.url = removeUnderlinePrefix(s.url);
    });

    const encodedAdjustedData = await compressJson(searchItems);
    return `window.searchData = "${encodedAdjustedData}"`;
  });
}

async function adjustNavigationJs(paths: string[]) {
  const filtered = paths.filter(isNavigationJs);
  if (filtered.length !== 1) {
    throw Error(`Expected one 'navigation.js', but found: ${filtered.length}.`);
  }

  await transformFile(filtered[0], async (file: string) => {
    const dataRegexResult = /window.navigationData = "(.*)"/.exec(file);
    if (!dataRegexResult) {
      throw Error(
        `Cannot adjust links in 'navigation.js'. File content did not match expected pattern.`
      );
    }

    const navigationItems = await decompressJson(dataRegexResult[1]);
    navigationItems
      .filter((n: { path: string; children: { path: string }[] }) => n.path)
      .forEach((n: { path: string; children: { path: string }[] }) => {
        n.path = removeUnderlinePrefix(n.path);
        n.children.forEach((c: { path: string }) => {
          c.path = removeUnderlinePrefix(c.path);
        });
      });

    const encodedAdjustedData = await compressJson(navigationItems);
    return `window.navigationData = "${encodedAdjustedData}"`;
  });
}

function removeUnderlinePrefix(str: string) {
  const i = str.indexOf('_');
  // Remove the first `_`
  return str.substring(0, i) + str.substring(i + 1);
}

function removeUnderlinePrefixFromFileName(filePath: string) {
  const newPath = filePath.replace(/_.*.html/gi, function (x: string) {
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
        const lines = file.split('\n');
        // Insert the copyright div before the line including </footer> #yikes
        lines.splice(
          lines.findIndex(line => line.includes('</footer>')),
          0,
          copyrightDiv
        );
        return lines.join('\n');
      });
    })
  );
}

function validateLogs(generationLogs: string) {
  const invalidLinksMessage =
    'Found invalid symbol reference(s) in JSDocs, they will not render as links in the generated documentation.';
  const [, invalidLinks] = generationLogs.split(invalidLinksMessage);
  if (invalidLinks) {
    throw Error(`Error: ${invalidLinksMessage}\n${invalidLinks}`);
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
