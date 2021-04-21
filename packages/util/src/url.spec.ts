import { checkUrlExists } from '@sap-cloud-sdk/util/dist/url';
import nock from 'nock';

describe('url', () => {
  it('fails for non existing link', async () => {
    nock('https://non.existing.com').head(/.*/).reply(404);

    await expect(
      checkUrlExists('https://non.existing.com')
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('does not fail for existing link', async () => {
    nock('https://existing.com').head(/.*/).reply(200);
    await expect(
      checkUrlExists('https://existing.com')
    ).resolves.toMatchSnapshot();
  });
});
