import os from 'os';
import nock from 'nock';
import { expectAllMocksUsed } from '../../../test-resources/test/test-util';
import { UsageAnalyticsOptions } from './analytics-types';
import { sendAnalyticsData } from './usage-analytics';
import { getAnalyticsData } from './analytics-data';

describe('sendAnalyticsData()', () => {
  const salt =
    '7e5eb0e845e73b72310436f29252bf4ad0ef3d0d8c0ae189dec3d5ff2531e6a0';

  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(os, 'platform').mockImplementationOnce(() => 'darwin');
    jest.spyOn(os, 'release').mockImplementationOnce(() => '18.2.0');
    jest.spyOn(os, 'arch').mockImplementationOnce(() => 'x64');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('skip usage analytics', async () => {
    const data = await getAnalyticsData({ enabled: true, salt });
    await expect(
      sendAnalyticsData({ enabled: false }, data)
    ).resolves.toBeUndefined();
  });

  it('sendAnalyticsData should execute the request correctly', async () => {
    const swaRoute = nock('http://example.com')
      .get(/\/mockedUrl.*/)
      .reply(204);

    const options: UsageAnalyticsOptions = {
      uri: 'http://example.com/mockedUrl',
      idsitesub: 'test-jssdk',
      event_type: 'test_event'
    };
    const data = await getAnalyticsData({ enabled: true, salt });
    await expect(
      sendAnalyticsData({ enabled: true, salt }, data, options)
    ).resolves.toBeDefined();
    expectAllMocksUsed([swaRoute]);
  });

  it('sendAnalyticsData should throw an error when the request fails', async () => {
    const swaRoute = nock('http://example.com')
      .get(/\/mockedUrl.*/)
      .reply(401);

    const options: UsageAnalyticsOptions = {
      uri: 'http://example.com/mockedUrl',
      idsitesub: 'test-jssdk',
      event_type: 'test_event'
    };
    const data = await getAnalyticsData({ enabled: true, salt });
    await expect(
      sendAnalyticsData({ enabled: true, salt }, data, options)
    ).rejects.toThrowError('Failed to send usage analytics data.');
    expectAllMocksUsed([swaRoute]);
  });
});
