import nock from 'nock';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import type { Destination } from '@sap-cloud-sdk/connectivity';
import { timeout } from './timeout';

describe('timeout', () => {
  const httpsDestination: Destination = {
    name: 'httpsDestination',
    url: 'https://example.com'
  };

  it('considers timeout via middleware on csrf token fetching', async () => {
    const delayInResponse = 10;
    nock('http://example.com', {})
      .post(/with-delay/)
      .delay(delayInResponse)
      .reply(200);

    await expect(
      executeHttpRequest(
        { url: 'http://example.com' },
        {
          method: 'post',
          url: 'with-delay',
          middleware: [timeout(delayInResponse * 0.5)]
        }
      )
    ).rejects.toThrow(
      'Request to http://example.com ran into timeout after 5ms.'
    );
  });

  it('uses a custom timeout if given', async () => {
    const delayInResponse = 10;
    nock('https://example.com', {})
      .get('/with-delay')
      .times(2)
      .delay(delayInResponse)
      .reply(200);

    await expect(
      executeHttpRequest(httpsDestination, {
        method: 'get',
        url: '/with-delay',
        middleware: [timeout(delayInResponse * 0.5)]
      })
    ).rejects.toThrow(
      'Request to https://example.com ran into timeout after 5ms.'
    );

    await expect(
      executeHttpRequest(httpsDestination, {
        method: 'get',
        url: '/with-delay',
        middleware: [timeout(delayInResponse * 10)]
      })
    ).resolves.not.toThrow();
  });
});
