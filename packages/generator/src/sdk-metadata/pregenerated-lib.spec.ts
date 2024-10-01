import { resolve } from 'path';
import {
  packageDescription,
  parseOptions
} from '@sap-cloud-sdk/generator-common/internal';
import { parseService } from '../service-generator';
import { createOptions } from '../../test/test-util/create-generator-options';
import { oDataServiceSpecs } from '../../../../test-resources/odata-service-specs';
import { cliOptions } from '../options';
import type { VdmServiceMetadata } from '../vdm-types';
describe('pregenerated-lib', () => {
  it('returns description of the service', async () => {
    const service: VdmServiceMetadata = await getTestService();
    expect(packageDescription(service.className)).toMatchSnapshot();
  });
});

export async function getTestService(): Promise<VdmServiceMetadata> {
  const path = resolve(
    oDataServiceSpecs,
    'v2',
    'API_TEST_SRV/API_TEST_SRV.edmx'
  );
  return parseService(
    path,
    parseOptions(cliOptions, createOptions({ input: path }))
  );
}
