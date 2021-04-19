import { createOptions } from '../../test/test-util/create-generator-options';
import { VdmServiceMetadata } from '../vdm-types';
import { getTestService } from './pregenerated-lib.spec';
import {
  getSdkMetadataFileNames,
  sdkMetaDataHeader,
  sdkMetaDataJS
} from './sdk-metadata';

describe('sdk-metadata', () => {
  const service = getTestService();

  it('generates the header content', async () => {
    expect(
      sdkMetaDataHeader(
        service,
        createOptions({ versionInPackageJson: '1.0.0' })
      )
    ).toMatchSnapshot();
  });

  it('[E2E] generates the JS metadata content for services with pregenerated lib', async () => {
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => 0);
    const metaData = await sdkMetaDataJS(
      {
        ...service,
        npmPackageName: '@sap/cloud-sdk-vdm-business-partner-service'
      },
      createOptions({ versionInPackageJson: '1.0.0' })
    );
    expect(metaData).toMatchSnapshot();
    expect(metaData.serviceStatus.status).toBe('certified');
  });

  it('[E2E] generates the JS metadata content for services without pregenerated lib', async () => {
    const metaData = await sdkMetaDataJS(
      { ...service, npmPackageName: 'non-existing-package' },
      createOptions({ versionInPackageJson: '1.0.0' })
    );
    expect(metaData).toMatchSnapshot();
    expect(metaData.serviceStatus.status).toBe('verified');
  });

  it('generates the File names', () => {
    expect(
      getSdkMetadataFileNames({
        originalFileName: 'MyService'
      } as VdmServiceMetadata)
    ).toMatchSnapshot();
  });
});
