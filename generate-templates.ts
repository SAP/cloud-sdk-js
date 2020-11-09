/* eslint-disable no-console */
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import path from 'path';
import {
  generateTsMorph,
  generateTemplates
} from './packages/generator/src/generator-templates';

const serviceSpecsDir = path.join('test-resources', 'service-specs', 'v4');
const serviceSpecsDir2 = path.join(
  '..',
  'sdk-js',
  's4-api',
  'S4HANACloud',
  'Artifacts'
);
const outputDir = path.resolve('generated');

const config = {
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
  inputDir: serviceSpecsDir,
  outputDir
};

function getGenerationFunction(method: string) {
  return method?.startsWith('t')
    ? () => generateTemplates(config)
    : () => generateTsMorph(config);
}

const generationFunction = getGenerationFunction(process.argv[2]);
console.time('total');
generationFunction();
console.timeEnd('total');
