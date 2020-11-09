/* eslint-disable no-console */
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import path from 'path';
import { ODataVersion } from './packages/util/src';
import {
  generateTsMorph,
  generateTemplates
} from './packages/generator/src/generator-templates';

const serviceSpecsDir = path.join('test-resources', 'service-specs');
const serviceSpecsDir2 = path.join(
  '..',
  'sdk-js',
  's4-api',
  'S4HANACloud',
  'Artifacts'
);
const outputDir = path.resolve('generated');

const getConfig = (version: ODataVersion) => ({
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
  s4hanaCloud: false,
  inputDir: serviceSpecsDir2, // path.join(serviceSpecsDir, version),
  outputDir
});

function getGenerationFunction(version: ODataVersion, method: string) {
  return method?.startsWith('t')
    ? () => generateTemplates(getConfig(version))
    : () => generateTsMorph(getConfig(version));
}

const generationFunction = getGenerationFunction('v4', process.argv[2]);
console.time('total');
generationFunction();
console.timeEnd('total');
