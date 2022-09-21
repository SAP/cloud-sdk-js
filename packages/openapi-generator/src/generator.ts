import { promises as promisesFs } from 'fs';
import { resolve, parse, basename, dirname, posix } from 'path';
import {
  createLogger,
  kebabCase,
  finishAll,
  setLogLevel,
  formatJson,
  ErrorWithCause
} from '@sap-cloud-sdk/util';
import {
  getSdkMetadataFileNames,
  getSdkVersion,
  readCompilerOptions,
  transpileDirectory,
  copyFiles,
  packageDescription
} from '@sap-cloud-sdk/generator-common/internal';
import { glob } from 'glob';
import { apiFile } from './file-serializer/api-file';
import { packageJson } from './file-serializer/package-json';
import { readme } from './file-serializer/readme';
import { schemaFile } from './file-serializer/schema-file';
import { apiIndexFile, schemaIndexFile } from './file-serializer/index-file';
import { OpenApiDocument } from './openapi-types';
import { parseOpenApiDocument } from './parser/document';
import { convertOpenApiSpec } from './document-converter';
import { createFile } from './file-writer';
import {
  parseGeneratorOptions,
  ParsedGeneratorOptions,
  GeneratorOptions
} from './options/generator-options';
import {
  ServiceOptions,
  OptionsPerService,
  getOptionsPerService,
  getOriginalOptionsPerService,
  getRelPathWithPosixSeparator
} from './options/options-per-service';
import { tsconfigJson } from './options/tsconfig-json';
import { sdkMetadata } from './sdk-metadata';

const { mkdir, lstat } = promisesFs;
const logger = createLogger('openapi-generator');

/**
 * Main entry point for the OpenAPI client generation.
 * Generates models and API files.
 * @param options - Options to configure generation.
 */
export async function generate(options: GeneratorOptions): Promise<void> {
  return generateWithParsedOptions(parseGeneratorOptions(options));
}

/**
 * Main entry point for the OpenAPI client generation.
 * Generates models and API files.
 * @param options - Options to configure generation.
 * @internal
 */
export async function generateWithParsedOptions(
  options: ParsedGeneratorOptions
): Promise<void> {
  if (options.input === '' || options.outputDir === '') {
    throw new Error('Either input or outputDir were not set.');
  }
  if (options.verbose) {
    setLogLevel('verbose', logger);
  }

  if (options.clearOutputDir) {
    // function rm was added in node version 14 and is the preferred method to use.
    const rm = promisesFs.rm || promisesFs.rmdir;
    const forceOption =
      typeof promisesFs.rm === 'undefined' ? {} : { force: true };
    await rm(options.outputDir, { recursive: true, ...forceOption });
  }
  const inputFilePaths = await getInputFilePaths(options.input);

  const optionsPerService = await getOptionsPerService(inputFilePaths, options);
  const tsConfig = await tsconfigJson(options);

  const promises = inputFilePaths.map(inputFilePath =>
    generateService(
      inputFilePath,
      options,
      optionsPerService[getRelPathWithPosixSeparator(inputFilePath)],
      tsConfig
    )
  );

  try {
    const errorMessage =
      promises.length > 1
        ? 'Some clients could not be generated.'
        : 'Could not generate client.';
    await finishAll(promises, errorMessage);
  } catch (err) {
    if (err.message?.includes('error TS2307')) {
      throw new ErrorWithCause(
        'Did you forget to install "@sap-cloud-sdk/openapi"?',
        err
      );
    }
    throw err;
  } finally {
    if (options.optionsPerService) {
      await generateOptionsPerService(
        options.optionsPerService,
        optionsPerService
      );
    }

    if (!options.packageJson) {
      logger.info(
        "Finished generation. Don't forget to add @sap-cloud-sdk/openapi to your dependencies."
      );
    }
  }
}

/**
 * Generate sources.
 * @param serviceDir - Directory to generate the service to.
 * @param openApiDocument - Parsed service.
 * @param inputFilePath - Path to the input file.
 * @param tsConfig - File content for the `tsconfig.json`.
 * @param options - Generation options.
 */
async function generateSources(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  inputFilePath: string,
  tsConfig: string | undefined,
  options: ParsedGeneratorOptions
): Promise<void> {
  await mkdir(serviceDir, { recursive: true });

  await generateMandatorySources(serviceDir, openApiDocument, options);

  if (options.metadata) {
    await generateMetadata(openApiDocument, inputFilePath, options);
  }

  if (options.packageJson) {
    await generatePackageJson(serviceDir, openApiDocument, options);
  }

  if (options.include) {
    await copyFiles(options.include, serviceDir, options.overwrite);
  }

  if (tsConfig) {
    await createFile(
      serviceDir,
      'tsconfig.json',
      tsConfig,
      options.overwrite,
      false
    );
    await transpileDirectory(serviceDir, await readCompilerOptions(serviceDir));
  }

  if (options.readme) {
    await generateReadme(serviceDir, openApiDocument, options);
  }
}

async function generateMandatorySources(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  { overwrite }: ParsedGeneratorOptions
): Promise<void> {
  if (openApiDocument.schemas.length) {
    const schemaDir = resolve(serviceDir, 'schema');
    await createSchemaFiles(schemaDir, openApiDocument, overwrite);
    await createFile(
      schemaDir,
      'index.ts',
      schemaIndexFile(openApiDocument),
      overwrite
    );
  }

  await createApis(serviceDir, openApiDocument, overwrite);
  await createFile(
    serviceDir,
    'index.ts',
    apiIndexFile(openApiDocument),
    overwrite
  );
}

async function createApis(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  overwrite: boolean
): Promise<void> {
  await Promise.all(
    openApiDocument.apis.map(api =>
      createFile(
        serviceDir,
        `${kebabCase(api.name)}.ts`,
        apiFile(api, openApiDocument.serviceName),
        overwrite
      )
    )
  );
}

async function createSchemaFiles(
  dir: string,
  openApiDocument: OpenApiDocument,
  overwrite: boolean
): Promise<void> {
  await mkdir(dir, { recursive: true });
  await Promise.all(
    openApiDocument.schemas.map(schema =>
      createFile(dir, `${schema.fileName}.ts`, schemaFile(schema), overwrite)
    )
  );
}

/**
 * Generates an OpenAPI service from a file.
 * @param inputFilePath - The file path where the service to generate is located.
 * @param options - Options to configure generation.
 * @param serviceOptions - Service options as defined in the options per service.
 * @param tsConfig - File content for the `tsconfig.json`.
 */
async function generateService(
  inputFilePath: string,
  options: ParsedGeneratorOptions,
  serviceOptions: ServiceOptions,
  tsConfig: string | undefined
): Promise<void> {
  const openApiDocument = await convertOpenApiSpec(inputFilePath);
  const parsedOpenApiDocument = await parseOpenApiDocument(
    openApiDocument,
    serviceOptions,
    { strictNaming: !options.skipValidation }
  );

  const serviceDir = resolve(options.outputDir, serviceOptions.directoryName);
  await generateSources(
    serviceDir,
    parsedOpenApiDocument,
    inputFilePath,
    tsConfig,
    options
  );
  logger.info(`Successfully generated client for '${inputFilePath}'`);
}

/**
 * Recursively searches through a given input path and returns all file paths as a string array.
 * @param input - the path to the input directory.
 * @returns all file paths as a string array.
 * @internal
 */
export async function getInputFilePaths(input: string): Promise<string[]> {
  if (glob.hasMagic(input)) {
    return new Promise(resolvePromise => {
      glob(input, (_error, paths) => {
        resolvePromise(
          paths
            .filter(path => /(.json|.JSON|.yaml|.YAML|.yml|.YML)$/.test(path))
            .map(path => resolve(path))
        );
      });
    });
  }

  if ((await lstat(input)).isDirectory()) {
    return new Promise(resolvePromise => {
      glob(
        posix.join(input, '**/*.{json,JSON,yaml,YAML,yml,YML}'),
        (_error, paths) => {
          resolvePromise(paths.map(path => resolve(path)));
        }
      );
    });
  }

  return [resolve(input)];
}

function generateReadme(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  { overwrite }: ParsedGeneratorOptions
): Promise<void> {
  logger.verbose(`Generating readme in ${serviceDir}.`);

  return createFile(
    serviceDir,
    'README.md',
    readme(openApiDocument),
    overwrite,
    false
  );
}

async function generateMetadata(
  openApiDocument: OpenApiDocument,
  inputFilePath: string,
  { overwrite }: ParsedGeneratorOptions
) {
  const { name: inputFileName, dir: inputDirPath } = parse(inputFilePath);
  const { clientFileName } = getSdkMetadataFileNames(inputFileName);

  const metadataDir = resolve(inputDirPath, 'sdk-metadata');
  await mkdir(metadataDir, { recursive: true });

  logger.verbose(`Generating client metadata ${clientFileName}...`);
  const clientFile = createFile(
    metadataDir,
    clientFileName,
    JSON.stringify(await sdkMetadata(openApiDocument), null, 2),
    overwrite,
    false
  );
  return clientFile;
}

async function generatePackageJson(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  { packageVersion, overwrite, licenseInPackageJson }: ParsedGeneratorOptions
) {
  logger.verbose(`Generating package.json in ${serviceDir}.`);

  await createFile(
    serviceDir,
    'package.json',
    packageJson({
      npmPackageName: openApiDocument.serviceOptions.packageName,
      description: packageDescription(openApiDocument.serviceName),
      sdkVersion: await getSdkVersion(),
      version: packageVersion,
      license: licenseInPackageJson
    }),
    overwrite,
    false
  );
}

async function generateOptionsPerService(
  filePath: string,
  optionsPerService: OptionsPerService
) {
  logger.verbose('Generating options per service.');

  const dir = dirname(filePath);
  await mkdir(dir, { recursive: true });
  await createFile(
    dir,
    basename(filePath),
    formatJson({
      ...(await getOriginalOptionsPerService(filePath)),
      ...optionsPerService
    }),
    true,
    false
  );
}
