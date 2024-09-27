import { resolve } from 'node:path';
import { createLogger } from '@sap-cloud-sdk/util';
import { generate } from '@sap-cloud-sdk/generator';

const logger = createLogger('generate-e2e-services');
const generatorConfigOData = {
  overwrite: true,
  useSwagger: false,
  readme: false,
  clearOutputDir: false,
  packageJson: false,
  skipValidation: true,
  generateSdkMetadata: false
};

async function generateE2e() {
  await generate({
    ...generatorConfigOData,
    input: resolve(
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
    input: resolve(
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

generateE2e().catch(reason => {
  logger.error(`Unhandled rejection at: ${reason}`);
  process.exit(1);
});
