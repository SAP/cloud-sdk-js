import { createLogger } from '@sap-cloud-sdk/util';
import { filterCustomRequestConfig } from './http-request-config';

const logger = createLogger('http-request-config');

describe('filterCustomRequestConfig', () => {
  it('should not filter allowed custom request config', () => {
    const customRequestConfigs = { responseType: 'arraybuffer' };
    const filtered = filterCustomRequestConfig(customRequestConfigs);
    expect(filtered).toEqual(customRequestConfigs);
  });

  it('should filter disallowed custom request config with warnings', () => {
    const warnSpy = jest.spyOn(logger, 'warn');
    const customRequestConfigs = {
      responseType: 'arraybuffer',
      method: 'delete',
      url: 'www.example.com'
    };
    const filtered = filterCustomRequestConfig(customRequestConfigs);
    expect(filtered).toEqual({ responseType: 'arraybuffer' });
    expect(warnSpy).toBeCalledWith(
      'The following keys are found in the custom request config that will be removed: method, url'
    );
  });
});
