import { resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { generate } from '@sap-cloud-sdk/openapi-generator';
import { CommonGeneratorOptions } from '@sap-cloud-sdk/generator-common';

const logger = createLogger('generate-openapi-services');
const generatorConfigOpenApi: Partial<CommonGeneratorOptions> = {
  clearOutputDir: false,
  transpile: true,
  packageJson: true,
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
