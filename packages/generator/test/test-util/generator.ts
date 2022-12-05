import { resolve } from 'path';
import { ClassDeclaration, FunctionDeclaration, SourceFile } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import { generateProject } from '../../src/generator';
import { oDataServiceSpecs } from '../../../../test-resources/odata-service-specs';
import { createOptions } from './create-generator-options';

export function checkStaticProperties(entityClass: ClassDeclaration): void {
  const properties = entityClass.getProperties();
  const staticProperties = [
    properties.find(p => p.getName() === '_entityName')!,
    properties.find(p => p.getName() === '_defaultServicePath')!
  ];

  expect(staticProperties.map(p => p.isStatic())).toEqual([true, true]);

  expect(staticProperties.map(p => p.getInitializer()!.getText())).toEqual([
    "'A_TestEntity'",
    "'/sap/opu/odata/sap/API_TEST_SRV'"
  ]);
}

export async function getGeneratedFiles(
  oDataVersion: ODataVersion,
  outputDir: string
): Promise<SourceFile[]> {
  const opt = createOptions({
    inputDir: resolve(oDataServiceSpecs, oDataVersion, 'API_TEST_SRV'),
    useSwagger: false,
    packageJson: false,
    outputDir
  });
  const project = await generateProject(opt);
  return project!.project.getSourceFiles();
}

export function getOperationFunctionDeclarations(
  files: SourceFile[],
  type: 'function' | 'action'
): FunctionDeclaration[] {
  const functionImportsFile = files.find(
    file => file.getBaseName() === `${type}-imports.ts`
  );

  return functionImportsFile?.getFunctions() || [];
}
