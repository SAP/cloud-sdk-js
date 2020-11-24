import { serviceMapping, VdmMapping } from '../src/service-mapping';
import { VdmServiceMetadata } from '../src/vdm-types';

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
});
