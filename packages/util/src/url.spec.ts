import nock from 'nock';
import { checkUrlExists } from './url';

describe('url', () => {
  it('throws for non existing link', async () => {
    nock('https://non.existing.com').head(/.*/).reply(404);

    await expect(
      checkUrlExists('https://non.existing.com')
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Request failed with status code 404"'
    );
  });

  it('does not throw for existing link', async () => {
    nock('https://existing.com').head(/.*/).reply(200);
    await expect(
      checkUrlExists('https://existing.com')
    ).resolves.toMatchInlineSnapshot('200');
  });
});
