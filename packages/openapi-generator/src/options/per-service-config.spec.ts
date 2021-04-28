import mock from 'mock-fs';
import {
  getOrCreateServiceConfig,
  getPerServiceConfig,
  PerServiceConfig
} from './per-service-config';

describe('getPerServiceConfig', () => {
  const config: PerServiceConfig = {
    'some-file': {
      directoryName: 'dirName',
      packageName: '@scope/package-name'
    }
  };

  beforeAll(() => {
    mock({
      path: {
        'myConfig.json': JSON.stringify(config)
      }
    });
  });

  afterAll(() => {
    mock.restore();
  });

  it('returns a config if a file path was given', async () => {
    expect(await getPerServiceConfig('path/myConfig.json')).toEqual(config);
  });

  it('returns an empty config if a config path was given, but does not exist', async () => {
    expect(await getPerServiceConfig('path/non-existent-config.json')).toEqual(
      {}
    );
  });

  it('returns undefined if no path was given', async () => {
    expect(await getPerServiceConfig(undefined)).toBeUndefined();
  });
});

describe('getOrCreateServiceConfig', () => {
  it('gets a service config if it exists', () => {
    const expectedConfig = {
      packageName: 'serviceName',
      directoryName: 'serviceName'
    };
    const perServiceConfig = { 'some/input.json': expectedConfig };
    expect(
      getOrCreateServiceConfig(
        perServiceConfig,
        'some/input.json',
        'serviceName'
      )
    ).toEqual(expectedConfig);
  });

  it('gets and creates service config if it does not exist', () => {
    const perServiceConfig = {};
    const expectedConfig = {
      packageName: 'serviceName',
      directoryName: 'serviceName'
    };
    expect(
      getOrCreateServiceConfig(
        perServiceConfig,
        'some/input.json',
        'serviceName'
      )
    ).toEqual(expectedConfig);
    expect(perServiceConfig).toEqual({ 'some/input.json': expectedConfig });
  });

  it('gets service config if no per service config is given', () => {
    const expectedConfig = {
      packageName: 'serviceName',
      directoryName: 'serviceName'
    };
    expect(
      getOrCreateServiceConfig(undefined, 'some/input.json', 'serviceName')
    ).toEqual(expectedConfig);
  });
});
