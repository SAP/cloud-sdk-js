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

const inputDir = path.join('test-resources', 'service-specs');
const packageOutputDir = path.resolve('test-packages', 'test-services', 'srv');
const coreUnitTestOutputDir = path.resolve(
  'packages',
  'core',
  'test',
  'test-util',
  'test-services'
);

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
  // Unnecessary options
  sdkAfterVersionScript: false,
  s4hanaCloud: false
};

function generateTestServicesPackage(outputDir) {
  generate({ ...generatorConfig, outputDir, generateJs: true });
  exec(
    'cp -r test-packages/test-services/test-service-legacy test-packages/test-services/srv/test-service-legacy'
  );
}

async function generateTestServicesWithLocalCoreModules(
  outputDirBase,
  version: 'v2' | 'v4'
) {
  const outputDir = path.resolve(outputDirBase, version);
  await generate({ ...generatorConfig, outputDir });

  (await readServiceDirectories()).forEach(serviceDirectory =>
    readServiceDirectory(serviceDirectory).then(files =>
      files.forEach(file =>
        readServiceFile(serviceDirectory, file).then(data => {
          const fileContent =
            version === 'v4'
              ? ((data as unknown) as string).replace(
                  /\bLink\b/g,
                  'OneToManyLink'
                )
              : data;
          replaceWithLocalModules(serviceDirectory, file, fileContent, version);
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

  function replaceWithLocalModules(serviceDirectory, file, data, v) {
    const versionSuffix = v === 'v4' ? '/odata/v4' : '';
    return writeFile(
      path.resolve(outputDir, serviceDirectory, file),
      data.replace('@sap-cloud-sdk/core', `../../../../../src${versionSuffix}`),
      {
        encoding: 'utf8'
      }
    ).catch(fileWriteErr => {
      throw Error(
        `Writing test service file' ${file}' failed: ${fileWriteErr}`
      );
    });
  }

  function replaceWithLocalModules2(serviceDirectory, file, data) {
    const lines = data.split('\n');
    const importLineIndex = lines.findIndex(l =>
      l.includes('@sap-cloud-sdk/core')
    );
    if (!lines[importLineIndex]) {
      return;
    }
    const commonImportLine = lines[importLineIndex].replace(
      '@sap-cloud-sdk/core',
      '../../../../../src/common'
    );
    const [preamble, contentAndPostAmble] = commonImportLine.split('{');
    const [content, postamble] = contentAndPostAmble.split('}');
    const imports = content.split(',').map(c => c.trim());
    const potentialLocalImports = [
      'Entity',
      'CreateRequestBuilder',
      'CustomField',
      'DeleteRequestBuilder',
      'FunctionImportRequestBuilder',
      'GetAllRequestBuilder',
      'GetByKeyRequestBuilder',
      'UpdateRequestBuilder',
      'ODataBatchRequestBuilder',
      'ODataBatchChangeSet',
      'transformReturnValueForUndefined',
      'transformReturnValueForEdmType',
      'transformReturnValueForEdmTypeList',
      'transformReturnValueForEntity',
      'transformReturnValueForEntityList',
      'transformReturnValueForComplexType',
      'transformReturnValueForComplexTypeList',
      'edmToTs'
    ];
    const commonImports = imports.filter(
      i => !potentialLocalImports.includes(i)
    );
    const localImports = imports.filter(i => potentialLocalImports.includes(i));
    const newCommonImportLine = commonImports.length
      ? `import {${commonImports.join(',')}} from '../../../../../src/common'`
      : '';
    const localImportLine = localImports.length
      ? `import {${localImports.join(
          ','
        )}} from '../../../../../src/${version}'`
      : '';

    lines.splice(importLineIndex, 1, newCommonImportLine, localImportLine);

    const newData = lines.join('\n');

    return writeFile(path.resolve(outputDir, serviceDirectory, file), newData, {
      encoding: 'utf8'
    }).catch(fileWriteErr => {
      throw Error(
        `Writing test service file' ${file}' failed: ${fileWriteErr}`
      );
    });
  }
}

generateTestServicesPackage(packageOutputDir);
generateTestServicesWithLocalCoreModules(coreUnitTestOutputDir, 'v2');
generateTestServicesWithLocalCoreModules(coreUnitTestOutputDir, 'v4');
