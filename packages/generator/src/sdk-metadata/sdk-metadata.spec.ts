import { getTestService } from './pregenerated-lib.spec';
import { sdkMetadata } from './sdk-metadata';

describe('sdk-metadata', () => {
  const service = getTestService();

  it('generates the sdk metadata content for services without pregenerated lib', async () => {
    const metadata = await sdkMetadata(service);
    expect(metadata).toMatchSnapshot({ generatorVersion: expect.any(String) });
  });
});
