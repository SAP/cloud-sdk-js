import nock from 'nock';
import axios from 'axios';
import { timeout } from './timeout';
import { executeWithMiddleware } from './middleware';

describe('timeout', () => {
  it('uses a custom timeout if given', async () => {
    const delayInResponse = 100;
    nock('https://example.com', {})
      .get('/with-delay')
      .times(2)
      .delay(delayInResponse)
      .reply(200);

    const request = () =>
      axios.request({
        baseURL: 'https://example.com',
        method: 'get',
        url: '/with-delay'
      });

    await expect(
      executeWithMiddleware(
        [timeout(delayInResponse * 0.5)],
        { uri: 'https://example.com', args: [] },
        request
      )
    ).rejects.toThrow(
      'Request to URL: https://example.com ran into a timeout after 50ms.'
    );

    await expect(
      executeWithMiddleware(
        [timeout(delayInResponse * 2)],
        { uri: 'https://example.com', args: [] },
        request
      )
    ).resolves.not.toThrow();
  });

  it('uses 10 seconds default timeout', async () => {
    const oneSecond = 1000;
    nock('https://example.com', {})
      .get('/with-delay')
      .times(1)
      .delay(oneSecond)
      .reply(200)
      .get('/with-delay')
      .times(1)
      .delay(11 * oneSecond)
      .reply(200);

    const request = () =>
      axios.request({
        baseURL: 'https://example.com',
        method: 'get',
        url: '/with-delay'
      });
    const response = await executeWithMiddleware(
      [timeout()],
      { uri: 'https://example.com', args: [] },
      request
    );

    expect(response.status).toEqual(200);

    await expect(
      executeWithMiddleware(
        [timeout()],
        { uri: 'https://example.com', args: [] },
        request
      )
    ).rejects.toThrow(
      'Request to URL: https://example.com ran into a timeout after 10000ms'
    );
  }, 15000);
});
