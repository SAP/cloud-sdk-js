import {
  getSdkMetadataFileNames,
  sdkMetaDataHeader
} from '@sap-cloud-sdk/generator-common';

describe('sdk-metadata', () => {
  it('generates the header content', async () => {
    expect(
      await sdkMetaDataHeader('odata', 'API_TEST_SRV', '1.0.0')
    ).toMatchSnapshot();
  });

  it('generates the File names', () => {
    expect(getSdkMetadataFileNames('MyService')).toMatchSnapshot();
  });
});
