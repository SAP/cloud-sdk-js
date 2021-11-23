import { createLogger } from '@sap-cloud-sdk/util';
import {
  buildHttpRequestConfig,
  filterCustomRequestConfig,
  getValueWithPriority,
  mergeOptionsWithOrigin
} from './http-request-config';
import { HttpRequestConfigWithOrigin, OptionWithOrigin, ValueWithOrigin } from './http-client-types';
import { HttpRequestConfig } from '../dist';

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
      headers: {'Authorization': {'DestinationProperty': 'destProp', 'RequestConfig': 'reqConfig'} },
      params: {'param': {'Custom': 'custom', 'RequestConfig': 'reqConfig'}}
    };

    const expected: HttpRequestConfig = {
      method: 'get',
      headers: {'Authorization': 'destProp' },
      params: {'param': 'custom'}
    };
    expect(buildHttpRequestConfig(withOrigin)).toStrictEqual(expected);
  });
});

describe('getValueWithPriority', () => {
  it('should pick values from destination', () => {
    const valueWithOrigin: ValueWithOrigin = {'Destination': 'dest', 'RequestConfig': 'reqConfig'};
    expect(getValueWithPriority(valueWithOrigin)).toBe('dest');
  });

  it('should pick values from destination property', () => {
    const valueWithOrigin: ValueWithOrigin = {'DestinationProperty': 'destProp', 'Destination': 'dest'};
    expect(getValueWithPriority(valueWithOrigin)).toBe('destProp');
  });

  it('should pick values from destination property', () => {
    const valueWithOrigin: ValueWithOrigin = {'Custom': 'custom', 'DestinationProperty': 'destProp'};
    expect(getValueWithPriority(valueWithOrigin)).toBe('custom');
  });
});

describe('mergeOptionsWithOrigin', () => {
  it('should merge options', () => {
    const customOption: OptionWithOrigin = {origin: 'Custom', option: {'Authorization': 'customAuth'}};
    const destOption: OptionWithOrigin = {origin: 'Destination', option: {'sap-client': '001'}};
    const reqConfigOption: OptionWithOrigin = {origin: 'RequestConfig', option: {'Authorization': 'reqAuth', 'content-type': 'application/json'}};

    const expected: Record<string, ValueWithOrigin> = {
      'Authorization': {'Custom': 'customAuth', 'RequestConfig': 'reqAuth'},
      'sap-client': {'Destination': '001'},
      'content-type': {'RequestConfig': 'application/json'}
    }

    expect(mergeOptionsWithOrigin(customOption, destOption, reqConfigOption)).toStrictEqual(expected);
  });
});
