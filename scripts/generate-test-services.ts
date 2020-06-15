/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import fs from 'fs';
import path from 'path';
import util from 'util';
import { exec } from 'child_process';
import { generate } from '../packages/generator/src';

type fsTypes = typeof fs.readdir & typeof fs.writeFile & typeof fs.readFile;
const [readFile, readdir, writeFile] = [
  fs.readFile,
  fs.readdir,
  fs.writeFile
].map((fsModule: fsTypes) => util.promisify(fsModule));

const serviceSpecsDir = path.join('test-resources', 'service-specs');
const packageOutputDir = path.resolve('test-packages', 'test-services', 'srv');
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

function generateTestServicesPackage(outputDir: string, version: 'v2' | 'v4') {
  generate({
    ...generatorConfig,
    inputDir: path.join(serviceSpecsDir, version),
    outputDir: `${outputDir}/${version}`,
    generateJs: true
  });
}

function generateLegacyTestService() {
  exec(
    'cp -r test-packages/test-services/test-service-legacy test-packages/test-services/srv/test-service-legacy'
  );
}

async function generateTestServicesWithLocalCoreModules(
  outputDirBase,
  version: 'v2' | 'v4'
) {
  const outputDir = path.resolve(outputDirBase, version);
  await generate({
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

generateTestServicesPackage(packageOutputDir, 'v2');
generateTestServicesPackage(packageOutputDir, 'v4');
generateLegacyTestService();
generateTestServicesWithLocalCoreModules(coreUnitTestOutputDir, 'v2');
generateTestServicesWithLocalCoreModules(coreUnitTestOutputDir, 'v4');
