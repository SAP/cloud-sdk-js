import { createLogger } from '@sap-cloud-sdk/util';
import { filterCustomRequestConfigs } from './http-request-config';

const logger = createLogger('http-request-config');

describe('filterCustomRequestConfigs', () => {
  it('should not filter allowed custom request configs', () => {
    const customRequestConfigs = { responseType: 'arraybuffer' };
    const filtered = filterCustomRequestConfigs(customRequestConfigs);
    expect(filtered).toEqual(customRequestConfigs);
  });

  it('should filter disallowed custom request configs with warnings', () => {
    const warnSpy = jest.spyOn(logger, 'warn');
    const customRequestConfigs = {
      responseType: 'arraybuffer',
      method: 'delete',
      url: 'www.example.com'
    };
    const filtered = filterCustomRequestConfigs(customRequestConfigs);
    expect(filtered).toEqual({ responseType: 'arraybuffer' });
    expect(warnSpy).toBeCalledWith(
      'The following keys are found in the custom request config that will be removed: method, url'
    );
  });
});
