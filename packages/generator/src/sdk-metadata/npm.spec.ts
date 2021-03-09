import { VdmServiceMetadata } from '../vdm-types';
import { parseService } from '../service-generator';
import { createOptions } from '../../test/test-util/create-generator-options';
import { GlobalNameFormatter } from '../global-name-formatter';
import {resolve} from 'path'
import { oDataServiceSpecs } from '../../../../test-resources/odata-service-specs';
import { getInstallationSnippet, getRepositoryLink, getVersion, getServiceDescription } from './npm';
import { GeneratorOptions } from '../generator-options';

describe('sdk metadata - npm related information',()=>{
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

  it('returns installation snipped',()=>{
    expect(getInstallationSnippet(service)).toBe('npm i @sap/cloud-sdk-vdm-test-service::latest')
  })

  it('returns repository link',()=>{
    expect(getRepositoryLink(service)).toBe('https://www.npmjs.com/package/@sap/cloud-sdk-vdm-test-service')
  })

  it('returns version from generator options or generator version',()=>{
    expect(getVersion({versionInPackageJson:'123'} as GeneratorOptions)).toBe('123')
    expect(getVersion({} as GeneratorOptions)).toMatch(/d+\.d+\.d+/)
  })

  it('returns description of the service',()=>{
    expect(getServiceDescription(service,createOptions())).toBe('123')
  })
})
