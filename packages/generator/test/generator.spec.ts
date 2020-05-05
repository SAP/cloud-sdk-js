/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { generateProject } from '../src';
import { createOptions } from './test-util/create-generator-options';

describe('generator', () => {
  it('generates expected files', async () => {
    const project = await generateProject(
      createOptions({
        inputDir: '../../test-resources/service-specs/API_TEST_SRV',
        useSwagger: false
      })
    );
    const files = project!.getSourceFiles();

    expect(files.length).toBe(27);

    const testEntityFile = files.find(
      file => file.getBaseName() === 'TestEntity.ts'
    );

    expect(testEntityFile).toBeDefined();
    expect(testEntityFile!.getClasses().length).toBe(1);
    expect(testEntityFile!.getInterfaces().length).toBe(2);
    expect(testEntityFile!.getNamespaces().length).toBe(1);

    const entityClass = testEntityFile!.getClass('TestEntity');
    expect(entityClass!.getProperties().length).toBe(25);

    const properties = entityClass!.getProperties();
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

    const entityNamespace = testEntityFile!.getNamespace('TestEntity');
    expect(entityNamespace!.getVariableDeclarations().length).toBe(25);
  });
});
