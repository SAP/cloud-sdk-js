/* eslint-disable jsdoc/require-jsdoc */
import { join, resolve, parse, basename, dirname, posix, sep } from 'node:path';
import { promises, existsSync } from 'node:fs';
import { glob } from 'glob';
import { info, warning, error, getInput, setFailed } from '@actions/core';
import { flatten, unixEOL } from '@sap-cloud-sdk/util';
import mock from 'mock-fs';
// import directly from the files to avoid importing non-esm compatible functionality (e.g. __dirname)
import {
  readCompilerOptions,
  readIncludeExcludeWithDefaults,
  transpileDirectory
  // eslint-disable-next-line import/no-internal-modules
} from '@sap-cloud-sdk/generator-common/dist/compiler.js';
// eslint-disable-next-line import/no-internal-modules
import { defaultPrettierConfig } from '@sap-cloud-sdk/generator-common/dist/file-writer/create-file.js';
import { getPackages } from '@manypkg/get-packages';
import type { CompilerOptions } from 'typescript';

const { readFile, lstat, readdir } = promises;

const pathToTsConfigRoot = join(process.cwd(), 'tsconfig.json');
const pathRootNodeModules = join(process.cwd(), 'node_modules');
export const regexExportedIndex = /export(?:type)?\{([\w,]+)\}from'\./g;
export const regexExportedInternal = /\.\/([\w-]+)/g;

export interface ExportedObject {
  name: string;
  type: string;
  path: string;
}

function paths(pathToPackage: string): {
  pathToSource: string;
  pathToPackageJson: string;
  pathToTsConfig: string;
  pathToNodeModules: string;
  pathCompiled: string;
} {
  return {
    pathToSource: getPathWithPosixSeparator(join(pathToPackage, 'src')),
    pathToPackageJson: getPathWithPosixSeparator(
      join(pathToPackage, 'package.json')
    ),
    pathToTsConfig: getPathWithPosixSeparator(
      join(pathToPackage, 'tsconfig.json')
    ),
    pathToNodeModules: getPathWithPosixSeparator(
      join(pathToPackage, 'node_modules')
    ),
    pathCompiled: 'dist'
  };
}

function getPathWithPosixSeparator(filePath: string): string {
  return filePath.split(sep).join(posix.sep);
}

function mockFileSystem(pathToPackage: string) {
  const { pathToSource, pathToTsConfig, pathToNodeModules, pathToPackageJson } =
    paths(pathToPackage);
  mock({
    [pathToTsConfig]: mock.load(pathToTsConfig),
    [pathToPackageJson]: mock.load(pathToPackageJson),
    [pathToSource]: mock.load(pathToSource),
    [pathRootNodeModules]: mock.load(pathRootNodeModules),
    [pathToNodeModules]: mock.load(pathToNodeModules),
    [pathToTsConfigRoot]: mock.load(pathToTsConfigRoot)
  });
}

/**
 * Read the compiler options from the root and cwd tsconfig.json.
 * @param pathToPackage - Path to the package under investigation.
 * @returns The compiler options.
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

function getListFromInput(inputKey: string) {
  const input = getInput(inputKey);
  return input ? input.split(',').map(item => item.trim()) : [];
}

/**
 * Here the two sets: exports from index and exports from .d.ts are compared and logs are created.
 * @param allExportedIndex - Names of the object imported by the index.ts.
 * @param allExportedTypes - Exported object by the .d.ts files.
 * @returns True if the two sets export the same objects.
 */
function compareApisAndLog(
  allExportedIndex: string[],
  allExportedTypes: ExportedObject[]
): boolean {
  let setsAreEqual = true;
  const ignoredPathPattern = getInput('ignored_path_pattern');

  allExportedTypes.forEach(exportedType => {
    const normalizedPath = getPathWithPosixSeparator(exportedType.path);

    const isPathMatched = ignoredPathPattern
      ? new RegExp(ignoredPathPattern).test(normalizedPath)
      : false;
    if (
      !allExportedIndex.find(nameInIndex => exportedType.name === nameInIndex)
    ) {
      if (isPathMatched) {
        warning(
          `The ${exportedType.type} "${exportedType.name}" in file: ${exportedType.path} is not exported in the index.ts.`
        );
        return;
      }
      error(
        `The ${exportedType.type} "${exportedType.name}" in file: ${exportedType.path} is neither listed in the index.ts nor marked as internal.`
      );
      setsAreEqual = false;
    }
  });

  allExportedIndex.forEach(nameInIndex => {
    if (
      !allExportedTypes.find(exportedType => exportedType.name === nameInIndex)
    ) {
      error(
        `The object "${nameInIndex}" is exported from the index.ts but marked as @internal.`
      );
      setsAreEqual = false;
    }
  });
  info(`We have found ${allExportedIndex.length} exports.`);
  info(`Public api: ${allExportedIndex.sort().join(`,${unixEOL}`)}`);

  return setsAreEqual;
}

/**
 * Executes the public API check for a given package.
 * @param pathToPackage - Path to the package.
 */
export async function checkApiOfPackage(pathToPackage: string): Promise<void> {
  try {
    info(`Check package: ${pathToPackage}`);
    const { pathToSource, pathCompiled, pathToTsConfig } = paths(pathToPackage);
    mockFileSystem(pathToPackage);
    const opts = await getCompilerOptions(pathToPackage);
    const includeExclude = await readIncludeExcludeWithDefaults(pathToTsConfig);
    await transpileDirectory(
      pathToSource,
      {
        compilerOptions: opts,
        // We have things in our sources like  `#!/usr/bin/env node` in CLI `.js` files which is not working with parser of prettier.
        createFileOptions: {
          overwrite: true,
          prettierOptions: defaultPrettierConfig,
          usePrettier: false
        }
      },
      {
        exclude: includeExclude ? includeExclude.exclude : [],
        include: ['**/*.ts']
      }
    );

    const forceInternalExports = getInput('force_internal_exports') === 'true';

    if (forceInternalExports) {
      await checkBarrelRecursive(pathToSource);
    }

    const indexFilePath = join(pathToSource, 'index.ts');
    checkIndexFileExists(indexFilePath);

    const allExportedTypes = await parseTypeDefinitionFiles(pathCompiled);
    const allExportedIndex = await parseIndexFile(
      indexFilePath,
      forceInternalExports
    );

    const setsAreEqual = compareApisAndLog(allExportedIndex, allExportedTypes);
    mock.restore();
    if (!setsAreEqual) {
      process.exit(1);
    }
    info(
      `The index.ts of package ${pathToPackage} is in sync with the type annotations.\n`
    );
  } finally {
    mock.restore();
  }
}

export function checkIndexFileExists(indexFilePath: string): void {
  if (!existsSync(indexFilePath)) {
    error('No index.ts file found in root.');
  }
}

/**
 * Get the paths of all `.d.ts` files.
 * @param cwd - Directory which is scanned for type definitions.
 * @returns Paths to the `.d.ts` files excluding `index.d.ts` files.
 */
export async function typeDescriptorPaths(cwd: string): Promise<string[]> {
  const files = await glob('**/*.d.ts', { cwd });
  return files
    .filter(file => !file.endsWith('index.d.ts'))
    .map(file => join(cwd, file));
}

/**
 * Execute the parseTypeDefinitionFile for all files in the cwd.
 * @param pathCompiled - Path to the compiled sources containing the .d.ts files.
 * @returns Information on the exported objects.
 */
export async function parseTypeDefinitionFiles(
  pathCompiled: string
): Promise<ExportedObject[]> {
  const typeDefinitionPaths = await typeDescriptorPaths(pathCompiled);
  const result = await Promise.all(
    typeDefinitionPaths.map(async pathTypeDefinition => {
      const fileContent = await readFile(pathTypeDefinition, 'utf8');
      const types = parseExportedObjectsInFile(fileContent);
      return types.map(type => ({ path: pathTypeDefinition, ...type }));
    })
  );
  return flatten(result);
}

/**
 * Parses a '.d.ts' or '.ts' file for the exported objects in it.
 * @param fileContent - Content of the file to be processed.
 * @returns List of exported object.
 */
export function parseExportedObjectsInFile(
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
  ].reduce<Omit<ExportedObject, 'path'>[]>((allObjects, objectType) => {
    const regex =
      objectType === 'interface'
        ? new RegExp(`export ${objectType} (\\w+)`, 'g')
        : new RegExp(`export (?:declare )?${objectType} (\\w+)`, 'g');
    const exported = captureGroupsFromGlobalRegex(regex, normalized).map(
      element => ({ name: element, type: objectType })
    );
    return [...allObjects, ...exported];
  }, []);
}

/**
 * Parse a barrel file for the exported objects.
 * It selects all string in \{\} e.g. export \{a,b,c\} from './xyz' will result in [a,b,c].
 * Aliases defined with 'as' keyword are removed.
 * @param fileContent - Content of the index file to be parsed.
 * @param regex - Regular expression used for matching exports.
 * @returns List of objects exported by the given index file.
 */
export function parseBarrelFile(fileContent: string, regex: RegExp): string[] {
  // Remove block comments, single-line comments, 'as' keyword and aliases, and whitespace characters
  const normalized = fileContent.replace(
    /\/\*[\s\S]*?\*\/|\/\/.*|[\s]+as[\s]+[a-zA-Z_$][0-9a-zA-Z_$]*|[\s]+/g,
    ''
  );
  const groups = captureGroupsFromGlobalRegex(regex, normalized);

  return flatten(groups.map(group => group.split(',')));
}

function checkInternalReExports(fileContent: string, filePath: string): void {
  const internalReExports = parseBarrelFile(
    fileContent,
    /\{([\w,]+)\}from'.*\/internal'/g
  );
  if (internalReExports.length) {
    error(
      `Re-exporting internal modules is not allowed. ${internalReExports
        .map(reExport => `'${reExport}'`)
        .join(', ')} exported in '${filePath}'.`
    );
  }
}

export async function parseIndexFile(
  filePath: string,
  forceInternalExports: boolean
): Promise<string[]> {
  const cwd = dirname(filePath);
  const fileContent = await readFile(filePath, 'utf-8');
  checkInternalReExports(fileContent, filePath);
  const localExports = forceInternalExports
    ? parseBarrelFile(fileContent, regexExportedIndex)
    : [
        ...parseBarrelFile(fileContent, regexExportedIndex),
        ...parseExportedObjectsInFile(fileContent).map(obj => obj.name)
      ];
  const starFiles = captureGroupsFromGlobalRegex(
    /export \* from '([\w/.-]+)'/g,
    fileContent
  );
  const starFileExports = await Promise.all(
    starFiles.map(async relativeFilePath => {
      const absolutePath = relativeFilePath.endsWith('.js')
        ? resolve(cwd, `${relativeFilePath.slice(0, -3)}.ts`)
        : resolve(cwd, `${relativeFilePath}.ts`);

      return parseIndexFile(absolutePath, forceInternalExports);
    })
  );
  return [...localExports, ...starFileExports.flat()];
}

function captureGroupsFromGlobalRegex(regex: RegExp, str: string): string[] {
  const groups = Array.from(str.matchAll(regex));
  return groups.map(group => group[1]);
}

export async function checkBarrelRecursive(cwd: string): Promise<void> {
  (await readdir(cwd, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .forEach(async subDir => {
      if (subDir.name !== '__snapshots__') {
        await checkBarrelRecursive(join(cwd, subDir.name));
      }
    });
  await exportAllInBarrel(
    cwd,
    parse(cwd).name === 'src' ? 'internal.ts' : 'index.ts'
  );
}

export async function exportAllInBarrel(
  cwd: string,
  barrelFileName: string
): Promise<void> {
  const barrelFilePath = join(cwd, barrelFileName);
  if (existsSync(barrelFilePath) && (await lstat(barrelFilePath)).isFile()) {
    const dirContents = (
      await glob('*', {
        ignore: [
          '**/*.spec.ts',
          '__snapshots__',
          'internal.ts',
          'index.ts',
          'cli.ts',
          '**/*.md'
        ],
        cwd
      })
    ).map(name => basename(name, '.ts'));
    const exportedFiles = parseBarrelFile(
      await readFile(barrelFilePath, 'utf8'),
      regexExportedInternal
    );
    if (compareBarrels(dirContents, exportedFiles, barrelFilePath)) {
      error(`'${barrelFileName}' is not in sync.`);
    }
  } else {
    error(`No '${barrelFileName}' file found in '${cwd}'.`);
  }
}

function compareBarrels(
  dirContents: string[],
  exportedFiles: string[],
  barrelFilePath: string
) {
  const missingBarrelExports = dirContents.filter(
    x => !exportedFiles.includes(x)
  );
  missingBarrelExports.forEach(tsFiles =>
    error(`'${tsFiles}' is not exported in '${barrelFilePath}'.`)
  );

  const extraBarrelExports = exportedFiles.filter(
    x => !dirContents.includes(x)
  );
  extraBarrelExports.forEach(exports =>
    error(
      `'${exports}' is exported from the '${barrelFilePath}' but does not exist in this directory.`
    )
  );

  return missingBarrelExports.length || extraBarrelExports.length;
}

async function runCheckApi() {
  const { packages } = await getPackages(process.cwd());
  const excludedPackages = getListFromInput('excluded_packages');

  const packagesToCheck = packages.filter(
    pkg =>
      pkg.relativeDir.startsWith('packages') &&
      !excludedPackages.some(excl => pkg.relativeDir.includes(excl))
  );
  for (const pkg of packagesToCheck) {
    try {
      await checkApiOfPackage(pkg.dir);
    } catch (e) {
      setFailed(`API check failed for ${pkg.relativeDir}: ${e}`);
      process.exit(1);
    }
  }
}

if (require.main === module) {
  (async function () {
    await runCheckApi();
  })();
}
