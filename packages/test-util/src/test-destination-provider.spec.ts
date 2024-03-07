import mock from 'mock-fs';
import { credentials, systems } from '../test/test-util/test-destinations';
import {
  getTestDestinationByAlias,
  getTestDestinations
} from './test-destination-provider';

describe('test-destination-provider', () => {
  afterEach(() => {
    mock.restore();
  });

  describe('getDestinations', () => {
    it('returns a list of destinations taken from the first matching file(s) found by recursively traversing the file hierarchy upwards starting at "./"', () => {
      mock({
        'systems.json': JSON.stringify(systems),
        'credentials.json': JSON.stringify(credentials)
      });

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
      mock({
        '../systems.json': JSON.stringify(systems),
        '../credentials.json': JSON.stringify(credentials)
      });

      const destinations = getTestDestinations({
        systemsFilePath: '../systems.json',
        credentialsFilePath: '../credentials.json'
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
      mock({
        'systems.json': JSON.stringify(systems)
      });

      expect(() =>
        getTestDestinations({
          systemsFilePath: './systems.json',
          credentialsFilePath: 'nopenopenope'
        })
      ).toThrowErrorMatchingInlineSnapshot(
        '"The provided path (nopenopenope) to the credentials file is invalid!"'
      );
    });

    it('works when providing only a path to a systems.json', () => {
      mock({
        'systems.json': JSON.stringify(systems)
      });

      const destinations = getTestDestinations({
        systemsFilePath: './systems.json'
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
      mock({
        'systems.json': JSON.stringify(systems),
        '../credentials.json': JSON.stringify(credentials)
      });

      const destinations = getTestDestinations({
        credentialsFilePath: '../credentials.json'
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
      mock({
        'systems.json': JSON.stringify(systems)
      });

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
      mock();
      expect(() => getTestDestinations()).toThrow(
        /^No systems.json could be found when searching in directory.*/
      );
    });

    it('throws a reasonable error when the file does not contain proper JSON', () => {
      mock({
        'systems.json': 'not proper JSON'
      });

      expect(() => getTestDestinations()).toThrow(
        /^File read from path.*is not valid JSON./
      );
    });
  });

  it('throws a reasonable error when the format is not correct', () => {
    mock({
      'systems.json': '{"systems":[{"alias":"Foo"}]}'
    });

    expect(() => getTestDestinations()).toThrow(
      /A system in .* is not valid - Mandatory alias or url missing./
    );
  });
});

describe('getDestinationByAlias', () => {
  afterEach(() => {
    mock.restore();
  });

  it('locates the files and returns the destination by alias', () => {
    mock({
      'systems.json': JSON.stringify(systems),
      'credentials.json': JSON.stringify(credentials)
    });

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
    mock({
      'systems.json': JSON.stringify(systems),
      'credentials.json': JSON.stringify(credentials)
    });

    expect(() => getTestDestinationByAlias('NOPE'))
      .toThrowErrorMatchingInlineSnapshot(`
      "Couldn't find destination that matches the provided name "NOPE".
            The following destinations could be found: SYS_001, SYS_002"
    `);
  });
});
