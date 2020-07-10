/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { serviceMapping, VdmMapping } from '../src/service-mapping';
import { VdmServiceMetadata } from '../src/service-vdm/vdm-types';

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
        entities: [],
        functionImports: [],
        namespace: 'fghjkl',
        speakingModuleName: 'fghjk',
        className: 'AService',
        edmxPath: 'fghjkl'
      },
      {
        oDataVersion: 'v2',
        originalFileName: 'API_B_SERV',
        directoryName: 'b-serv',
        npmPackageName: '@sap/b-serv',
        servicePath: '/path/to/serv',
        complexTypes: [],
        entities: [],
        functionImports: [],
        namespace: 'fghjkl',
        speakingModuleName: 'fghjk',
        className: 'BService',
        edmxPath: 'fghjkl'
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
