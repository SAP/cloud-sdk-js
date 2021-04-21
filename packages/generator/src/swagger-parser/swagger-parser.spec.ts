import { resolve } from 'path';
import { oDataServiceSpecs } from '../../../../test-resources/odata-service-specs';
import { readSwaggerFile } from './swagger-parser';

describe('swagger-parser', () => {
  it('parseSwaggerFromPath should parse service info', () => {
    const json = readSwaggerFile(
      resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV', 'API_TEST_SRV.json')
    );
    expect(json).toBeDefined();
    expect(json.info).toEqual({
      title: 'Test Service Title (Swagger)',
      version: '2 ',
      description: 'Test Service Description (Swagger)'
    });
  });
});
