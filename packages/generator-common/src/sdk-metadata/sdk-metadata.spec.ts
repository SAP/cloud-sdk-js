import { getSdkMetadataFileNames } from './sdk-metadata';

describe('sdk-metadata', () => {
  it('generates the File names', () => {
    expect(getSdkMetadataFileNames('MyService')).toMatchSnapshot();
  });
});
