/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import * as path from 'path';
import * as fs from 'fs-extra';
import { generateProject, generateRest } from '../src/generator';

describe('rest generator test', () => {
  const inputDir = path.resolve(__dirname, 'resources', 'test-apis');
  const outputDir = path.resolve(__dirname, 'generated');

  beforeAll(() => {
    fs.removeSync(outputDir);
  });

  afterAll(() => {
    fs.removeSync(outputDir);
  });

  it('should generate the sap graph client', async () => {
    await generateRest({ inputDir, outputDir });

    const services = fs.readdirSync(outputDir);
    expect(services).toEqual(expect.arrayContaining(['petstore']));
    services.forEach(serviceName => {
      const rootFiles = fs.readdirSync(path.join(outputDir, serviceName));
      expect(rootFiles).toContain('request-builder.ts');
      expect(rootFiles).toContain('open-api.json');
      const serviceFiles = fs.readdirSync(
        path.join(outputDir, serviceName, 'open-api')
      );
      expect(serviceFiles).toContain('api.ts');
      expect(serviceFiles).toContain('base.ts');
    });
  }, 60000);

  it('should generate request builder file', async () => {
    const project = await generateProject({ inputDir, outputDir });
    const sourceFiles = project.getSourceFiles();
    expect(sourceFiles.length).toBe(1);

    const requestBuilder = sourceFiles.find(file =>
      file.getDirectoryPath().endsWith('petstore')
    );
    const classes = requestBuilder!.getClasses();
    expect(classes.length).toBe(4);

    const apiCLass = classes.find(clazz =>
      clazz.getName()?.endsWith('ApiRequestBuilder')
    );
    expect(apiCLass!.getStaticMethods().length).toBe(3);
  }, 60000);
});
