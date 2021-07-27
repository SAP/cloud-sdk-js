import nock = require('nock');
import { createOptions } from '../../test/test-util/create-generator-options';
import { getTestService } from './pregenerated-lib.spec';
import { sdkMetadata } from './sdk-metadata';

describe('sdk-metadata', () => {
  const service = getTestService();

  it('generates the sdk metadata content for services with pregenerated lib', async () => {
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => 0);
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);
    nock('http://registry.npmjs.org/')
      .get(new RegExp(`/${service.npmPackageName}/latest`))
      .reply(200, { version: '1.2.3' });

    const metadata = await sdkMetadata(
      service,
      createOptions({ versionInPackageJson: '1.0.0' })
    );
    expect(metadata).toMatchSnapshot({
      generationAndUsage: {
        generatorVersion: expect.any(String)
      }
    });
    expect(metadata.pregeneratedLibrary!.version).toBe('1.2.3');
    expect(metadata.serviceStatus.status).toBe('certified');
  });

  it('generates the sdk metadata content for services without pregenerated lib', async () => {
    const metadata = await sdkMetadata(
      service,
      createOptions({ versionInPackageJson: '1.0.0' })
    );

    expect(metadata).toMatchSnapshot({
      generationAndUsage: {
        generatorVersion: expect.any(String)
      }
    });
    expect(metadata.pregeneratedLibrary).toBeUndefined();
  });
});
