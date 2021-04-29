import mock from 'mock-fs';
import {
  getServiceOptions,
  getOriginalOptionsPerService,
  OptionsPerService
} from './options-per-service';

describe('getOriginalOptionsPerService', () => {
  const config: OptionsPerService = {
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

  it('returns a config if an existent file path was given', async () => {
    expect(await getOriginalOptionsPerService('path/myConfig.json')).toEqual(
      config
    );
  });

  it('returns an empty config if a non-existent file path was given', async () => {
    expect(
      await getOriginalOptionsPerService('path/non-existent-config.json')
    ).toEqual({});
  });

  it('returns an empty object if no path was given', async () => {
    expect(await getOriginalOptionsPerService(undefined)).toEqual({});
  });
});

describe('getServiceOptions', () => {
  it('gets a service config if it exists', () => {
    const expectedConfig = {
      packageName: 'serviceName',
      directoryName: 'serviceName'
    };
    const optionsPerService = { 'some/input.json': expectedConfig };
    expect(
      getServiceOptions(optionsPerService, 'some/input.json', 'serviceName')
    ).toEqual(expectedConfig);
  });

  it('gets the default config if it does not exist', () => {
    const optionsPerService = {};
    const expectedConfig = {
      packageName: 'serviceName',
      directoryName: 'serviceName'
    };
    expect(
      getServiceOptions(optionsPerService, 'some/input.json', 'serviceName')
    ).toEqual(expectedConfig);
  });

  it('adds defaults if a config exists partially', () => {
    const optionsPerService = {
      'some/input.json': {
        packageName: 'customPackageName'
      }
    };
    expect(
      getServiceOptions(optionsPerService, 'some/input.json', 'serviceName')
    ).toEqual({
      packageName: 'customPackageName',
      directoryName: 'serviceName'
    });
  });
});
