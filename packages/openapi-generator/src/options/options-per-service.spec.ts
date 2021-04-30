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
  it('builds PerService config without options per service.', async () => {
    await expect(
      getOptionsPerService(
        [{ absolutePath: '/user/path/service', relativePath: 'path/service' }],
        {} as ParsedGeneratorOptions
      )
    ).resolves.toMatchInlineSnapshot(`
            Object {
              "path/service": Object {
                "directoryName": "service",
                "packageName": "service",
                "serviceName": "service",
              },
            }
          `);
  });

  it('builds PerService config with options per service.', async () => {
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
      getOptionsPerService(
        [{ absolutePath: '/user/path/service', relativePath: 'path/service' }],
        { optionsPerService: 'path/myConfig.json' } as ParsedGeneratorOptions
      )
    ).resolves.toMatchInlineSnapshot(`
            Object {
              "path/service": Object {
                "directoryName": "dirName",
                "packageName": "@scope/package-name",
                "serviceName": "serviceName",
              },
            }
          `);
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
      getOptionsPerService(
        [{ absolutePath: '/user/path/service', relativePath: 'path/service' }],
        {
          optionsPerService: 'path/myPartialConfig.json'
        } as ParsedGeneratorOptions
      )
    ).resolves.toMatchInlineSnapshot(`
            Object {
              "path/service": Object {
                "directoryName": "dirName",
                "packageName": "@scope/package-name",
                "serviceName": "service",
              },
            }
          `);
  });

  it('throws for conflicting service names if strict naming is on', async () => {
    await expect(
      getOptionsPerService(
        [
          {
            absolutePath: '/user/path1/service',
            relativePath: 'path1/service'
          },
          { absolutePath: '/user/path2/service', relativePath: 'path2/service' }
        ],
        {
          strictNaming: true
        } as ParsedGeneratorOptions
      )
    ).rejects.toMatchInlineSnapshot(
      '[Error: The following service specs lead to non unique file names: path2/service. You can either introduce/adjust a operions-per-service.json or disable the strictNaming flag.]'
    );
  });

  it('renames for conflicting service names if strict naming is off', async () => {
    await expect(
      getOptionsPerService(
        [
          {
            absolutePath: '/user/path1/service',
            relativePath: 'path1/service'
          },
          { absolutePath: '/user/path2/service', relativePath: 'path2/service' }
        ],
        {
          strictNaming: false
        } as ParsedGeneratorOptions
      )
    ).resolves.toMatchInlineSnapshot(`
            Object {
              "path1/service": Object {
                "directoryName": "service",
                "packageName": "service",
                "serviceName": "service",
              },
              "path2/service": Object {
                "directoryName": "service-1",
                "packageName": "service-1",
                "serviceName": "service-1",
              },
            }
          `);
  });
});
