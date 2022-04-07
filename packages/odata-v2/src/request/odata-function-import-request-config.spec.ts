import { FunctionImportParameter } from '@sap-cloud-sdk/odata-common/internal';
import { defaultDeSerializers, DefaultDeSerializers } from '../de-serializers';
import { createODataUri } from '../uri-conversion';
import { ODataFunctionImportRequestConfig } from './odata-function-import-request-config';

interface TestParameterType {
  test1: string;
  test2: boolean;
  test3: number;
}

describe('ODataFunctionImportRequestConfig', () => {
  let config: ODataFunctionImportRequestConfig<
    DefaultDeSerializers,
    TestParameterType
  >;

  const parameters = {
    test1: 'test',
    test2: false,
    test3: 10
  };

  const mappedParameters = {
    test1: new FunctionImportParameter('Test1', 'Edm.String', parameters.test1),
    test2: new FunctionImportParameter(
      'Test2',
      'Edm.Boolean',
      parameters.test2
    ),
    test3: new FunctionImportParameter('Test3', 'Edm.Double', parameters.test3)
  };

  beforeEach(() => {
    config = new ODataFunctionImportRequestConfig(
      'get',
      'somePath',
      'Config',
      mappedParameters,
      createODataUri(defaultDeSerializers)
    );
  });

  it('resourcePath is the function import name', () => {
    expect(config.resourcePath()).toBe('Config');
  });

  it('has query parameters', () => {
    expect(config.queryParameters()).toEqual({
      Test1: "'test'",
      Test2: 'false',
      Test3: '10D'
    });
  });
});
