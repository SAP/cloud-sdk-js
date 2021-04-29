import { getSdkMetadataFileNames, sdkMetadataHeader } from './sdk-metadata';

describe('sdk-metadata', () => {
  it('generates the header content', async () => {
    expect(
      await sdkMetadataHeader('odata', 'API_TEST_SRV', '1.0.0')
    ).toMatchSnapshot();
  });

  it('generates the File names', () => {
    expect(getSdkMetadataFileNames('MyService')).toMatchSnapshot();
  });
});
