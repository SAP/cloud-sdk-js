import { getSdkVersion } from '@sap-cloud-sdk/generator-common/internal';
import { dummyOpenApiDocument } from '../../test/test-util';
import { sdkMetadata } from './sdk-metadata';

describe('sdk-metadata', () => {
  it('generates metadata content for services without pregenerated lib', async () => {
    const metadata = await sdkMetadata(dummyOpenApiDocument);
    expect(metadata).toMatchSnapshot({
      generatorVersion: expect.any(String)
    });
    expect(metadata.generatorVersion).toEqual(await getSdkVersion());
  });
});
