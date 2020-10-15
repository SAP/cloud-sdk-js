/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import path from 'path';
import { ODataVersion } from './packages/util/src';
import { generateTsMorph, generateTemplates } from './packages/generator/src';

const serviceSpecsDir = path.join('test-resources', 'service-specs');
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
  inputDir: path.join(serviceSpecsDir, version),
  outputDir
});

async function generateTestServicesPackage(
  version: ODataVersion,
  method: string
) {
  const t = method?.startsWith('t')
    ? await generateTemplates(getConfig(version))
    : await generateTsMorph(getConfig(version));
}

generateTestServicesPackage('v4', process.argv[2]);
