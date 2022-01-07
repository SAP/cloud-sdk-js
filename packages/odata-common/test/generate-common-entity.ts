import { promises } from 'fs';
import { join, resolve } from 'path';
import { unixEOL } from '@sap-cloud-sdk/util';
import { createOptions } from '../../generator/test/test-util/create-generator-options';
import { generate } from '../../generator/src/internal';

const outDir = resolve(__dirname, 'common-service');

export async function generateCommonEntity() {
  await promises.rm(outDir, { recursive: true, force: true });

  await generate(
    createOptions({
      inputDir: resolve(__dirname, 'COMMON_SRV.edmx'),
      outputDir: resolve(__dirname),
      serviceMapping: resolve(__dirname, 'service-mapping.json'),
      forceOverwrite: true
    })
  );

  await generateCommonTestEntity();
  await promises.rm(outDir, { recursive: true, force: true });
}

function removeImports(str: string): string {
  const removed = str.replace(/import \{.*\}.*;/g, '');
  return removed;
}

function reduceGenericArguments(str: string): string {
  return str.replace(/(AnyT = any|AnyT),[,=\n\s\w]*(>)/gm, '$1$2');
}

function replaceRequestBuilder(str: string): string {
  const lines = str.split('\n');
  const start = findRequestBuilderStartIndex(lines);
  const count = findRequestBuilderLineCount(lines, start);
  if (start && count) {
    lines.splice(
      start,
      count,
      'requestBuilder(): any { throw new Error("Not implemented"); }'
    );
  }

  return lines.join('\n');
}

function findRequestBuilderLineCount(
  lines: string[],
  start: number | undefined
): number | undefined {
  if (start) {
    const index = lines.slice(start).findIndex(line => line.includes('}'));
    return index >= 0 ? index + 1 : undefined;
  }
}

function findRequestBuilderStartIndex(lines: string[]): number | undefined {
  const start = lines.findIndex(line => line.includes('requestBuilder()'));
  return start >= 0 ? start : undefined;
}

function adjustCustomField(str: string): string {
  return str.replace(
    'return Entity.customFieldSelector',
    'return new CustomField'
  );
}

function addODataVersion(str: string): string {
  if (str.match(/static _entityName =.*/)) {
    const nameString = str.match(/static _entityName =.*/)![0];
    return str.replace(
      nameString,
      [nameString, 'readonly _oDataVersion: any;'].join(unixEOL)
    );
  }
  return str;
}

function removeJsDoc(str: string): string {
  return str.replace(/\/\*\*\n(?:\s+\*\s+.+\n)+\s+\*\/\n/g, '');
}

const fileList = [
  'CommonEntity.ts',
  'CommonEntityApi.ts',
  'CommonEntitySingleLink.ts',
  'CommonEntitySingleLinkApi.ts',
  'CommonComplexType.ts',
  'NestedComplexType.ts',
  'service.ts'
];

async function readClasses(): Promise<string[]> {
  return Promise.all(
    fileList.map(file => promises.readFile(join(outDir, file), 'utf8'))
  );
}

function removeBatch(service: string): string{
  return service.replace(/get batch\(\)\: typeof batch \{\n\s+return batch;\n\s+}/g,'');
}

async function generateCommonTestEntity() {
  const classes = await readClasses();
  const [
    entity,
    entityApi,
    link,
    linkApi,
    complexType,
    nestedComplex,
    service
  ] = classes
    .map(str => removeImports(str))
    .map(str => removeJsDoc(str))
    .map(str => reduceGenericArguments(str))
    .map(str => replaceRequestBuilder(str))
    .map(str => adjustCustomField(str))
    .map(str => addODataVersion(str));

  const allParts = [
    disableEslint,
    disclaimer,
    imports,
    complexType,
    nestedComplex,
    link,
    linkApi,
    entity,
    entityApi,
    removeBatch(service),
    'export const { commonEntityApi } = commonService();'
  ].join(unixEOL);
  await promises.writeFile(
    resolve(__dirname, 'common-entity.ts'),
    allParts,
    'utf8'
  );
}

const disclaimer = `/* This entity was generated from the COMMON_SRV.edmx and the generate-test-service.ts script.
The idea behind this entity is to use only odata-common imports and use it in the tests for the odata-common functionality.*/`;
const imports = `
  import {Moment} from "moment";
  import {BigNumber} from "bignumber.js";
  import { AllFields, Constructable, EntityBuilderType,entityBuilder, OneToOneLink,defaultDeSerializers, mergeDefaultDeSerializersWith, Time, EntityApi, Field, DeSerializers,DefaultDeSerializers,DeserializedType, CollectionField, OrderableEdmTypeField, CustomField, ComplexTypeField, ConstructorOrField, EdmTypeField, FieldBuilder, FieldOptions, PropertyMetadata, EntityBase as Entity } from '../src/internal';    
  `;
const disableEslint = '/* eslint-disable */';
