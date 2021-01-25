import fs from 'fs';
import path from 'path';
import util from 'util';
import { createLogger } from '@sap-cloud-sdk/util';
import { generate as generateOdata } from '../packages/generator/src';
import { generate as generateOpenApi } from '../packages/openapi-generator/src';
import { ODataVersion } from '../packages/util/src';

type fsTypes = typeof fs.readdir & typeof fs.writeFile & typeof fs.readFile;
const [readFile, readdir, writeFile] = [
  fs.readFile,
  fs.readdir,
  fs.writeFile
].map((fsModule: fsTypes) => util.promisify(fsModule));

const odataServiceSpecsDir = path.join('test-resources', 'odata-service-specs');
const openApiServiceSpecsDir = path.join(
  'test-resources',
  'openapi-service-specs'
);
const packageOutputDir = path.resolve('test-packages', 'test-services');
const coreUnitTestOutputDir = path.resolve(
  'packages',
  'core',
  'test',
  'test-util',
  'test-services'
);

const generatorConfigOData = {
  forceOverwrite: true,
  generateJs: false,
  useSwagger: false,
  writeReadme: false,
  clearOutputDir: true,
  generateNpmrc: false,
  generateTypedocJson: false,
  generatePackageJson: false,
  generateCSN: false,
  // Unnecessary options
  sdkAfterVersionScript: false,
  s4hanaCloud: false
};

const generatorConfigOpenApi = {
  input: path.resolve('test-resources', 'openapi-service-specs'),
  outputDir: path.resolve('test-packages', 'test-services', 'openapi'),
  clearOutputDir: true,
  generateJs: true,
  generatePackageJson: true,
  versionInPackageJson: '1.2.3',
  additionalFiles: 'scripts/{CHANGELOG.md,test-license}'
};

const logger = createLogger('generate-test-service');

function generateTestServicesPackage(
  outputDir: string,
  version: ODataVersion
): Promise<void> {
  return generateOdata({
    ...generatorConfigOData,
    inputDir: path.join(odataServiceSpecsDir, version),
    outputDir: `${outputDir}/${version}`,
    generateJs: true
  });
}

async function generateTestServicesWithLocalCoreModules(
  outputDirBase,
  version: ODataVersion | 'openapi'
): Promise<void> {
  const outputDir = path.resolve(outputDirBase, version);
  if (version !== 'openapi') {
    await generateOdata({
      ...generatorConfigOData,
      inputDir: path.join(odataServiceSpecsDir, version),
      outputDir
    });
  } else {
    await generateOpenApi({
      ...generatorConfigOpenApi,
      input: openApiServiceSpecsDir,
      outputDir
    });
  }

  (await readServiceDirectories()).forEach(serviceDirectory =>
    readServiceDirectory(serviceDirectory).then(files =>
      files.forEach(file =>
        readServiceFile(serviceDirectory, file).then(data => {
          replaceWithLocalModules(serviceDirectory, file, data);
        })
      )
    )
  );

  function readServiceDirectories() {
    return readdir(outputDir).catch(dirErr => {
      throw Error(`Reading output directory failed: ${dirErr}`);
    });
  }

  function readServiceDirectory(serviceDirectory) {
    return readdir(path.resolve(outputDir, serviceDirectory)).catch(
      serviceDirErr => {
        throw Error(`Reading test service directory failed: ${serviceDirErr}`);
      }
    );
  }

  function readServiceFile(serviceDirectory, file) {
    return readFile(path.resolve(outputDir, serviceDirectory, file), {
      encoding: 'utf8'
    }).catch(fileReadErr => {
      throw Error(`Reading test service file '${file}' failed: ${fileReadErr}`);
    });
  }

  function replaceWithLocalModules(serviceDirectory, file, data) {
    return writeFile(
      path.resolve(outputDir, serviceDirectory, file),
      data.replace('@sap-cloud-sdk/core', '../../../../../src'),
      {
        encoding: 'utf8'
      }
    ).catch(fileWriteErr => {
      throw Error(
        `Writing test service file' ${file}' failed: ${fileWriteErr}`
      );
    });
  }
}

async function generateAll(): Promise<void> {
  const arg = process.argv[2];
  if (arg === 'v2' || arg === 'odata' || arg === 'all') {
    await generateTestServicesPackage(packageOutputDir, 'v2');
    await generateTestServicesWithLocalCoreModules(coreUnitTestOutputDir, 'v2');
  }

  if (arg === 'v4' || arg === 'odata' || arg === 'all') {
    await generateTestServicesPackage(packageOutputDir, 'v4');
    await generateTestServicesWithLocalCoreModules(coreUnitTestOutputDir, 'v4');
  }

  if (arg === 'e2e' || arg === 'all') {
    await generateOdata({
      ...generatorConfigOData,
      inputDir: path.resolve('test-resources', 'odata-service-specs-e2e', 'v4'),
      outputDir: path.resolve('test-packages', 'test-services-e2e', 'v4'),
      generateJs: true
    });

    await generateOdata({
      ...generatorConfigOData,
      inputDir: path.resolve(
        'test-resources',
        'odata-service-specs-e2e',
        'TripPin'
      ),
      outputDir: path.resolve('test-packages', 'test-services-e2e', 'TripPin'),
      generateJs: true
    });
  }

  if (arg === 'openapi' || arg === 'rest' || arg === 'all') {
    await generateOpenApi(generatorConfigOpenApi);
    await generateTestServicesWithLocalCoreModules(
      coreUnitTestOutputDir,
      'openapi'
    );
  }
}

generateAll().catch(err => {
  logger.error('Something went wrong in the generation');
  logger.error(err);
  process.exit(1);
});
