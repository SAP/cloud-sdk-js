/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ClassDeclaration, FunctionDeclaration, SourceFile } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import { generateProject, GeneratorOptions } from '../../src';
import { createOptions } from './create-generator-options';

export function checkStaticProperties(entityClass: ClassDeclaration): void {
  const properties = entityClass.getProperties();
  const staticProperties = [
    properties.find(p => p.getName() === '_entityName')!,
    properties.find(p => p.getName() === '_serviceName')!,
    properties.find(p => p.getName() === '_defaultServicePath')!
  ];

  expect(staticProperties.map(p => p.isStatic())).toEqual([true, true, true]);

  expect(staticProperties.map(p => p.getInitializer()!.getText())).toEqual([
    "'A_TestEntity'",
    "'API_TEST_SRV'",
    "'/sap/opu/odata/sap/API_TEST_SRV'"
  ]);
}

export async function getGeneratedFiles(
  oDataVersion: ODataVersion,
  generatorOptionsX?: GeneratorOptions
): Promise<SourceFile[]> {
  const project = await generateProject(
    createOptions({
      inputDir: `../../test-resources/service-specs/${oDataVersion}/API_TEST_SRV`,
      useSwagger: false
    })
  );
  return project!.getSourceFiles();
}

export function getFunctionImportDeclarations(
  files: SourceFile[]
): FunctionDeclaration[] {
  const functionImportsFile = files.find(
    file => file.getBaseName() === 'function-imports.ts'
  );

  return functionImportsFile!.getFunctions();
}
