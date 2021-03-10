import { getApiSpecificUsage, getGenerationAndUsage, getGenericUsage } from './generation-and-usage';
import { parseService } from '../service-generator';
import { resolve } from "path";
import { oDataServiceSpecs } from '../../../../test-resources/odata-service-specs';
import { createOptions } from '../../test/test-util/create-generator-options';
import { GlobalNameFormatter } from '../global-name-formatter';
import { VdmServiceMetadata } from '../vdm-types';

describe('sdk metadata - generation and usage content',()=>{

  let service:VdmServiceMetadata

  beforeAll(async()=> {
    service = parseService(
      {
        edmxPath:
          resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV/API_TEST_SRV.edmx')
      },
      createOptions(),
      {},
      new GlobalNameFormatter({
          "API_TEST_SRV": {
            "directoryName": "test-service",
            "servicePath": "/sap/opu/odata/sap/API_TEST_SERVICE_SRV;v=0002",
            "npmPackageName": "@sap/cloud-sdk-vdm-test-service"
          }
        }
      )
    )
  })


  it('creates generic usage example',async()=>{
    await expect(getGenericUsage()).resolves.toMatchSnapshot()
  })

  it('creates api specific usage example',async()=>{
    expect(await getApiSpecificUsage(service)).toBe('ABC')
  })

})
