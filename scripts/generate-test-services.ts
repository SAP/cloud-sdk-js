import { resolve, join } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { generate as generateOdata } from '../packages/generator/src';
import {
  generate as generateOpenApi,
  GeneratorOptions
} from '../packages/openapi-generator/src';
import { ODataVersion } from '../packages/util/src';
import { generateCommonEntity } from '../packages/odata-common/test/generate-common-entity';

const odataServiceSpecsDir = join('test-resources', 'odata-service-specs');
const packageOutputDir = resolve('test-packages', 'test-services');

const generatorConfigOData = {
  forceOverwrite: true,
  generateJs: false,
  useSwagger: false,
  writeReadme: false,
  clearOutputDir: true,
  generateNpmrc: false,
  generateTypedocJson: false,
  generatePackageJson: false,
  generateCSN: false,
  generateSdkMetadata: false,
  // Unnecessary options
  sdkAfterVersionScript: false,
  s4hanaCloud: false
};

const generatorConfigOpenApi: GeneratorOptions = {
  input: resolve('test-resources', 'openapi-service-specs'),
  outputDir: resolve('test-packages', 'test-services', 'openapi'),
  clearOutputDir: true,
  transpile: true,
  packageJson: true,
  packageVersion: '1.2.3',
  include: 'test-resources/{CHANGELOG.md,some-test-markdown.md}',
  readme: true,
  skipValidation: true
};

const logger = createLogger('generate-test-service');

function generateTestServicesPackage(
  outputDir: string,
  version: ODataVersion
): Promise<void> {
  return generateOdata({
    ...generatorConfigOData,
    inputDir: join(odataServiceSpecsDir, version),
    outputDir: `${outputDir}/${version}`,
    generateJs: true
  });
}

async function generateAll(): Promise<void> {
  // Promise.catch() won't work when error happens in the nested forEach loop. When updating to node 15, we can remove it.
  process.on('unhandledRejection', reason => {
    logger.error(`Unhandled rejection at: ${reason}`);
    process.exit(1);
  });

  const arg = process.argv[2];

  if (arg === 'common' || arg === 'all') {
    await generateCommonEntity();
  }

  if (arg === 'v2' || arg === 'odata' || arg === 'all') {
    await generateTestServicesPackage(packageOutputDir, 'v2');
  }

  if (arg === 'v4' || arg === 'odata' || arg === 'all') {
    await generateTestServicesPackage(packageOutputDir, 'v4');
  }

  if (arg === 'e2e' || arg === 'all') {
    await generateOdata({
      ...generatorConfigOData,
      inputDir: resolve('test-resources', 'odata-service-specs-e2e', 'v4'),
      outputDir: resolve('test-packages', 'test-services-e2e', 'v4'),
      generateJs: true
    });

    await generateOdata({
      ...generatorConfigOData,
      inputDir: resolve('test-resources', 'odata-service-specs-e2e', 'TripPin'),
      outputDir: resolve('test-packages', 'test-services-e2e', 'TripPin'),
      generateJs: true
    });
  }

  if (arg === 'openapi' || arg === 'rest' || arg === 'all') {
    await generateOpenApi({
      ...generatorConfigOpenApi,
      transpile: true
    });
  }
}

generateAll();
