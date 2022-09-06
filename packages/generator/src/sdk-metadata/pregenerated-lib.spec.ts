import { resolve } from 'path';
import { packageDescription } from '@sap-cloud-sdk/generator-common/internal';
import { VdmServiceMetadata } from '../vdm-types';
import { parseService } from '../service-generator';
import { createOptions } from '../../test/test-util/create-generator-options';
import { GlobalNameFormatter } from '../global-name-formatter';
import { oDataServiceSpecs } from '../../../../test-resources/odata-service-specs';
describe('pregenerated-lib', () => {
  const service: VdmServiceMetadata = getTestService();

  it('returns description of the service', () => {
    expect(packageDescription(service.speakingModuleName)).toMatchSnapshot();
  });
});

export function getTestService(npmPackageName?: string): VdmServiceMetadata {
  return parseService(
    {
      edmxPath: resolve(
        oDataServiceSpecs,
        'v2',
        'API_TEST_SRV/API_TEST_SRV.edmx'
      )
    },
    createOptions(),
    {},
    new GlobalNameFormatter({
      API_TEST_SRV: {
        directoryName: 'test-service',
        servicePath: '/sap/opu/odata/sap/API_TEST_SERVICE_SRV;v=0002',
        npmPackageName: npmPackageName || '@sap/cloud-sdk-vdm-test-service'
      }
    })
  );
}
