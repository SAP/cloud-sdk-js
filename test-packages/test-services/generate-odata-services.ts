import { resolve, join } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { generate } from '@sap-cloud-sdk/generator';

const logger = createLogger('generate-odata-services');

const generatorConfigOData = {
  forceOverwrite: true,
  generateJs: false,
  useSwagger: false,
  writeReadme: false,
  clearOutputDir: true,
  generateNpmrc: false,
  generatePackageJson: false,
  generateCSN: false,
  generateSdkMetadata: false,
  // Unnecessary options
  sdkAfterVersionScript: false,
  s4hanaCloud: false
};

async function generateOdata(): Promise<void> {
  const arg = process.argv[1];

  if (arg === 'v2' || arg === 'v4') {
    return await generate({
      ...generatorConfigOData,
      inputDir: join('..', '..', 'test-resources', 'odata-service-specs', arg),
      outputDir: resolve(arg),
      generateJs: true
    }).catch(reason => {
      logger.error(`[${arg}] Unhandled rejection at: ${reason}`);
      process.exit(1);
    });
  }

  logger.warn(`No test service generated!`);
}

generateOdata();
