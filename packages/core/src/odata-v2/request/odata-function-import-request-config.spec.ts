import { FunctionImportParameter } from '../../odata-common/request';
import { oDataUriV2 } from '../uri-conversion';
import { ODataFunctionImportRequestConfigV2 } from './odata-function-import-request-config';

interface TestParameterType {
  test1: string;
  test2: boolean;
  test3: number;
}

describe('ODataFunctionImportRequestConfig', () => {
  let config: ODataFunctionImportRequestConfigV2<TestParameterType>;

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
    config = new ODataFunctionImportRequestConfigV2(
      'get',
      'somePath',
      'Config',
      mappedParameters,
      oDataUriV2
    );
  });

  it('resourcePath is the funtion import name', () => {
    expect(config.resourcePath()).toBe('Config');
  });

  it('has query parameters', () => {
    expect(config.queryParameters()).toEqual({
      $format: 'json',
      Test1: "'test'",
      Test2: 'false',
      Test3: '10D'
    });
  });
});
