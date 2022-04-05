import { createLogger, VALUE_IS_UNDEFINED } from '@sap-cloud-sdk/util';
import { getServicePath, serviceMapping, VdmMapping } from './service-mapping';
import { VdmServiceMetadata } from './vdm-types';

describe('service-mapping', () => {
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

    expect(serviceMapping(serviceMetadata)).toEqual(expectedVdmMapping);
  });

  it('should log an error if no service path can be determined', () => {
    const metadata = {
      edmx: {
        path: 'test/path/file.edmx'
      } as any
    };

    const logger = createLogger({
      package: 'generator',
      messageContext: 'service-mapping'
    });

    const errorSpy = jest.spyOn(logger, 'error');
    getServicePath(metadata);
    expect(errorSpy).toHaveBeenCalledWith(
      '[ file ] No service path could be determined from available metadata! Replace VALUE_IS_UNDEFINED in the "service-mapping.json".'
    );
  });

  it('should log an error if servicePath in service mapping has VALUE_IS_UNDEFINED', () => {
    const metadata = {
      edmx: {
        path: 'test/path/file.edmx',
        selfLink: '/test-service'
      } as any
    };

    const serviceMappingIn = {
      servicePath: VALUE_IS_UNDEFINED
    } as any;

    const logger = createLogger({
      package: 'generator',
      messageContext: 'service-mapping'
    });

    const errorSpy = jest.spyOn(logger, 'error');
    getServicePath(metadata, serviceMappingIn);
    expect(errorSpy).toHaveBeenCalledWith(
      '[ file ] No service path could be determined from available metadata! Replace VALUE_IS_UNDEFINED in the "service-mapping.json".'
    );
  });

  it('should log an error if no service path can be determined and swagger has no service path', () => {
    const metadata = {
      edmx: {
        path: 'test/path/file.edmx'
      } as any,
      swagger: {} as any
    };

    const logger = createLogger({
      package: 'generator',
      messageContext: 'service-mapping'
    });

    const errorSpy = jest.spyOn(logger, 'error');
    getServicePath(metadata);
    expect(errorSpy).toHaveBeenCalledWith(
      '[ file ] No service path could be determined from available metadata! Replace VALUE_IS_UNDEFINED in the "service-mapping.json".'
    );
  });
});
