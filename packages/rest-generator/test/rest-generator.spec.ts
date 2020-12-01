/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import * as path from 'path';
import { readFileSync } from 'fs';
import * as fs from 'fs-extra';
import { SyntaxKind } from 'ts-morph';
import { generateProject } from '../src/generator';
import { GenerateRestClient } from '../src/commands/generate-rest-client';

describe('rest generator', () => {
  const inputDir = path.resolve(__dirname, 'resources', 'test-apis');
  const outputDir = path.resolve(__dirname, 'generated');

  beforeAll(() => {
    fs.removeSync(outputDir);
  });

  afterAll(() => {
    fs.removeSync(outputDir);
  });

  it('should generate the sap graph client', async () => {
    await GenerateRestClient.run(['-i', inputDir, '-o', outputDir]);

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
    expect(sourceFiles.length).toBe(2);

    const requestBuilder = sourceFiles.find(file =>
      file.getFilePath().endsWith('petstore/request-builder.ts')
    );
    const declarations = requestBuilder!.getVariableStatements();
    expect(declarations.length).toBe(1);

    const functions = declarations[0]
      .getDeclarations()[0]
      .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)
      .getProperties();

    expect(functions.length).toBe(3);
  }, 60000);

  it('should read the version from the package.json', async () => {
    const sdkVersion = JSON.parse(
      readFileSync(path.resolve(__dirname, '../package.json'), {
        encoding: 'utf8'
      })
    ).version;
    expect(typeof GenerateRestClient.version).toBe('string');
    expect(GenerateRestClient.version).toBe(sdkVersion);
  });
});
