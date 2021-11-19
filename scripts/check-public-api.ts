import { join, resolve, parse, basename } from 'path';
import { promises, readFileSync, lstatSync, existsSync, readdirSync } from 'fs';
import { GlobSync } from 'glob';
import { createLogger, flatten, unixEOL } from '@sap-cloud-sdk/util';
import mock from 'mock-fs';
import { CompilerOptions } from 'typescript';
import {
  readCompilerOptions,
  transpileDirectory
} from '@sap-cloud-sdk/generator-common/internal';
const { readFile } = promises;
const logger = createLogger('check-public-api');
const pathToTsConfigRoot = join(__dirname, '../tsconfig.json');
const pathRootNodeModules = resolve(__dirname, '../node_modules');
export const regexExportedIndex = /\{([\w,]+)\}/g;
export const regexExportedInternal = /\.\/([\w-]+)/g;
function mockFileSystem(pathToPackage: string) {
  const { pathToSource, pathToTsConfig } = paths(pathToPackage);
  mock({
    [pathToTsConfig]: mock.load(pathToTsConfig),
    [pathToSource]: mock.load(pathToSource),
    [pathRootNodeModules]: mock.load(pathRootNodeModules),
    [pathToTsConfigRoot]: mock.load(pathToTsConfigRoot)
  });
}

function paths(pathToPackage: string): {
  pathToSource: string;
  pathToTsConfig: string;
  pathCompiled: string;
} {
  return {
    pathToSource: join(pathToPackage, 'src'),
    pathToTsConfig: join(pathToPackage, 'tsconfig.json'),
    pathCompiled: 'dist'
  };
}

/**
 * Read the compiler options from the root and cwd tsconfig.json.
 * @param pathToPackage - path to the package under investigation
 * @returns the compiler options
 */
async function getCompilerOptions(
  pathToPackage: string
): Promise<CompilerOptions> {
  const { pathToSource, pathToTsConfig, pathCompiled } = paths(pathToPackage);
  const compilerOptions = await readCompilerOptions(pathToTsConfig);
  const compilerOptionsRoot = await readCompilerOptions(pathToTsConfigRoot);
  return {
    ...compilerOptionsRoot,
    ...compilerOptions,
    stripInternal: true,
    rootDir: pathToSource,
    outDir: pathCompiled
  };
}

/**
For a detailed explanation what is happening here have a look at `0007-public-api-check.md` in the implementation documentation.
Here the two sets: exports from index and exports from .d.ts are compared and logs are created.
 @param allExportedIndex - names of the object imported by the index.ts
 @param allExportedTypes - exported object by the .d.ts files
@param verbose - do a lot of detailed output on the packages
 @returns boolean - true if the two sets export the same objects.
 */
function compareApisAndLog(
  allExportedIndex: string[],
  allExportedTypes: ExportedObject[],
  verbose: boolean
): boolean {
  let setsAreEqual = true;

  allExportedTypes.forEach(exportedType => {
    if (
      !allExportedIndex.find(nameInIndex => exportedType.name === nameInIndex)
    ) {
      logger.error(
        `The ${exportedType.type} "${exportedType.name}" in file: ${exportedType.path} is neither listed in the index.ts nor marked as internal.`
      );
      setsAreEqual = false;
    }
  });

  allExportedIndex.forEach(nameInIndex => {
    if (
      !allExportedTypes.find(exportedType => exportedType.name === nameInIndex)
    ) {
      logger.error(
        `The object "${nameInIndex}" is exported from the index.ts but marked as @internal.`
      );
      setsAreEqual = false;
    }
  });
  logger.info(`We have found ${allExportedIndex.length} exports.`);

  if (verbose) {
    logger.info(`Public api:
    ${allExportedIndex.sort().join(`,${unixEOL}`)}`);
  }
  return setsAreEqual;
}

/**
 * Executes the public API check for a given package.
 * @param pathToPackage -  path to the package.
 */
export async function checkApiOfPackage(pathToPackage: string): Promise<void> {
  logger.info(`Check package: ${pathToPackage}`);
  const { pathToSource, pathCompiled } = paths(pathToPackage);
  mockFileSystem(pathToPackage);
  await transpileDirectory(
    pathToSource,
    await getCompilerOptions(pathToPackage)
  );
  await checkBarrelRecursive(pathToSource);
  checkSingleIndexFile(pathToSource);

  const allExportedTypes = await parseTypeDefinitionFiles(pathCompiled);

  const allExportedIndex = parseBarrelFile(
    await readFile(indexFiles(pathToSource, 'index.ts')[0], 'utf8'),
    /\{([\w,]+)\}/g
  );

  const setsAreEqual = compareApisAndLog(
    allExportedIndex,
    allExportedTypes,
    true
  );
  mock.restore();
  if (!setsAreEqual) {
    process.exit(1);
  }
  logger.info(
    `The index.ts of package ${pathToPackage} is in sync with the type annotations.`
  );
}

/**
 * Get the paths of all `.d.ts` files.
 * @param cwd - Directory which is scanned for type definitions.
 * @returns Paths to the `.d.ts` files excluding `index.d.ts` files.
 */
export function typeDescriptorPaths(cwd: string): string[] {
  const files = new GlobSync('**/*.d.ts', { cwd }).found;
  return files
    .filter(file => !file.includes('index.d.ts'))
    .map(file => join(cwd, file));
}

export interface ExportedObject {
  name: string;
  type: string;
  path: string;
}

/**
 * execute the parseTypeDefinitionFile for all files in the cwd
 * @param pathCompiled - path to the compiles sources containing the .d.ts files
 * @returns Information on the exported objects
 */
export async function parseTypeDefinitionFiles(
  pathCompiled: string
): Promise<ExportedObject[]> {
  const typeDefinitionPaths = typeDescriptorPaths(pathCompiled);
  const result = await Promise.all(
    typeDefinitionPaths.map(async pathTypeDefinition => {
      const fileContent = await readFile(pathTypeDefinition, 'utf8');
      const types = parseTypeDefinitionFile(fileContent);
      return types.map(type => ({ path: pathTypeDefinition, ...type }));
    })
  );
  return flatten(result);
}

/*
 For a deatailed explaination what is happening here have a look at `0007-public-api-check.md` in the implementation documentation.
 Parses a `d.ts` file for the exported objects  in it.
 @param fileContent - content of the .d.ts file to be processes
 @returns List of exported object.
 */
export function parseTypeDefinitionFile(
  fileContent: string
): Omit<ExportedObject, 'path'>[] {
  const normalized = fileContent.replace(/\n+/g, '');
  return [
    'function',
    'const',
    'enum',
    'class',
    'abstract class',
    'type',
    'interface'
  ].reduce((allObjects, objectType) => {
    const regex =
      objectType === 'interface'
        ? new RegExp(`export ${objectType} (\\w+)`, 'g')
        : new RegExp(`export declare ${objectType} (\\w+)`, 'g');
    const exported = captureGroupsFromGlobalRegex(regex, normalized).map(
      element => ({ name: element, type: objectType })
    );
    return [...allObjects, ...exported];
  }, []);
}

/**
 * Get index files in the cwd based on pattern
 * @param cwd - Directory scanned for `index.ts` files.
 * @param pattern - Pattern for search.
 * @returns List of index files found in the cwd.
 */
export function indexFiles(cwd: string, pattern: string): string[] {
  const files = new GlobSync(pattern, { cwd }).found;
  return files.map(file => join(cwd, file));
}

/**
 * Checks that there is exactly one index file on root level.
 * Throws exception if violations are found.
 * @param cwd - Directory for which the rules are checked

 */
export function checkSingleIndexFile(cwd: string): void {
  const files = indexFiles(cwd, 'index.ts');
  if (!files.length) {
    throw Error(`No index.ts file found in ${cwd}`);
  }

  const content = readFileSync(files[0]);
  if (content.includes('*')) {
    throw new Error(`There is a '*' in ${files[0]}`);
  }
}

/**
 * Parse a barrel file for the exported objects.
 * It selects all string in \{\} e.g. export \{a,b,c\} from './xyz' will result in [a,b,c]
 * @param fileContent - content of the index file to be parsed
 * @returns List of objects exported by the given index file.
 */
 export function parseBarrelFile(fileContent: string, regex: RegExp): string[] {
  const normalized = fileContent.replace(/\s+/g, '');
  const groups = captureGroupsFromGlobalRegex(regex, normalized);

  return flatten(groups.map(group => group.split(',')));
}

function captureGroupsFromGlobalRegex(regex: RegExp, str: string): string[] {
  const groups = Array.from(str.matchAll(regex));
  return groups.map(group => group[1]);
}

async function checkBarrelRecursive(cwd: string) {
  readdirSync(cwd, { withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .forEach(subDir => 
    { 
      if(subDir.name !== '__snapshots__') {
        checkBarrelRecursive(join(cwd,subDir.name)); 
      }
    });
  await exportAllInBarrel(cwd, parse(cwd).name === 'src' ? 'internal.ts':'index.ts');
}

async function exportAllInBarrel(cwd: string, barrelFileName: string) {
  const barrelFilePath = join(cwd, barrelFileName);
  if (existsSync(barrelFilePath) && lstatSync(barrelFilePath).isFile()) {
    const dirContents = new GlobSync('*', {
      ignore: [
        '**/*.spec.ts',
        '__snapshots__',
        'internal.ts',
        'index.ts',
        '**/*.md'
      ],
      cwd 
    }).found
    .map(name => { return basename(name, '.ts') }); 
    const exportedFiles = parseBarrelFile(await readFile(barrelFilePath, 'utf8'), regexExportedInternal);
    if(!compareBarrels(dirContents, exportedFiles, barrelFilePath)) {
        process.exit(1);
    }
  }
  else {
    throw Error(`No ${barrelFileName} file found in ${cwd}`);
  }
}

function compareBarrels(dirContents: string[], exportedFiles: string[], barrelFilePath: string) {
  let setsAreEqual = true;

  dirContents.forEach(tsFiles => {
    if (
      !exportedFiles.find(nameInIndex => tsFiles === nameInIndex)
    ) {
      logger.error(
        `${tsFiles} is not exported in ${barrelFilePath}`
      );
      setsAreEqual = false;
    }
  });

  exportedFiles.forEach(nameInIndex => {
    if (
      !dirContents.find(exportedType => exportedType === nameInIndex)
    ) {
      logger.error(
        `"${nameInIndex}" is exported from the ${barrelFilePath} but does not exist in this directory`
      );
      setsAreEqual = false;
    }
  });

  return setsAreEqual;
}
