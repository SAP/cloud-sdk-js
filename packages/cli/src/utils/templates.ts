/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  unlinkSync
} from 'fs';
import https from 'https';
import { resolve, basename, relative, dirname, extname } from 'path';
import { compile } from 'handlebars';
import { CopyDescriptor } from './copy-list';

const templatesDir = resolve(__dirname, '../templates');

function getTemplatePathsForDir(
  inputDir: string[],
  excludes: string[]
): string[] {
  const directoryEntries = readdirSync(resolve(templatesDir, ...inputDir), {
    withFileTypes: true
  });
  return directoryEntries.reduce((templates: string[], directoryEntry) => {
    if (
      directoryEntry.isDirectory() &&
      !excludes.includes(directoryEntry.name)
    ) {
      return [
        ...templates,
        ...getTemplatePathsForDir([...inputDir, directoryEntry.name], excludes)
      ];
    }
    if (directoryEntry.isFile() && !excludes.includes(directoryEntry.name)) {
      return [
        ...templates,
        resolve(templatesDir, ...inputDir, directoryEntry.name)
      ];
    }
    return templates;
  }, []);
}

export function getTemplatePaths(
  inputDirs: string[],
  excludes: string[] = []
): { [inputDir: string]: string[] } {
  return inputDirs.reduce(
    (templatePaths, inputDir) => ({
      ...templatePaths,
      [inputDir]: getTemplatePathsForDir([inputDir], excludes)
    }),
    {}
  );
}

function getCopyDescriptorForPath(
  targetDir: string,
  templateSubDir: string,
  templatePath: string
): CopyDescriptor {
  const relativeSourcePath = relative(
    resolve(templatesDir, templateSubDir),
    dirname(templatePath)
  );
  const targetTemplateDir = resolve(targetDir, relativeSourcePath);

  return {
    sourcePath: templatePath,
    fileName: resolve(targetTemplateDir, basename(templatePath, '.mu'))
  };
}

export function getCopyDescriptors(
  targetDir: string,
  templatePaths: { [templateSubDir: string]: string[] }
): CopyDescriptor[] {
  return Object.entries(templatePaths).reduce(
    (allCopyDescriptors: CopyDescriptor[], [templateSubDir, paths]) => [
      ...allCopyDescriptors,
      ...paths.map(templatePath =>
        getCopyDescriptorForPath(targetDir, templateSubDir, templatePath)
      )
    ],
    []
  );
}

export async function findConflicts(
  copyDescriptors: CopyDescriptor[],
  force = false
) {
  const conflicts = copyDescriptors.filter(copyDescriptor =>
    existsSync(copyDescriptor.fileName)
  );

  if (conflicts.length) {
    if (force) {
      conflicts.forEach(copyDescriptor => unlinkSync(copyDescriptor.fileName));
    } else {
      const listOfFiles = conflicts.map(f => basename(f.fileName)).join('", "');
      throw new Error(
        conflicts.length > 1
          ? `Files with the names "${listOfFiles}" already exist. If you want to overwrite them, rerun the command with \`--force\`.`
          : `A file with the name "${listOfFiles}" already exists. If you want to overwrite it, rerun the command with \`--force\`.`
      );
    }
  }
}

export async function copyFiles(
  copyDescriptors: CopyDescriptor[],
  options: { [key: string]: any }
) {
  return Promise.all(
    copyDescriptors.map(({ sourcePath, fileName }) =>
      sourcePath instanceof URL
        ? copyRemote(sourcePath, fileName)
        : copyLocal(sourcePath, fileName, options)
    )
  );
}

async function copyRemote(sourcePath: URL, fileName: string): Promise<void> {
  return new Promise((promiseResolve, reject) => {
    https
      .get(sourcePath, response => {
        if (
          response.statusCode &&
          (response.statusCode < 200 || response.statusCode > 299)
        ) {
          reject(
            new Error(
              'Failed to load page, status code: ' + response.statusCode
            )
          );
        }
        let content = '';
        response.on('data', (chunk: string) => (content += chunk));
        response.on('end', () => {
          mkdirSync(dirname(fileName), { recursive: true });
          writeFileSync(fileName, content);
          promiseResolve();
        });
      })
      .on('error', e => {
        reject(e);
      });
  });
}

async function copyLocal(
  sourcePath: string,
  fileName: string,
  options: { [key: string]: any }
) {
  mkdirSync(dirname(fileName), { recursive: true });

  if (extname(sourcePath) === '.mu') {
    const template = compile(readFileSync(sourcePath, { encoding: 'utf8' }));
    writeFileSync(fileName, template(options));
  } else {
    copyFileSync(sourcePath, fileName);
  }
}
