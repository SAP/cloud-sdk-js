import axios from 'axios';
import nock from 'nock';
import { executeWithMiddleware } from './middleware';
import { retry } from './retry';
import { timeout } from './timeout';

describe('combined resilience features', () => {
  const HTTP_STATUS = {
    OK: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    SERVICE_UNAVAILABLE: 504
  };

  it('Needs to retry with delay below timeout', async () => {
    nock('https://example.com', {})
      .get('/retry')
      .delay(300)
      .reply(HTTP_STATUS.SERVICE_UNAVAILABLE)
      .get('/retry')
      .delay(300)
      .reply(HTTP_STATUS.OK);

    const request = () =>
      axios.request({
        baseURL: 'https://example.com',
        method: 'get',
        url: '/retry'
      });

    await expect(
      executeWithMiddleware(
        [timeout(600), retry(2)],
        { uri: 'https://example.com', args: [] },
        request
      )
    ).resolves.not.toThrow();
  });
  it('Needs to retry with delay above timeout', async () => {
    nock('https://example.com', {})
      .get('/retry')
      .delay(300)
      .reply(HTTP_STATUS.SERVICE_UNAVAILABLE)
      .get('/retry')
      .delay(100)
      .reply(HTTP_STATUS.OK);

    const request = () =>
      axios.request({
        baseURL: 'https://example.com',
        method: 'get',
        url: '/retry'
      });

    await expect(
      executeWithMiddleware(
        [timeout(200), retry(2)],
        { uri: 'https://example.com', args: [] },
        request
      )
    ).resolves.not.toThrow();
  });
});
