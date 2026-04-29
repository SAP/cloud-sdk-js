import { mockFsWithMemfs } from '@sap-cloud-sdk/test-util-internal/fs-mocker';

mockFsWithMemfs(jest);

// eslint-disable-next-line import-x/order
import { resolve } from 'path';
import { jest } from '@jest/globals';
import { vol } from 'memfs';
import { credentials, systems } from '../test/test-util/test-destinations';
import {
  getTestDestinationByAlias,
  getTestDestinations
} from './test-destination-provider';

describe('test-destination-provider', () => {
  afterEach(() => {
    vol.reset();
  });

  describe('getDestinations', () => {
    it('returns a list of destinations taken from the first matching file(s) found by recursively traversing the file hierarchy upwards starting at "./"', () => {
      vol.fromNestedJSON(
        {
          'systems.json': JSON.stringify(systems),
          'credentials.json': JSON.stringify(credentials)
        },
        process.cwd()
      );

      const destinations = getTestDestinations();
      expect(destinations).toEqual([
        {
          name: 'SYS_001',
          url: 'https://example.com',
          username: 'username',
          password: 'password',
          sapClient: undefined,
          isTestDestination: true
        },
        {
          name: 'SYS_002',
          url: 'https://example.com',
          sapClient: '002',
          username: undefined,
          password: undefined,
          isTestDestination: true
        }
      ]);
    });

    it('allows providing paths to the systems and credentials file directly', () => {
      const parentDir = resolve(process.cwd(), '..');
      vol.fromNestedJSON(
        {
          'systems.json': JSON.stringify(systems),
          'credentials.json': JSON.stringify(credentials)
        },
        parentDir
      );

      const destinations = getTestDestinations({
        systemsFilePath: resolve(parentDir, 'systems.json'),
        credentialsFilePath: resolve(parentDir, 'credentials.json')
      });
      expect(destinations).toEqual([
        {
          name: 'SYS_001',
          url: 'https://example.com',
          username: 'username',
          password: 'password',
          sapClient: undefined,
          isTestDestination: true
        },
        {
          name: 'SYS_002',
          url: 'https://example.com',
          sapClient: '002',
          username: undefined,
          password: undefined,
          isTestDestination: true
        }
      ]);
    });

    it('throws an error if the provided systemFilePath is invalid', () => {
      expect(() =>
        getTestDestinations({
          systemsFilePath: 'blablabla',
          credentialsFilePath: 'irrelevant, could should fail beforehand'
        })
      ).toThrowErrorMatchingInlineSnapshot(
        '"The provided path (blablabla) to the systems file is invalid!"'
      );
    });

    it('throws an error if the provided credentialsFilePath is invalid', () => {
      vol.fromNestedJSON(
        { 'systems.json': JSON.stringify(systems) },
        process.cwd()
      );

      expect(() =>
        getTestDestinations({
          systemsFilePath: resolve(process.cwd(), 'systems.json'),
          credentialsFilePath: 'nopenopenope'
        })
      ).toThrowErrorMatchingInlineSnapshot(
        '"The provided path (nopenopenope) to the credentials file is invalid!"'
      );
    });

    it('works when providing only a path to a systems.json', () => {
      vol.fromNestedJSON(
        { 'systems.json': JSON.stringify(systems) },
        process.cwd()
      );

      const destinations = getTestDestinations({
        systemsFilePath: resolve(process.cwd(), 'systems.json')
      });
      expect(destinations).toEqual([
        {
          name: 'SYS_001',
          url: 'https://example.com',
          username: undefined,
          password: undefined,
          sapClient: undefined,
          isTestDestination: true
        },
        {
          name: 'SYS_002',
          url: 'https://example.com',
          sapClient: '002',
          username: undefined,
          password: undefined,
          isTestDestination: true
        }
      ]);
    });

    it('works when providing only a path to a credentials.json when a systems.json can be found', () => {
      const parentDir = resolve(process.cwd(), '..');
      vol.fromNestedJSON(
        {
          'systems.json': JSON.stringify(systems)
        },
        process.cwd()
      );
      vol.fromNestedJSON(
        {
          'credentials.json': JSON.stringify(credentials)
        },
        parentDir
      );

      const destinations = getTestDestinations({
        credentialsFilePath: resolve(parentDir, 'credentials.json')
      });
      expect(destinations).toEqual([
        {
          name: 'SYS_001',
          url: 'https://example.com',
          username: 'username',
          password: 'password',
          sapClient: undefined,
          isTestDestination: true
        },
        {
          name: 'SYS_002',
          url: 'https://example.com',
          sapClient: '002',
          username: undefined,
          password: undefined,
          isTestDestination: true
        }
      ]);
    });

    it('works if a systems.json is found but no credentials.json', () => {
      vol.fromNestedJSON(
        { 'systems.json': JSON.stringify(systems) },
        process.cwd()
      );

      const destinations = getTestDestinations();
      expect(destinations).toEqual([
        {
          name: 'SYS_001',
          url: 'https://example.com',
          username: undefined,
          password: undefined,
          sapClient: undefined,
          isTestDestination: true
        },
        {
          name: 'SYS_002',
          url: 'https://example.com',
          sapClient: '002',
          username: undefined,
          password: undefined,
          isTestDestination: true
        }
      ]);
    });

    it('throws a reasonable error when the JSON file cannot be found', () => {
      vol.fromNestedJSON({ '.keep': '' }, process.cwd());
      expect(() => getTestDestinations()).toThrow(
        /^No systems.json could be found when searching in directory.*/
      );
    });

    it('throws a reasonable error when the file does not contain proper JSON', () => {
      vol.fromNestedJSON({ 'systems.json': 'not proper JSON' }, process.cwd());

      expect(() => getTestDestinations()).toThrow(
        /^File read from path.*is not valid JSON./
      );
    });
  });

  it('throws a reasonable error when the format is not correct', () => {
    vol.fromNestedJSON(
      { 'systems.json': '{"systems":[{"alias":"Foo"}]}' },
      process.cwd()
    );

    expect(() => getTestDestinations()).toThrow(
      /A system in .* is not valid - Mandatory alias or url missing./
    );
  });
});

describe('getDestinationByAlias', () => {
  afterEach(() => {
    vol.reset();
  });

  it('locates the files and returns the destination by alias', () => {
    vol.fromNestedJSON(
      {
        'systems.json': JSON.stringify(systems),
        'credentials.json': JSON.stringify(credentials)
      },
      process.cwd()
    );

    const sysOne = getTestDestinationByAlias('SYS_001');
    const sysTwo = getTestDestinationByAlias('SYS_002');

    expect(sysOne).toEqual({
      name: 'SYS_001',
      url: 'https://example.com',
      sapClient: undefined,
      username: 'username',
      password: 'password',
      isTestDestination: true
    });

    expect(sysTwo).toEqual({
      name: 'SYS_002',
      url: 'https://example.com',
      sapClient: '002',
      username: undefined,
      password: undefined,
      isTestDestination: true
    });
  });

  it("throws an error if the specified destination can't be found", () => {
    vol.fromNestedJSON(
      {
        'systems.json': JSON.stringify(systems),
        'credentials.json': JSON.stringify(credentials)
      },
      process.cwd()
    );

    expect(() => getTestDestinationByAlias('NOPE'))
      .toThrowErrorMatchingInlineSnapshot(`
      "Couldn't find destination that matches the provided name "NOPE".
            The following destinations could be found: SYS_001, SYS_002"
    `);
  });
});
