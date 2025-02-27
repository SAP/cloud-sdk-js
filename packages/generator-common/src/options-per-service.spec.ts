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
  getServiceOptions
} from './options-per-service';
import type { OptionsPerService } from './options-per-service';

describe('getOriginalOptionsPerService', () => {
  const config: OptionsPerService = {
    'some-file': {
      directoryName: 'dirName',
      packageName: '@scope/package-name'
    }
  };

  beforeEach(() => {
    mock({
      path: {
        'myConfig.json': JSON.stringify(config)
      }
    });
  });

  afterEach(() => {
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
  it('checks for npm compliant name', () => {
    const expectedConfig = {
      packageName: 'serviceName',
      directoryName: 'serviceName',
      serviceName: 'serviceName'
    };
    expect(() =>
      getServiceOptions('serviceName', false, expectedConfig)
    ).toThrowErrorMatchingInlineSnapshot(
      "\"The intended package name serviceName is not npm compliant. Either change to a compliant value e.g. 'servicename' in your options per service configuration or execute with '--skipValidation'.\""
    );
  });

  it('does not check for npm compliant name if skipValidation', () => {
    expect(
      getServiceOptions('serviceName', true, {
        packageName: 'serviceNN$%&Nackage'
      }).packageName
    ).toBe('serviceNN$%&Nackage');
  });

  it('gets a service config if it exists', () => {
    const expectedConfig = {
      packageName: 'service-name-package',
      directoryName: 'serviceName',
      serviceName: 'serviceName'
    };
    expect(getServiceOptions('serviceName', false, expectedConfig)).toEqual(
      expectedConfig
    );
  });

  it('gets the default config if it does not exist', () => {
    const expectedConfig = {
      packageName: 'servicename',
      directoryName: 'serviceName'
    };
    expect(getServiceOptions('serviceName', false)).toEqual(expectedConfig);
  });

  it('adds defaults if a config exists partially', () => {
    expect(
      getServiceOptions('serviceName', false, {
        packageName: 'custompackagename'
      })
    ).toEqual({
      packageName: 'custompackagename',
      directoryName: 'serviceName'
    });
  });
});

describe('getOptionsPerService', () => {
  afterEach(() => {
    mock.restore();
  });

  it('builds PerService config without options per service.', async () => {
    await expect(
      getOptionsPerService(['/user/path/service'], {} as any)
    ).resolves.toEqual({
      'path/service': {
        directoryName: 'service',
        packageName: 'service'
      }
    });
  });

  it('builds options per service with existing config file', async () => {
    const config: OptionsPerService = {
      'path/service': {
        directoryName: 'dirName',
        packageName: '@scope/package-name'
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
      } as any)
    ).resolves.toEqual({
      'path/service': {
        directoryName: 'dirName',
        packageName: '@scope/package-name'
      }
    });
  });

  it('builds options per service with partial options per service.', async () => {
    const partialConfig = {
      'path/service': {
        serviceName: 'Readable Name',
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
      } as any)
    ).resolves.toEqual({
      'path/service': {
        directoryName: 'service',
        packageName: '@scope/package-name',
        serviceName: 'Readable Name'
      }
    });
  });

  it('throws for conflicting service names if validation is on', async () => {
    await expect(
      getOptionsPerService(['/user/path1/service', '/user/path2/service'], {
        skipValidation: false
      } as any)
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
            "Duplicate service file names would result in duplicate directory names. Customize directory names with \`optionsPerService\` or enable automatic name adjustment with \`skipValidation\`.
            	Duplicates:
            		Directory name: 'service', specifications: [
            			/user/path1/service,
            			/user/path2/service
            		]"
          `);
  });

  it('renames for conflicting service names if validation is off', async () => {
    await expect(
      getOptionsPerService(['/user/path1/service', '/user/path2/service'], {
        skipValidation: true
      } as any)
    ).resolves.toEqual({
      'path1/service': {
        directoryName: 'service',
        packageName: 'service'
      },
      'path2/service': {
        directoryName: 'service-1',
        packageName: 'service-1'
      }
    });
  });
});
