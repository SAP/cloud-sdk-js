import fs from 'fs';
import path from 'path';
import util from 'util';
import { generate as generateOdata } from '../packages/generator/src';
import { generateClients as generateOpenApi } from '../packages/openapi-generator/src';
import { ODataVersion } from '../packages/util/src';

type fsTypes = typeof fs.readdir & typeof fs.writeFile & typeof fs.readFile;
const [readFile, readdir, writeFile] = [
  fs.readFile,
  fs.readdir,
  fs.writeFile
].map((fsModule: fsTypes) => util.promisify(fsModule));

const serviceSpecsDir = path.join('test-resources', 'odata-service-specs');
const packageOutputDir = path.resolve('test-packages', 'test-services');
const coreUnitTestOutputDir = path.resolve(
  'packages',
  'core',
  'test',
  'test-util',
  'test-services'
);

const generatorConfig = {
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

function generateTestServicesPackage(outputDir: string, version: ODataVersion) {
  generateOdata({
    ...generatorConfig,
    inputDir: path.join(serviceSpecsDir, version),
    outputDir: `${outputDir}/${version}`,
    generateJs: true
  });
}

async function generateTestServicesWithLocalCoreModules(
  outputDirBase,
  version: ODataVersion
) {
  const outputDir = path.resolve(outputDirBase, version);
  await generateOdata({
    ...generatorConfig,
    inputDir: path.join(serviceSpecsDir, version),
    outputDir
  });

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

const arg = process.argv[2];
if (arg === 'v2' || arg === 'odata' || arg === 'all') {
  generateTestServicesPackage(packageOutputDir, 'v2');
  generateTestServicesWithLocalCoreModules(coreUnitTestOutputDir, 'v2');
}

if (arg === 'v4' || arg === 'odata' || arg === 'all') {
  generateTestServicesPackage(packageOutputDir, 'v4');
  generateTestServicesWithLocalCoreModules(coreUnitTestOutputDir, 'v4');
}

if (arg === 'e2e' || arg === 'all') {
  generateOdata({
    ...generatorConfig,
    inputDir: path.resolve('test-resources', 'odata-service-specs-e2e', 'v4'),
    outputDir: path.resolve('test-packages', 'test-services-e2e', 'v4'),
    generateJs: true
  });

  generateOdata({
    ...generatorConfig,
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
  generateOpenApi({
    inputDir: path.resolve('test-resources', 'openapi-service-specs'),
    outputDir: path.resolve('test-packages', 'test-services', 'openapi'),
    clearOutputDir: true
  });
}
