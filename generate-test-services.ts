/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import fs from 'fs';
import path from 'path';
import util from 'util';
import { generate } from './packages/generator/src';

const [readdir, readFile, writeFile] = [fs.readdir, fs.readFile, fs.writeFile].map(fsModule => util.promisify(fsModule));

const inputDir = path.join('test-resources', 'service-specs');
const packageOutputDir = path.resolve('test-packages', 'test-services', 'srv');
const coreUnitTestOutputDir = path.resolve('packages', 'core', 'test', 'test-util', 'test-services');

const generatorConfig = {
  inputDir,
  forceOverwrite: true,
  generateJs: false,
  useSwagger: false,
  writeReadme: false,
  clearOutputDir: true,
  generateNpmrc: false,
  generateTypedocJson: false,
  generatePackageJson: false,
  generateCSN: false,
  // unnecessary options
  sdkAfterVersionScript: false,
  s4hanaCloud: false
};

function generateTestServicesPackage(outputDir) {
  generate({ ...generatorConfig, outputDir, generateJs: true });
}

async function generateTestServicesWithLocalCoreModules(outputDir) {
  await generate({ ...generatorConfig, outputDir });

  (await readServiceDirectories()).forEach(serviceDirectory =>
    readServiceDirectory(serviceDirectory).then(files =>
      files.forEach(file => readServiceFile(serviceDirectory, file).then(data => replaceWithLocalModules(serviceDirectory, file, data)))
    )
  );

  function readServiceDirectories() {
    return readdir(outputDir).catch(dirErr => {
      throw Error(`Reading output directory failed: ${dirErr}`);
    });
  }

  function readServiceDirectory(serviceDirectory) {
    return readdir(path.resolve(outputDir, serviceDirectory)).catch(serviceDirErr => {
      throw Error(`Reading test service directory failed: ${serviceDirErr}`);
    });
  }

  function readServiceFile(serviceDirectory, file) {
    return readFile(path.resolve(outputDir, serviceDirectory, file), { encoding: 'utf8' }).catch(fileReadErr => {
      throw Error(`Reading test service file '${file}' failed: ${fileReadErr}`);
    });
  }

  function replaceWithLocalModules(serviceDirectory, file, data) {
    return writeFile(path.resolve(outputDir, serviceDirectory, file), data.replace('@sap-cloud-sdk/core', '../../../../src'), {
      encoding: 'utf8'
    }).catch(fileWriteErr => {
      throw Error(`Writing test service file' ${file}' failed: ${fileWriteErr}`);
    });
  }
}

generateTestServicesPackage(packageOutputDir);
generateTestServicesWithLocalCoreModules(coreUnitTestOutputDir);
