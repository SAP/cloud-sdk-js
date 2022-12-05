import { resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { generate } from '@sap-cloud-sdk/generator';

const logger = createLogger('generate-e2e-services');
const generatorConfigOData = {
  forceOverwrite: true,
  overwrite: true,
  generateJs: false,
  useSwagger: false,
  writeReadme: false,
  readme: false,
  clearOutputDir: false,
  generateNpmrc: false,
  generatePackageJson: false,
  packageJson: false,
  generateCSN: false,
  generateSdkMetadata: false,
  // Unnecessary options
  sdkAfterVersionScript: false,
  s4hanaCloud: false
};

async function generateE2E() {
  await generate({
    ...generatorConfigOData,
    inputDir: resolve(
      '..',
      '..',
      'test-resources',
      'odata-service-specs-e2e',
      'v4'
    ),
    outputDir: resolve('v4'),
    generateJs: true
  });

  await generate({
    ...generatorConfigOData,
    inputDir: resolve(
      '..',
      '..',
      'test-resources',
      'odata-service-specs-e2e',
      'TripPin'
    ),
    outputDir: resolve('TripPin'),
    generateJs: true
  });
}

generateE2E().catch(reason => {
  logger.error(`Unhandled rejection at: ${reason}`);
  process.exit(1);
});
