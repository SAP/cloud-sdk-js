import { createOptions } from '../../test/test-util/create-generator-options';
import { VdmServiceMetadata } from '../vdm-types';
import { getTestService } from './pregenerated-lib.spec';
import { getSdkMetadataFileNames, sdkMetaDataHeader, sdkMetaDataJS } from './sdk-metadata';
import * as pregeneratedLib from './pregenerated-lib';

describe('sdk-metadata',()=>{
  afterEach(() => {
    jest.clearAllMocks();
  });

  const service = getTestService();

 it('generates the header content',async ()=>{
   jest.spyOn(pregeneratedLib, 'getVersionForClient').mockImplementationOnce(() => '1.0.0');
   expect(sdkMetaDataHeader(service,createOptions())).toMatchSnapshot();
  });

  it('[E2E] generates the JS metadata content',async ()=>{
    await expect(sdkMetaDataJS(service,createOptions())).resolves.toMatchSnapshot();
  });

  it('generates the File names',()=>{
    expect(getSdkMetadataFileNames({ originalFileName:'MyService' }as VdmServiceMetadata)).toMatchSnapshot();
  });
});
