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
  generateSdkMetadata: false,
  verbose: false
};

async function generateOdata(): Promise<void> {
  return generate({
    ...generatorConfigOData,
    inputDir: join('..', '..', 'test-resources', 'odata-service-specs', 'v2'),
    outputDir: resolve('.')
  }).catch(reason => {
    logger.error(`[v2] Unhandled rejection at: ${reason}`);
    process.exit(1);
  });
}

generateOdata();
