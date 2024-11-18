import { promises as promisesFs } from 'fs';
import { resolve, parse } from 'path';
import {
  createLogger,
  kebabCase,
  finishAll,
  setLogLevel,
  ErrorWithCause
} from '@sap-cloud-sdk/util';
import {
  getSdkMetadataFileNames,
  getSdkVersion,
  readCompilerOptions,
  transpileDirectory,
  copyFiles,
  packageDescription,
  createFile,
  readPrettierConfig,
  parseOptions,
  writeOptionsPerService,
  getOptionsPerService,
  getRelPathWithPosixSeparator
} from '@sap-cloud-sdk/generator-common/internal';
import {
  apiFile,
  packageJson,
  readme,
  schemaFile,
  responseFile,
  apiIndexFile,
  schemaIndexFile
} from './file-serializer';
import { parseOpenApiDocument } from './parser';
import { convertOpenApiSpec } from './document-converter';
import { sdkMetadata } from './sdk-metadata';
import { cliOptions, tsconfigJson } from './options';
import type { GeneratorOptions, ParsedGeneratorOptions } from './options';
import type { OpenApiDocument } from './openapi-types';
import type {
  CreateFileOptions,
  ServiceOptions
} from '@sap-cloud-sdk/generator-common/internal';

const { mkdir } = promisesFs;
const logger = createLogger('openapi-generator');

/**
 * Main entry point for the OpenAPI client generation.
 * Generates models and API files.
 * @param options - Options to configure generation.
 * @returns A promise to void.
 */
export async function generate(
  options: GeneratorOptions & { config?: string }
): Promise<void> {
  const parsedOptions = parseOptions(cliOptions, options);
  if (parsedOptions.verbose) {
    setLogLevel('verbose', logger);
  }

  logger.verbose(`Parsed Options: ${JSON.stringify(options, null, 2)}`);

  return generateWithParsedOptions(parsedOptions);
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
  if (!options.input.length || options.outputDir === '') {
    throw new Error('Either input or outputDir were not set.');
  }

  if (options.clearOutputDir) {
    // function rm was added in node version 14 and is the preferred method to use.
    const rm = promisesFs.rm || promisesFs.rmdir;
    const forceOption =
      typeof promisesFs.rm === 'undefined' ? {} : { force: true };
    await rm(options.outputDir, { recursive: true, ...forceOption });
  }
  const inputFilePaths = options.input;

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
      await writeOptionsPerService(
        options.optionsPerService,
        optionsPerService,
        options
      );
    }

    if (!options.packageJson) {
      logger.info(
        "Finished generation. Don't forget to add @sap-cloud-sdk/openapi to your dependencies."
      );
    }
  }
}

async function getFileCreationOptions(
  options: ParsedGeneratorOptions
): Promise<CreateFileOptions> {
  return {
    prettierOptions: await readPrettierConfig(options.prettierConfig),
    overwrite: options.overwrite,
    generateESM: options.generateESM
  };
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
      await getFileCreationOptions(options)
    );
    const transpileOptions = {
      compilerOptions: await readCompilerOptions(serviceDir),
      createFileOptions: await getFileCreationOptions(options)
    };
    await transpileDirectory(serviceDir, transpileOptions);
  }

  if (options.readme) {
    await generateReadme(serviceDir, openApiDocument, options);
  }
}

async function generateMandatorySources(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  options: ParsedGeneratorOptions
): Promise<void> {
  const createFileOptions = await getFileCreationOptions(options);
  if (openApiDocument.schemas.length) {
    const schemaDir = resolve(serviceDir, 'schema');
    await createSchemaFiles(schemaDir, openApiDocument, createFileOptions);
    await createFile(
      schemaDir,
      'index.ts',
      schemaIndexFile(openApiDocument, createFileOptions),
      createFileOptions
    );
  }

  if (openApiDocument.componentResponses.length) {
    const responseDir = resolve(serviceDir, 'responses');
    await createResponseFiles(responseDir, openApiDocument, createFileOptions);
    await createFile(
      responseDir,
      'index.ts',
      schemaIndexFile(openApiDocument, createFileOptions),
      createFileOptions
    );
  }

  await createApis(serviceDir, openApiDocument, createFileOptions);
  await createFile(
    serviceDir,
    'index.ts',
    apiIndexFile(openApiDocument, createFileOptions),
    createFileOptions
  );
}

async function createApis(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  options: CreateFileOptions
): Promise<void> {
  await Promise.all(
    openApiDocument.apis.map(api =>
      createFile(
        serviceDir,
        `${kebabCase(api.name)}.ts`,
        apiFile(api, openApiDocument.serviceName, options),
        options
      )
    )
  );
}

async function createSchemaFiles(
  dir: string,
  openApiDocument: OpenApiDocument,
  createFileOptions: CreateFileOptions
): Promise<void> {
  await mkdir(dir, { recursive: true });
  await Promise.all(
    openApiDocument.schemas.map(schema =>
      createFile(
        dir,
        `${schema.fileName}.ts`,
        schemaFile(schema, createFileOptions),
        createFileOptions
      )
    )
  );
}

async function createResponseFiles(
  dir: string,
  openApiDocument: OpenApiDocument,
  createFileOptions: CreateFileOptions
): Promise<void> {
  await mkdir(dir, { recursive: true });
  await Promise.all(
    openApiDocument.componentResponses.map(response =>
      createFile(
        dir,
        `${response.fileName}.ts`,
        responseFile(response, createFileOptions),
        createFileOptions
      )
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
    {
      strictNaming: !options.skipValidation,
      schemaPrefix: options.schemaPrefix
    }
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

async function generateReadme(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  options: ParsedGeneratorOptions
): Promise<void> {
  logger.verbose(`Generating readme in ${serviceDir}.`);

  return createFile(
    serviceDir,
    'README.md',
    readme(openApiDocument),
    await getFileCreationOptions(options)
  );
}

async function generateMetadata(
  openApiDocument: OpenApiDocument,
  inputFilePath: string,
  options: ParsedGeneratorOptions
) {
  const { name: inputFileName, dir: inputDirPath } = parse(inputFilePath);
  const { clientFileName } = getSdkMetadataFileNames(inputFileName);

  const metadataDir = resolve(inputDirPath, 'sdk-metadata');
  await mkdir(metadataDir, { recursive: true });

  logger.verbose(`Generating client metadata ${clientFileName}...`);
  const createFileOptions = await getFileCreationOptions(options);
  const clientFile = createFile(
    metadataDir,
    clientFileName,
    JSON.stringify(await sdkMetadata(openApiDocument), null, 2),
    createFileOptions
  );
  return clientFile;
}

async function generatePackageJson(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  options: ParsedGeneratorOptions
) {
  logger.verbose(`Generating package.json in ${serviceDir}.`);
  const createFileOptions = await getFileCreationOptions(options);

  await createFile(
    serviceDir,
    'package.json',
    packageJson({
      npmPackageName: openApiDocument.serviceOptions.packageName,
      description: packageDescription(openApiDocument.serviceName),
      sdkVersion: await getSdkVersion()
    }),
    createFileOptions
  );
}
