import { createLogger } from '@sap-cloud-sdk/util';
import {
  filterCustomRequestConfig,
  mergeOptionsWithPriority
} from './http-request-config';
import { OriginOptionsInternal } from './http-client-types';

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

describe('getOptionWithPriority', () => {
  it('should merge options', () => {
    const originOptions: OriginOptionsInternal = {
      custom: { Authorization: 'customAuth' },
      requestConfig: { 'if-match': 'etag' }
    };
    const expected = {
      Authorization: 'customAuth',
      'if-match': 'etag'
    };
    expect(mergeOptionsWithPriority(originOptions)).toStrictEqual(expected);
  });

  it('should use options with higher priority', () => {
    const originOptions: OriginOptionsInternal = {
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
    const originOptions: OriginOptionsInternal = {
      custom: { Authorization: 'customAuth' },
      requestConfig: { AuTHORizaTION: 'requestConfigAuth', 'sap-client': '001' }
    };
    const expected = {
      Authorization: 'customAuth',
      'sap-client': '001'
    };
    expect(mergeOptionsWithPriority(originOptions)).toStrictEqual(expected);
  });
});
