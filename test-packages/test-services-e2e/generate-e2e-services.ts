import { resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { generate } from '@sap-cloud-sdk/generator';

const logger = createLogger('generate-e2e-services');
const generatorConfigOData = {
  overwrite: true,
  useSwagger: false,
  readme: false,
  clearOutputDir: false,
  packageJson: false,
  generateSdkMetadata: false
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
    transpile: true,
    optionsPerService: resolve(
      '..',
      '..',
      'test-resources',
      'odata-service-specs-e2e',
      'v4'
    )
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
    transpile: true,
    optionsPerService: resolve(
      '..',
      '..',
      'test-resources',
      'odata-service-specs-e2e',
      'TripPin'
    )
  });
}

generateE2E().catch(reason => {
  logger.error(`Unhandled rejection at: ${reason}`);
  process.exit(1);
});
