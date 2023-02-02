import { createLogger, VALUE_IS_UNDEFINED } from '@sap-cloud-sdk/util';
import {
  getBasePath,
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
        basePath: '/path/to/serv',
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
        basePath: '/path/to/serv',
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
        basePath: '/path/to/serv',
        npmPackageName: '@sap/a-serv'
      },
      API_B_SERV: {
        directoryName: 'b-serv',
        basePath: '/path/to/serv',
        npmPackageName: '@sap/b-serv'
      }
    };

    expect(optionsPerService(serviceMetadata)).toEqual(expectedVdmMapping);
  });

  it('should log an error if no service path can be determined', () => {
    const metadata = {
      edmx: {
        path: 'test/path/file.edmx'
      } as any
    };

    const logger = createLogger({
      package: 'generator',
      messageContext: 'options-per-service'
    });

    const errorSpy = jest.spyOn(logger, 'error');
    getBasePath(metadata);
    expect(errorSpy).toHaveBeenCalledWith(
      '[ file ] No base path could be determined from available metadata! Replace VALUE_IS_UNDEFINED in the "options-per-service.json".'
    );
  });

  it('should log an error if basePath in service mapping has VALUE_IS_UNDEFINED', () => {
    const metadata = {
      edmx: {
        path: 'test/path/file.edmx',
        selfLink: '/test-service'
      } as any
    };

    const optionsPerServiceIn = {
      basePath: VALUE_IS_UNDEFINED
    } as any;

    const logger = createLogger({
      package: 'generator',
      messageContext: 'options-per-service'
    });

    const errorSpy = jest.spyOn(logger, 'error');
    getBasePath(metadata, optionsPerServiceIn);
    expect(errorSpy).toHaveBeenCalledWith(
      '[ file ] No base path could be determined from available metadata! Replace VALUE_IS_UNDEFINED in the "options-per-service.json".'
    );
  });

  it('should log an error if no base path can be determined and swagger has no base path', () => {
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

    const errorSpy = jest.spyOn(logger, 'error');
    getBasePath(metadata);
    expect(errorSpy).toHaveBeenCalledWith(
      '[ file ] No base path could be determined from available metadata! Replace VALUE_IS_UNDEFINED in the "options-per-service.json".'
    );
  });
});
