import { promises } from 'fs';
import { join, resolve } from 'path';
import { unixEOL } from '@sap-cloud-sdk/util';
import { Project } from 'ts-morph';
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
  return str.replace(
    /AnyT\,\n\s*DateTimeT\,\n\s*DateTimeOffsetT\,\n\s*TimeT/gm,
    'AnyT'
  );
}

function adjustRequestBuilder(str: string): string {
  const start = findRequestBuilderStartLine(str);
  const end = findRequestBuilderEndLine(str, start);
  if (start && end) {
    const lines = str.split(unixEOL);
    for (var i = start; i <= end; i++) {
      lines[i] = '';
    }
    lines[i] = 'requestBuilder():any{throw new Error("Not implemented")}';
    return lines.join(unixEOL);
  }
  return str;
}

function findRequestBuilderEndLine(
  str,
  start: number | undefined
): number | undefined {
  if (!start) {
    return;
  }
  const lines = str.split(unixEOL);
  for (let i = start; i < lines.length; i++) {
    if (lines[i].includes('}')) {
      return i;
    }
  }
}

function findRequestBuilderStartLine(str): number | undefined {
  const lines = str.split(unixEOL);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('requestBuilder()')) {
      return i;
    }
  }
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

function readClass(project: Project, fileName: string): string {
  const sourceFiles = project.getSourceFiles();
  const names = sourceFiles.map(sf => sf.getBaseName());
  const file = sourceFiles.find(sf => sf.getBaseName() === fileName)!;
  return file.getFullText();
}

const fileList = [
  'CommonEntity.ts',
  'CommonEntityApi.ts',
  'CommonEntitySingleLink.ts',
  'CommonEntitySingleLinkApi.ts',
  'CommonComplexType.ts',
  'NestedComplexType.ts'
];

async function readClasses(): Promise<string[]> {
  return Promise.all(
    fileList.map(file => promises.readFile(join(outDir, file), 'utf8'))
  );
}

async function generateCommonTestEntity() {
  const classes = await readClasses();
  const [entity, entityApi, link, linkApi, complexType, nestedComplex] = classes
    .map(str => removeImports(str))
    .map(str => removeJsDoc(str))
    .map(str => reduceGenericArguments(str))
    .map(str => adjustRequestBuilder(str))
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
    'export const commonEntityApi = new CommonEntityApi();'
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
