import { getMetadataFileNames, metadataHeader } from './metadata';

describe('metadata', () => {
  it('generates the header content', async () => {
    expect(
      await metadataHeader('odata', 'API_TEST_SRV', '1.0.0')
    ).toMatchSnapshot();
  });

  it('generates the File names', () => {
    expect(getMetadataFileNames('MyService')).toMatchSnapshot();
  });
});
