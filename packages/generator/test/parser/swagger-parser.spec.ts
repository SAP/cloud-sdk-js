/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { parseSwaggerFromPath } from '../../src/parser';

describe('swagger-parser', () => {
  it('parseSwaggerFromPath should parse service info', () => {
    const json = parseSwaggerFromPath(
      '../../test-resources/service-specs/API_TEST_SRV/API_TEST_SRV.json'
    );
    expect(json).toBeDefined();
    expect(json.info).toEqual({
      title: 'Test Service Title (Swagger)',
      version: '2 ',
      description: 'Test Service Description (Swagger)'
    });
  });
});
