/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { readSwaggerFile } from '../../src/edmx-parser/swagger/swagger-parser';

describe('swagger-edmx-parser', () => {
  it('parseSwaggerFromPath should parse service info', () => {
    const json = readSwaggerFile(
      '../../test-resources/service-specs/v2/API_TEST_SRV/API_TEST_SRV.json'
    );
    expect(json).toBeDefined();
    expect(json.info).toEqual({
      title: 'Test Service Title (Swagger)',
      version: '2 ',
      description: 'Test Service Description (Swagger)'
    });
  });
});
