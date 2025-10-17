import { resolve, join } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { generate, GeneratorOptions } from '@sap-cloud-sdk/generator';

const logger = createLogger('generate-odata-services');

const generatorConfigOData : Partial<GeneratorOptions> = {
  overwrite: true,
  transpile: true,
  useSwagger: false,
  readme: false,
  clearOutputDir: false,
  packageJson: false,
  skipValidation: true,
  verbose: false,
  generateESM: true
};

async function generateOdata(): Promise<void> {
  return generate({
    ...generatorConfigOData,
    input: join('..', '..', 'test-resources', 'odata-service-specs', 'v2'),
    outputDir: resolve('.'),
    optionsPerService: join(
      '..',
      '..',
      'test-resources',
      'odata-service-specs',
      'v2'
    )
  }).catch(reason => {
    logger.error(`[v2] Unhandled rejection at: ${reason}`);
    process.exit(1);
  });
}

generateOdata();
