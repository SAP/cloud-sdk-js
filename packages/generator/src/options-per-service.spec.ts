import { createLogger } from '@sap-cloud-sdk/util';
import {
  getServicePath,
  OptionsPerService,
  optionsPerService,
  VdmMapping
} from './options-per-service';
import { VdmServiceMetadata } from './vdm-types';

describe('options-per-service', () => {
  it('generates a valid VdmMapping from service metadata', () => {
    const serviceMetadata: VdmServiceMetadata[] = [
      {
        oDataVersion: 'v2',
        originalFileName: 'API_A_SERV',
        directoryName: 'a-serv',
        npmPackageName: '@sap/a-serv',
        servicePath: '/path/to/serv',
        complexTypes: [],
        enumTypes: [],
        entities: [],
        functionImports: [],
        namespaces: ['namespace'],
        speakingModuleName: 'moduleName',
        className: 'AService',
        edmxPath: 'edmxPath'
      },
      {
        oDataVersion: 'v2',
        originalFileName: 'API_B_SERV',
        directoryName: 'b-serv',
        npmPackageName: '@sap/b-serv',
        servicePath: '/path/to/serv',
        complexTypes: [],
        enumTypes: [],
        entities: [],
        functionImports: [],
        namespaces: ['namespace'],
        speakingModuleName: 'moduleName',
        className: 'BService',
        edmxPath: 'edmxPath'
      }
    ];

    const expectedVdmMapping: VdmMapping = {
      API_A_SERV: {
        directoryName: 'a-serv',
        servicePath: '/path/to/serv',
        npmPackageName: '@sap/a-serv'
      },
      API_B_SERV: {
        directoryName: 'b-serv',
        servicePath: '/path/to/serv',
        npmPackageName: '@sap/b-serv'
      }
    };

    expect(optionsPerService(serviceMetadata)).toEqual(expectedVdmMapping);
  });

  it('gets servicePath from optionsPerService over edmx self link and swagger', () => {
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
      servicePath: '/options-test-service'
    } as OptionsPerService;

    expect(getServicePath(metadata, false, optionsPerServiceIn)).toEqual(
      '/options-test-service'
    );
  });

  it('gets servicePath from swagger when it cannot be determined from options or self link', () => {
    const metadata = {
      edmx: {
        path: 'test/path/file.edmx'
      } as any,
      swagger: {
        basePath: '/swagger-test-service-path'
      } as any
    };

    expect(getServicePath(metadata, false)).toEqual(
      '/swagger-test-service-path'
    );
  });

  it('should return "/" if skipValidation is true and servicePath cannot be determined from options-per-service, self link and swagger', () => {
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
    expect(getServicePath(metadata, true)).toEqual('/');
    expect(warnSpy).toHaveBeenCalledWith(
      '[ file ] No service path could be determined from available metadata! Setting "servicePath" to "/" in the "options-per-service.json".'
    );
  });

  it('should throw if skipValidation is false and servicePath cannot be determined from options-per-service, self link and swagger', () => {
    const metadata = {
      edmx: {
        path: 'test/path/file.edmx'
      } as any,
      swagger: {} as any
    };
    expect(() => getServicePath(metadata, false)).toThrowError(
      /No service path could be determined from available metadata!/
    );
  });
});
