import { promises } from 'fs';
import { resolve } from 'path';
import { unixEOL } from '@sap-cloud-sdk/util';
import { Project } from 'ts-morph';
import { createOptions } from '../../generator/test/test-util/create-generator-options';
import { generateProject } from '../../generator/src/internal';

export async function generateCommonEntity() {
  const project = await generateProject(
    createOptions({
      inputDir: resolve(__dirname, 'COMMON_SRV.edmx'),
      forceOverwrite: true
    })
  );
  await generateCommonTestEntity(project!);
}

function removeImports(str: string): string {
  return str.replace(/import \{.*\}.*;/g, '');
}

function adjustRequestBuilder(str: string): string {
  return str
    .replace(
      /return new .*RequestBuilder\(\)/,
      "throw new Error('not implemented')"
    )
    .replace(
      /static requestBuilder\(\):.*RequestBuilder/,
      'static requestBuilder(): any'
    );
}

function adjustCustomField(str: string): string {
  return str.replace(
    'return Entity.customFieldSelector',
    'return new CustomField'
  );
}

function addODataVersion(str: string): string {
  const nameString = str.match(/static _entityName =.*/)![0];
  return str.replace(
    nameString,
    [nameString, 'readonly _oDataVersion: any;'].join(unixEOL)
  );
}

function removeJsDoc(str: string): string {
  return str.replace(/\/\*\*\n(?:\s+\*\s+.+\n)+\s+\*\/\n/g, '');
}

function readClass(project: Project, fileName: string): string {
  const sourceFiles = project.getSourceFiles();
  const file = sourceFiles.find(sf => sf.getBaseName() === fileName)!;
  return file.getFullText();
}

function readClasses(project): string[] {
  return [
    'CommonEntity.ts',
    'CommonEntitySingleLink.ts',
    'CommonComplexType.ts',
    'NestedComplexType.ts'
  ].map(file => readClass(project, file));
}

async function generateCommonTestEntity(project: Project) {
  const [entity, entityLink, complexType, nestedComplex] = readClasses(project)
    .map(str => removeImports(str))
    .map(str => removeJsDoc(str));

  const [adjustedEntity, adjustedEntityLink] = [entity, entityLink]
    .map(str => adjustRequestBuilder(str))
    .map(str => adjustCustomField(str))
    .map(str => addODataVersion(str));

  const allParts = [
    disableEslint,
    disclaimer,
    imports,
    complexType,
    nestedComplex,
    adjustedEntityLink,
    adjustedEntity
  ].join(unixEOL);
  await promises.writeFile(
    resolve(__dirname, 'common-entity.ts'),
    allParts,
    'utf8'
  );
}

const disclaimer = `/* This entity was generated from the COMMON_SRV.edmx and the generate-test-service.ts script.
The idea behind this entity is to use only odata-common imports and use it in the tests for the odata-common functionality.*/`;
const imports =
  "import { AllFields, Constructable, EntityBuilderType,OneToOneLink, Field,CollectionField, OrderableEdmTypeField, CustomField, ComplexTypeField, ConstructorOrField, EdmTypeField, FieldBuilder, FieldOptions, PropertyMetadata, EntityBase as Entity } from '../src/internal';";
const disableEslint = '/* eslint-disable */';
