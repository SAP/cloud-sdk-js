import { getTestService } from './pregenerated-lib.spec';
import { sdkMetadata } from './sdk-metadata';

describe('sdk-metadata', () => {
  it('generates the sdk metadata content for services without pregenerated lib', async () => {
    const metadata = await sdkMetadata(await getTestService());
    expect(metadata).toMatchSnapshot({ generatorVersion: expect.any(String) });
  });
});
