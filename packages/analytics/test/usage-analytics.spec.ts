/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import os from 'os';
import nock from 'nock';
import { getAnalyticsData } from '../dist';
import { UsageAnalyticsOptions } from '../src/analytics-types';
import { sendAnalyticsData } from '../src/usage-analytics';

describe('sendAnalyticsData()', () => {
  const salt = '7e5eb0e845e73b72310436f29252bf4ad0ef3d0d8c0ae189dec3d5ff2531e6a0';

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
    await expect(sendAnalyticsData({ enabled: false }, data)).resolves.toBeUndefined();
  });

  it('sendAnalyticsData should execute the request correctly', done => {
    const swaRoute = nock('http://example.com')
      .get(/\/mockedUrl.*/)
      .reply(204);

    const options: UsageAnalyticsOptions = { uri: 'http://example.com/mockedUrl', idsitesub: 'test-jssdk', event_type: 'test_event' };
    getAnalyticsData({ enabled: true, salt }).then(data => {
      sendAnalyticsData({ enabled: true, salt }, data, options)
        .then(() => {
          expect(swaRoute.isDone()).toBe(true);
          done();
        })
        .catch(error => {
          done(error);
        });
    });
  });

  it('sendAnalyticsData should throw an error when the request fails', done => {
    const swaRoute = nock('http://example.com')
      .get(/\/mockedUrl.*/)
      .reply(401);

    const options: UsageAnalyticsOptions = { uri: 'http://example.com/mockedUrl', idsitesub: 'test-jssdk', event_type: 'test_event' };
    getAnalyticsData({ enabled: true, salt }).then(data => {
      sendAnalyticsData({ enabled: true, salt }, data, options)
        .then(() => done('Should have failed.'))
        .catch(() => {
          expect(swaRoute.isDone()).toBe(true);
          done();
        });
    });
  });
});
