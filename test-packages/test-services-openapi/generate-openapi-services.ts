import { resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { generate, GeneratorOptions } from '@sap-cloud-sdk/openapi-generator';

const logger = createLogger('generate-openapi-services');
const generatorConfigOpenApi: Partial<GeneratorOptions> = {
  clearOutputDir: false,
  transpile: true,
  packageJson: true,
  include: '../../test-resources/{CHANGELOG.md,some-test-markdown.md}',
  readme: true,
  skipValidation: true,
  overwrite: true
};

async function generateOpenApi() {
  try {
    await generate({
      ...generatorConfigOpenApi,
      input: resolve(
        '..',
        '..',
        'test-resources',
        'openapi-service-specs',
        'specifications'
      ),
      outputDir: resolve('.'),
      transpile: true,
      optionsPerService: resolve(
        '..',
        '..',
        'test-resources',
        'openapi-service-specs',
        'config'
      )
    });
  } catch (error) {
    logger.error(`Unhandled rejection at: ${error}`);
    process.exit(1);
  }
}

generateOpenApi();
