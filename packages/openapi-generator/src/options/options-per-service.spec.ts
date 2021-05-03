jest.mock('path', () => {
  const path = jest.requireActual('path');
  return {
    ...path,
    relative: (from, to: string) =>
      to.startsWith('/user/')
        ? to.replace('/user/', '')
        : path.relative(from, to)
  };
});

import mock from 'mock-fs';
import {
  getOptionsPerService,
  getOriginalOptionsPerService,
  getServiceOptions,
  OptionsPerService
} from './options-per-service';
import { ParsedGeneratorOptions } from './generator-options';

describe('getOriginalOptionsPerService', () => {
  const config: OptionsPerService = {
    'some-file': {
      directoryName: 'dirName',
      packageName: '@scope/package-name',
      serviceName: 'serviceName'
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
      directoryName: 'serviceName',
      serviceName: 'serviceName'
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
      directoryName: 'serviceName',
      serviceName: 'serviceName'
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
      directoryName: 'serviceName',
      serviceName: 'serviceName'
    });
  });
});

describe('getOptionsPerService', () => {
  afterAll(() => {
    mock.restore();
  });

  it('builds PerService config without options per service.', async () => {
    await expect(
      getOptionsPerService(['/user/path/service'], {} as ParsedGeneratorOptions)
    ).resolves.toEqual({
      'path/service': {
        directoryName: 'service',
        packageName: 'service',
        serviceName: 'service'
      }
    });
  });

  it('builds options per service with existing config file', async () => {
    const config: OptionsPerService = {
      'path/service': {
        directoryName: 'dirName',
        packageName: '@scope/package-name',
        serviceName: 'serviceName'
      }
    };

    mock({
      path: {
        'myConfig.json': JSON.stringify(config)
      }
    });

    await expect(
      getOptionsPerService(['/user/path/service'], {
        optionsPerService: 'path/myConfig.json'
      } as ParsedGeneratorOptions)
    ).resolves.toEqual({
      'path/service': {
        directoryName: 'dirName',
        packageName: '@scope/package-name',
        serviceName: 'serviceName'
      }
    });
  });

  it('builds PerService config with partial options  per service.', async () => {
    const partialConfig = {
      'path/service': {
        directoryName: 'dirName',
        packageName: '@scope/package-name'
      }
    };

    mock({
      path: {
        'myPartialConfig.json': JSON.stringify(partialConfig)
      }
    });

    await expect(
      getOptionsPerService(['/user/path/service'], {
        optionsPerService: 'path/myPartialConfig.json'
      } as ParsedGeneratorOptions)
    ).resolves.toEqual({
      'path/service': {
        directoryName: 'dirName',
        packageName: '@scope/package-name',
        serviceName: 'service'
      }
    });
  });

  it('throws for conflicting service names if validation is on', async () => {
    await expect(
      getOptionsPerService(['/user/path1/service', '/user/path2/service'], {
        skipValidation: false
      } as ParsedGeneratorOptions)
    ).rejects.toMatchInlineSnapshot(`
            [Error: The following service specs lead to non unique service names:
            path2/service.
            You can either introduce a optionsPerSerivice file or enable the skipValidation flag.]
          `);
  });

  it('renames for conflicting service names if validation is off', async () => {
    await expect(
      getOptionsPerService(['/user/path1/service', '/user/path2/service'], {
        skipValidation: true
      } as ParsedGeneratorOptions)
    ).resolves.toEqual({
      'path1/service': {
        directoryName: 'service',
        packageName: 'service',
        serviceName: 'service'
      },
      'path2/service': {
        directoryName: 'service-1',
        packageName: 'service-1',
        serviceName: 'service-1'
      }
    });
  });
});
