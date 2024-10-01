import { resolve } from 'path';
import { parseOptions } from '@sap-cloud-sdk/generator-common/internal';
import { generateProject } from '../../src/generator';
import { oDataServiceSpecs } from '../../../../test-resources/odata-service-specs';
import { cliOptions } from '../../src/options';
import { createOptions } from './create-generator-options';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type {
  ClassDeclaration,
  FunctionDeclaration,
  SourceFile
} from 'ts-morph';

export function checkStaticProperties(entityClass: ClassDeclaration): void {
  const properties = entityClass.getProperties();
  const staticProperties = [
    properties.find(p => p.getName() === '_entityName')!,
    properties.find(p => p.getName() === '_defaultBasePath')!
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
    input: resolve(oDataServiceSpecs, oDataVersion, 'API_TEST_SRV'),
    useSwagger: false,
    packageJson: false,
    skipValidation: true,
    outputDir
  });
  const project = await generateProject(parseOptions(cliOptions, opt));
  return project!.project.getSourceFiles();
}

export function getOperationFunctionDeclarations(
  files: SourceFile[]
): FunctionDeclaration[] {
  const functionImportsFile = files.find(
    file => file.getBaseName() === 'operations.ts'
  );

  return functionImportsFile?.getFunctions() || [];
}
