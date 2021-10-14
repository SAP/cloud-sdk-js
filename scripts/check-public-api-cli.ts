import { join, resolve } from 'path';
import { promises } from 'fs';
import { createLogger } from '@sap-cloud-sdk/util';
import mock from 'mock-fs';
import {
  readCompilerOptions,
  transpileDirectory
} from '@sap-cloud-sdk/generator-common';
import { CompilerOptions } from 'typescript';
import {
  checkSingleIndexFile,
  ExportedObject,
  indexFiles,
  parseIndexFile,
  parseTypeDefinitionFile,
  typeDescriptorPaths
} from './check-public-api';

const logger = createLogger('check-public-api');
const pathToTsConfigRoot = join(__dirname, '../tsconfig.json');
const pathRootNodeModules = resolve(__dirname, '../node_modules');

async function readAllTypeDefinitions(
  pathCompiled: string
): Promise<{ path: string; content: string }[]> {
  const typeDefinitionPaths = typeDescriptorPaths(pathCompiled);
  return Promise.all(
    typeDefinitionPaths.map(async path => ({
      path,
      content: await promises.readFile(path, 'utf8')
    }))
  );
}

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

/*
For a deatailed explaination what is happening here have a look at `0007-public-api-check.md` in the implementation documentation.
 */
function processResult(
  allExportedIndex: string[],
  allExportedTypes: ExportedObject[]
): boolean {
  let somethingWrong = false;
  for (const exportedType of allExportedTypes) {
    if (
      !allExportedIndex.find(nameInIndex => exportedType.name === nameInIndex)
    ) {
      logger.error(
        `The ${exportedType.type} "${exportedType.name}" in file: ${exportedType.path} is not listed in the index.ts but also not marked as internal.`
      );
      somethingWrong = true;
    }
  }

  for (const nameInIndex of allExportedIndex) {
    if (
      !allExportedTypes.find(exportedType => exportedType.name === nameInIndex)
    ) {
      logger.error(
        `The object "${nameInIndex}" is the index.ts but marked as internal.`
      );
      somethingWrong = true;
    }
  }
  return somethingWrong;
}

async function checkApiOfPackage(pathToPackage: string): Promise<void> {
  const { pathToSource, pathCompiled } = paths(pathToPackage);
  mockFileSystem(pathToPackage);
  await transpileDirectory(
    pathToSource,
    await getCompilerOptions(pathToPackage)
  );

  checkSingleIndexFile(join(pathToPackage, 'src'));
  const allFiles = await readAllTypeDefinitions(pathCompiled);

  const allExportedTypes = allFiles.reduce((all, file) => {
    const newElements: ExportedObject[] = parseTypeDefinitionFile(
      file.content
    ).map(withtoutPath => ({ path: file.path, ...withtoutPath }));
    return [...all, ...newElements];
  }, [] as ExportedObject[]);

  const allExportedIndex = parseIndexFile(
    await promises.readFile(indexFiles(pathToPackage)[0], 'utf8')
  );

  const somethingWrong = processResult(allExportedIndex, allExportedTypes);
  mock.restore();
  if (somethingWrong) {
    process.exit(1);
  }
  logger.info(
    `The index.ts of package ${pathToPackage} is in sync with the type annotations.`
  );
}


/*
For a deatailed explaination what is happening here have a look at `0007-public-api-check.md` in the implementation documentation.
 */
checkApiOfPackage(resolve(__dirname, '../packages/connectivity'));
