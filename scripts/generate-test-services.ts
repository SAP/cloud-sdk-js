import { resolve, join } from 'path';
import { promises } from 'fs';
import { createLogger, unixEOL } from '@sap-cloud-sdk/util';
import { generate as generateOdata } from '../packages/generator/src';
import {
  generate as generateOpenApi,
  GeneratorOptions
} from '../packages/openapi-generator/src';
import { ODataVersion } from '../packages/util/src';

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
  if (arg === 'v2' || arg === 'odata' || arg === 'all') {
    await generateTestServicesPackage(packageOutputDir, 'v2');
    await generateCommonTestEntity();
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

function removeImports(str: string): string {
  return str.replace(/import \{.*\}.*;/g, '');
}

function adjustRequestBuilder(str: string): string {
  return str
    .replace(
      'return new CommonEntityRequestBuilder()',
      "throw new Error('not implemented')"
    )
    .replace('CommonEntityRequestBuilder', 'any');
}

function adjustCustomField(str: string): string {
  return str.replace(
    'return Entity.customFieldSelector(fieldName, CommonEntity)',
    "throw new Error('not implemented')"
  );
}

function addODataVersion(str: string): string {
  const firstProperty = "static _entityName = 'A_CommonEntity';";
  return str.replace(
    firstProperty,
    [firstProperty, 'readonly _oDataVersion: any;'].join(unixEOL)
  );
}

function removeJsDoc(str: string): string {
  return str.replace(/\/\*\*\n(?:\s+\*\s+.+\n)+\s+\*\/\n/g, '');
}

async function generateCommonTestEntity() {
  const entity = await promises.readFile(
    join(packageOutputDir, 'v2', 'common-service', 'CommonEntity.ts'),
    'utf8'
  );
  const complexType = await promises.readFile(
    join(packageOutputDir, 'v2', 'common-service', 'CommonComplexType.ts'),
    'utf8'
  );

  const adjustedEntity = [
    removeImports,
    removeJsDoc,
    adjustRequestBuilder,
    adjustCustomField,
    addODataVersion
  ].reduce((colllected, fn) => fn(colllected), entity);
  const adjustedComplex = [removeImports, removeJsDoc].reduce(
    (colllected, current) => current(colllected),
    complexType
  );
  const adjusted = [
    disableEslint,
    disclaimer,
    imports,
    adjustedComplex,
    adjustedEntity
  ].join(unixEOL);
  await promises.writeFile(
    resolve(__dirname, '../packages/odata-common/test/common-entity.ts'),
    adjusted,
    'utf8'
  );
}

const disclaimer = `/* This entity was generated from the COMMON_SRV.edmx and the generate-test-service.ts script.
The idea behind this entity is to use only odata-common imports and use it in the tests for the odata-common functionality.*/`;
const imports =
  "import { AllFields, Constructable,  EntityBuilderType, Field,  OrderableEdmTypeField,CustomField,ComplexTypeField, ConstructorOrField, EdmTypeField, FieldBuilder, FieldOptions, FieldType, PropertyMetadata, EntityBase as Entity } from '../src/internal';";
const disableEslint = '/* eslint-disable */';
