import { resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { generate, GeneratorOptions } from '@sap-cloud-sdk/openapi-generator';

const logger = createLogger('generate-openapi-services');
const generatorConfigOpenApi: Partial<GeneratorOptions> = {
  clearOutputDir: false,
  transpile: true,
  packageJson: true,
  packageVersion: '1.2.3',
  include: '../../test-resources/{CHANGELOG.md,some-test-markdown.md}',
  readme: true,
  skipValidation: true,
  overwrite: true
};

async function generateOpenApi() {
  await generate({
    ...generatorConfigOpenApi,
    input: resolve('..', '..', 'test-resources', 'openapi-service-specs'),
    outputDir: resolve('.'),
    transpile: true
  }).catch(reason => {
    logger.error(`Unhandled rejection at: ${reason}`);
    process.exit(1);
  });
}

generateOpenApi();
