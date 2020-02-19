import * as analytics from '@sap-cloud-sdk/analytics';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import nock from 'nock';
import { dirname, resolve, sep } from 'path';

describe('usage analytics', () => {
  const salt = '7e5eb0e845e73b72310436f29252bf4ad0ef3d0d8c0ae189dec3d5ff2531e6a0';
  const hashedProjectIdentifierWithSalt = 'e2d76b70dcb8ed5fd86e9fadf5052845ae1a0112e99ab96747b03bf78730a7ab';

  const rootConfigPath = resolve(
    __dirname.split(sep).reduce((prev, curr) => (prev.endsWith('integration-tests') ? prev : `${prev}${sep}${curr}`)),
    'sap-cloud-sdk-analytics.json'
  );

  beforeEach(() => {
    jest.spyOn(analytics, 'getAnalyticsData').mockResolvedValue({
      project_id: hashedProjectIdentifierWithSalt,
      os: 'darwin,18.2.0,x64',
      node: '10.11.1',
      npm: '6.0.0',
      typescript: 'true',
      sdk_dependencies: '@sap-cloud-sdk/util@1.7.1, @sap/cloud-sdk-vdm-some-service@1.7.1',
      third_party_dependencies: 'axios@0.19.0, moment@2.24.0, rambda@1.2.3, typescript@3.4.1'
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should send usage data if analytics are enabled', async () => {
    writeFileSync(rootConfigPath, JSON.stringify({ enabled: true, salt }), 'utf8');

    const swaCall = nock('http://example.com')
      .get('/mockedUrl')
      .query(q => isSubQuery(q, {
        action_name: 'SAP S/4HANA Cloud SDK',
        url: 'https://blogs.sap.com/2018/10/23/usage-analytics-s4sdk/',
        idsite: 'b67a7f90-dc52-72f0-cbac-18bf4147456a',
        idsitesub: 'test-jssdk',
        event_type: 'test_event',
        custom1: 'project_id',
        e_a: hashedProjectIdentifierWithSalt
      }))
      .reply(204);

    const options = { uri: 'http://example.com/mockedUrl', idsitesub: 'test-jssdk', event_type: 'test_event' };
    const callerPath = '/node_modules'; // pretend that we are a dependency

    await expect(analytics.performUsageAnalytics(callerPath, options)).resolves.toBeUndefined();
    expect(swaCall.isDone()).toBe(true);

    unlinkSync(rootConfigPath);
  });

  it('should not send usage data if analytics are disabled', async () => {
    const swaCall = nock('http://example.com')
      .get('/mockedUrl')
      .query(q => isSubQuery(q, {
        action_name: 'SAP S/4HANA Cloud SDK'
      }))
      .reply(204);

    writeFileSync(rootConfigPath, JSON.stringify({ enabled: false, salt }), 'utf8');

    const callerPath = '/node_modules'; // pretend that we're a dependency
    await expect(analytics.performUsageAnalytics(callerPath)).resolves.toBeUndefined();
    expect(swaCall.isDone()).toBe(false); // since it's otherwise hard to test that the code does do something, we setup the HTTP mock and then assert that it has not been called

    unlinkSync(rootConfigPath);
  });

  it('should not send usage data if no config can be found', async () => {
    const swaCall = nock('http://example.com')
      .get('/mockedUrl')
      .query(q => isSubQuery(q, {
        action_name: 'SAP S/4HANA Cloud SDK'
      }))
      .reply(204);

    const callerPath = '/node_modules'; // pretend that we're a dependency
    await expect(analytics.performUsageAnalytics(callerPath)).resolves.toBeUndefined();
    expect(swaCall.isDone()).toBe(false); // since it's otherwise hard to test that the code does do something, we setup the HTTP mock and then assert that it has not been called
  });

  it('any error in the process should be caught and logged, but otherwise ignored', async () => {
    writeFileSync(rootConfigPath, JSON.stringify({ enabled: true, salt }), 'utf8');

    const swaCall = nock('http://example.com')
      .get('/mockedUrl')
      .query(q => isSubQuery(q, {
        action_name: 'SAP S/4HANA Cloud SDK',
        url: 'https://blogs.sap.com/2018/10/23/usage-analytics-s4sdk/',
        idsite: 'b67a7f90-dc52-72f0-cbac-18bf4147456a',
        idsitesub: 'test-jssdk',
        event_type: 'test_event',
        custom1: 'project_id',
        e_a: hashedProjectIdentifierWithSalt
      }))
      .reply(500);

    const options = { uri: 'http://example.com/mockedUrl', idsitesub: 'test-jssdk', event_type: 'test_event' };
    const callerPath = '/node_modules'; // pretend that we are a dependency

    await expect(analytics.performUsageAnalytics(callerPath, options)).resolves.toBeUndefined();
    expect(swaCall.isDone()).toBe(true);

    unlinkSync(rootConfigPath);
  });

  it('generateConfig should generate a new config at the given path if none exists', () => {
    analytics.generateConfig(resolve(__dirname));

    const generatedConfig = JSON.parse(readFileSync(resolve(__dirname, 'sap-cloud-sdk-analytics.json'), 'utf8'));
    expect(generatedConfig.enabled).toBe(true);
    expect(generatedConfig.salt).toBeDefined();

    unlinkSync(resolve(__dirname, 'sap-cloud-sdk-analytics.json'));
  });

  it('generateConfig should not generate a new config at the given path if one exists already', () => {
    const existingConfig = {
      enabled: false,
      salt: 'saltysalt'
    };
    writeFileSync(rootConfigPath, JSON.stringify(existingConfig), 'utf8');

    analytics.generateConfig(dirname(rootConfigPath));

    const config = JSON.parse(readFileSync(rootConfigPath, 'utf8'));
    expect(config).toEqual(existingConfig);

    unlinkSync(rootConfigPath);
  });
});

function isSubQuery(query, subQuery) {
  return Object.entries(subQuery).reduce((isSub, [key, value]) => isSub && query[key] === value, true);
}
