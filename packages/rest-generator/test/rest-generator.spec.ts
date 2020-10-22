/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import * as path from 'path';
import * as fs from 'fs-extra';
import { generateRest } from '../src/generator';

describe('rest generator test', () => {
  const inputDir = path.resolve(__dirname, 'resources');
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
    expect(services).toEqual(
      expect.arrayContaining(['petstore', 'sales-orders'])
    );
    services.forEach(serviceName => {
      const serviceFiles = fs.readdirSync(path.join(outputDir, serviceName));
      expect(serviceFiles).toContain('open-api.json');
      expect(serviceFiles).toContain('api.ts');
      expect(serviceFiles).toContain('base.ts');
    });
  }, 60000);
});
