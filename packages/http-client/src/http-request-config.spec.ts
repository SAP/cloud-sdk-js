import { createLogger } from '@sap-cloud-sdk/util';
import {
  buildHttpRequestConfig,
  filterCustomRequestConfig,
  mergeOptionsWithPriority
} from './http-request-config';
import {
  HttpRequestConfig,
  HttpRequestConfigWithOrigin,
  OriginOptions
} from './http-client-types';

const logger = createLogger('http-request-config');

describe('filterCustomRequestConfig', () => {
  it('should not filter allowed custom request config', () => {
    const customRequestConfig = { responseType: 'arraybuffer' };
    const filtered = filterCustomRequestConfig(customRequestConfig);
    expect(filtered).toEqual(customRequestConfig);
  });

  it('should filter disallowed custom request config with warnings', () => {
    const warnSpy = jest.spyOn(logger, 'warn');
    const customRequestConfig = {
      responseType: 'arraybuffer',
      method: 'delete',
      url: 'www.example.com'
    };
    const filtered = filterCustomRequestConfig(customRequestConfig);
    expect(filtered).toEqual({ responseType: 'arraybuffer' });
    expect(warnSpy).toBeCalledWith(
      'The following keys are found in the custom request config that will be removed: method, url'
    );
  });
});

describe('buildHttpRequestConfig', () => {
  it('should pick headers and params with higher priorities', () => {
    const withOrigin: HttpRequestConfigWithOrigin = {
      method: 'get',
      headers: {
        destinationProperty: { Authorization: 'destProp' },
        requestConfig: { Authorization: 'reqConfig' }
      },
      params: {
        custom: { param: 'custom' },
        requestConfig: { param: 'reqConfig' }
      }
    };

    const expected: HttpRequestConfig = {
      method: 'get',
      headers: { Authorization: 'destProp' },
      params: { param: 'custom' }
    };
    expect(buildHttpRequestConfig(withOrigin)).toStrictEqual(expected);
  });
});

describe('getOptionWithPriority', () => {
  it('should merge options', () => {
    const originOptions: OriginOptions = {
      custom: { Authorization: 'customAuth' },
      destination: { 'sap-client': '001' },
      requestConfig: { 'if-match': 'etag' }
    };
    const expected = {
      Authorization: 'customAuth',
      'sap-client': '001',
      'if-match': 'etag'
    };
    expect(mergeOptionsWithPriority(originOptions)).toStrictEqual(expected);
  });

  it('should use options with higher priority', () => {
    const originOptions: OriginOptions = {
      custom: { param1: 'customParam1' },
      destinationProperty: {
        param1: 'destPropParam1',
        param2: 'destPropParam2'
      },
      destination: { param2: 'destParam2', param3: 'destParam3' },
      requestConfig: { param3: 'reqParam3', param4: 'reqParam4' }
    };
    const expected = {
      param1: 'customParam1',
      param2: 'destPropParam2',
      param3: 'destParam3',
      param4: 'reqParam4'
    };
    expect(mergeOptionsWithPriority(originOptions)).toStrictEqual(expected);
  });

  it('should use options with higher priority and ignore case', () => {
    const originOptions: OriginOptions = {
      custom: { Authorization: 'customAuth' },
      destination: { AuTHORizaTION: 'destAuth', 'sap-client': '001' }
    };
    const expected = {
      Authorization: 'customAuth',
      'sap-client': '001'
    };
    expect(mergeOptionsWithPriority(originOptions)).toStrictEqual(expected);
  });
});
