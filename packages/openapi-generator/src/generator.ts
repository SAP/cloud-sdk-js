import { promises as promisesFs } from 'fs';
import { resolve, parse, basename, dirname, relative, posix, sep } from 'path';
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
  sdkMetadataHeader,
  transpileDirectory,
  copyFiles
} from '@sap-cloud-sdk/generator-common/internal';
import {
  apiFile,
  packageJson,
  genericDescription,
  readme,
  apiIndexFile,
  schemaIndexFile,
  schemaFile
} from './file-serializer';
import { OpenApiDocument } from './openapi-types';
import { parseOpenApiDocument } from './parser';
import { convertOpenApiSpec } from './document-converter';
import { createFile } from './file-writer';
import {
  parseGeneratorOptions,
  tsconfigJson,
  ServiceOptions,
  OptionsPerService,
  getOptionsPerService,
  getOriginalOptionsPerService,
  ParsedGeneratorOptions,
  GeneratorOptions
} from './options';
import { sdkMetadata } from './sdk-metadata';

const { readdir, rmdir, mkdir, lstat } = promisesFs;
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
    await rmdir(options.outputDir, { recursive: true });
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
    await generatePackageJson(
      serviceDir,
      openApiDocument.serviceOptions,
      options
    );
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
 * @param serviceName - The unique service name to be used.
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
 * Gives the relative path with respect to process.cwd() using posix file separator '/'.
 * @param absolutePath - The absolute path
 * @returns The relative path
 * @internal
 */
export function getRelPathWithPosixSeparator(absolutePath: string): string {
  return relative(process.cwd(), absolutePath).split(sep).join(posix.sep);
}

/**
 * Recursively searches through a given input path and returns all file paths as a string array.
 * @param input - the path to the input directory.
 * @returns all file paths as a string array.
 * @internal
 */
export async function getInputFilePaths(input: string): Promise<string[]> {
  if ((await lstat(input)).isFile()) {
    return [input];
  }

  const directoryContents = await readdir(input);

  return directoryContents.reduce(
    async (paths: Promise<string[]>, directoryContent) => [
      ...(await paths),
      ...(await getInputFilePaths(resolve(input, directoryContent)))
    ],
    Promise.resolve([] as string[])
  );
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
  { packageVersion, overwrite }: ParsedGeneratorOptions
) {
  const { name: inputFileName, dir: inputDirPath } = parse(inputFilePath);
  const { clientFileName, headerFileName } =
    getSdkMetadataFileNames(inputFileName);

  logger.verbose(`Generating header metadata ${headerFileName}.`);
  const metadataDir = resolve(inputDirPath, 'sdk-metadata');
  await mkdir(metadataDir, { recursive: true });
  const headerFile = createFile(
    metadataDir,
    headerFileName,
    JSON.stringify(
      await sdkMetadataHeader('rest', inputFileName, packageVersion),
      null,
      2
    ),
    overwrite,
    false
  );

  logger.verbose(`Generating client metadata ${clientFileName}...`);
  const clientFile = createFile(
    metadataDir,
    clientFileName,
    JSON.stringify(await sdkMetadata(openApiDocument), null, 2),
    overwrite,
    false
  );
  return Promise.all([headerFile, clientFile]);
}

async function generatePackageJson(
  serviceDir: string,
  { packageName, directoryName }: ServiceOptions,
  { packageVersion, overwrite, licenseInPackageJson }: ParsedGeneratorOptions
) {
  logger.verbose(`Generating package.json in ${serviceDir}.`);

  await createFile(
    serviceDir,
    'package.json',
    packageJson({
      npmPackageName: packageName,
      description: genericDescription(directoryName),
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
