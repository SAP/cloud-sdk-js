import { OperationParameter } from '@sap-cloud-sdk/odata-common';
import { defaultDeSerializers } from '../de-serializers';
import { createODataUri } from '../uri-conversion';
import { ODataFunctionRequestConfig } from './odata-function-request-config';
import type { DefaultDeSerializers } from '../de-serializers';

interface TestParameterType {
  test1: string;
  test2: boolean;
  test3: number;
}

describe('ODataFunctionRequestConfig', () => {
  let config: ODataFunctionRequestConfig<
    DefaultDeSerializers,
    TestParameterType
  >;

  const parameters = {
    test1: 'test',
    test2: false,
    test3: 10
  };

  const mappedParameters = {
    test1: new OperationParameter('Test1', 'Edm.String', parameters.test1),
    test2: new OperationParameter('Test2', 'Edm.Boolean', parameters.test2),
    test3: new OperationParameter('Test3', 'Edm.Double', parameters.test3)
  };

  beforeEach(() => {
    config = new ODataFunctionRequestConfig(
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
