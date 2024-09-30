import { createLogger } from '@sap-cloud-sdk/util';
import { getBasePath } from './service-base-path';
import type { ServiceOptions } from '@sap-cloud-sdk/generator-common/dist/options-per-service';

describe('options-per-service', () => {
  it('gets basePath from optionsPerService over edmx self link and swagger', () => {
    const metadata = {
      edmx: {
        path: 'test/path/file.edmx',
        selfLink: '/test-service'
      } as any,
      swagger: {
        basePath: '/swagger-test-service-path'
      } as any
    };

    const optionsPerServiceIn = {
      basePath: '/options-test-service'
    } as ServiceOptions;

    expect(getBasePath(metadata, optionsPerServiceIn)).toEqual(
      '/options-test-service'
    );
  });

  it('gets basePath from swagger when it cannot be determined from options or self link', () => {
    const metadata = {
      edmx: {
        path: 'test/path/file.edmx'
      } as any,
      swagger: {
        basePath: '/swagger-test-service-path'
      } as any
    };

    expect(
      getBasePath(metadata, { basePath: undefined } as ServiceOptions)
    ).toEqual('/swagger-test-service-path');
  });

  it('should return "/" if basePath cannot be determined from options-per-service, self link and swagger', () => {
    const metadata = {
      edmx: {
        path: 'test/path/file.edmx'
      } as any,
      swagger: {} as any
    };

    const logger = createLogger({
      package: 'generator',
      messageContext: 'options-per-service'
    });
    const warnSpy = jest.spyOn(logger, 'warn');
    expect(
      getBasePath(metadata, { basePath: undefined } as ServiceOptions)
    ).toEqual('/');
    expect(warnSpy).toHaveBeenCalledWith(
      '[ file ] No base path could be determined from available metadata! Setting "basePath" to "/" as default value. Consider using the "optionsPerService" configuration to explicitly set a value.'
    );
  });
});
