import nock = require('nock');
import { dummyOpenApiDocument } from '../../test/test-util';
import { sdkMetadata } from './sdk-metadata';

describe('sdk-metadata', () => {
  it('generates metadata content for services without pregenerated lib', async () => {
    const metadata = await sdkMetadata(dummyOpenApiDocument);
    expect(metadata).toMatchSnapshot({
      generationAndUsage: { generatorVersion: expect.any(String) }
    });
    expect(metadata.pregeneratedLibrary).toBeUndefined();
  });

  it('generates metadata content for services with pregenerated lib', async () => {
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => 0);
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);
    nock('http://registry.npmjs.org/')
      .get(
        new RegExp(`/${dummyOpenApiDocument.serviceOptions.packageName}/latest`)
      )
      .reply(200, { version: '1.2.3' });

    const metadata = await sdkMetadata(dummyOpenApiDocument);
    expect(metadata).toMatchSnapshot({
      generationAndUsage: { generatorVersion: expect.any(String) }
    });
    expect(metadata.pregeneratedLibrary!.version).toBe('1.2.3');
    expect(metadata.serviceStatus.status).toBe('certified');
  });
});
