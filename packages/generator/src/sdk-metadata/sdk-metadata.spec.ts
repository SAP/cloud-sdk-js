import nock = require('nock');
import { createOptions } from '../../test/test-util/create-generator-options';
import { getTestService } from './pregenerated-lib.spec';
import { sdkMetadata } from './sdk-metadata';

describe('sdk-metadata', () => {
  const service = getTestService();

  it('generates the sdk metadata content for services with pregenerated lib', async () => {
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => 0);
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);

    const metaData = await sdkMetadata(
      service,
      createOptions({ versionInPackageJson: '1.0.0' })
    );
    expect(metaData).toMatchSnapshot({
      generationAndUsage: {
        generatorVersion: expect.any(String)
      }
    });
  });

  it('generates the sdk metadata content for services without pregenerated lib', async () => {
    const metaData = await sdkMetadata(
      service,
      createOptions({ versionInPackageJson: '1.0.0' })
    );

    expect(metaData).toMatchSnapshot({
      generationAndUsage: {
        generatorVersion: expect.any(String)
      }
    });
  });
});
