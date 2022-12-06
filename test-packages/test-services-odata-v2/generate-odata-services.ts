import { resolve, join } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { generate } from '@sap-cloud-sdk/generator';

const logger = createLogger('generate-odata-services');

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

async function generateOdata(): Promise<void> {
  return generate({
    ...generatorConfigOData,
    inputDir: join('..', '..', 'test-resources', 'odata-service-specs', 'v2'),
    outputDir: resolve('.'),
    generateJs: true
  }).catch(reason => {
    logger.error(`[v2] Unhandled rejection at: ${reason}`);
    process.exit(1);
  });
}

generateOdata();
