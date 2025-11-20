import { resolve, join } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { generate } from '@sap-cloud-sdk/generator';

const logger = createLogger('generate-odata-services');

const generatorConfigOData = {
  overwrite: true,
  transpile: true,
  useSwagger: false,
  readme: false,
  clearOutputDir: false,
  packageJson: false,
  skipValidation: true,
};

async function generateOdata(): Promise<void> {
  return generate({
    ...generatorConfigOData,
    input: join('..', '..', 'test-resources', 'odata-service-specs', 'v4'),
    outputDir: resolve('.'),
    optionsPerService: join(
      '..',
      '..',
      'test-resources',
      'odata-service-specs',
      'v4'
    )
  }).catch(reason => {
    console.log(reason);
    logger.error(`[v4] Unhandled rejection at: ${reason}`);
    process.exit(1);
  });
}

generateOdata();
