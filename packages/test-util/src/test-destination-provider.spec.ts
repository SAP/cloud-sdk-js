import { fail } from 'assert';
import { unlinkSync, writeFileSync } from 'fs';
import { credentials, systems } from '../test/test-util/test-destinations';
import {
  getTestDestinationByAlias,
  getTestDestinations
} from './test-destination-provider';
// This replaces the fs module with the mocked one defined in __mock__/fs.js
jest.mock('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

describe('test-destination-provider', () => {
  describe('getDestinations', () => {
    it('returns a list of destinations taken from the first matching file(s) found by recursively traversing the file hierarchy upwards starting at "./"', () => {
      writeFileSync('./systems.json', JSON.stringify(systems));
      writeFileSync('./credentials.json', JSON.stringify(credentials));

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

      unlinkSync('./systems.json');
      unlinkSync('./credentials.json');
    });

    it('allows providing paths to the systems and credentials file directly', () => {
      writeFileSync('../systems.json', JSON.stringify(systems));
      writeFileSync('../credentials.json', JSON.stringify(credentials));

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

      unlinkSync('../systems.json');
      unlinkSync('../credentials.json');
    });

    it('throws an error if the provided systemFilePath is invalid', () => {
      try {
        getTestDestinations({
          systemsFilePath: 'blablabla',
          credentialsFilePath: 'irrelevant, could should fail beforehand'
        });
        fail('Expected an error to be thrown, but none has been.');
      } catch (error) {
        expect(error.message).toContain('The provided path');
      }
    });

    it('throws an error if the provided credentialsFilePath is invalid', () => {
      writeFileSync('./systems.json', JSON.stringify(systems));

      try {
        getTestDestinations({
          systemsFilePath: './systems.json',
          credentialsFilePath: 'nopenopenope'
        });
        fail('Expected an error to be thrown, but none has been.');
      } catch (error) {
        expect(error.message).toContain('The provided path');
      }

      unlinkSync('./systems.json');
    });

    it('works when providing only a path to a systems.json', () => {
      writeFileSync('./systems.json', JSON.stringify(systems));

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

      unlinkSync('./systems.json');
    });

    it('works when providing only a path to a credentials.json when a systems.json can be found', () => {
      writeFileSync('./systems.json', JSON.stringify(systems));
      writeFileSync('../credentials.json', JSON.stringify(credentials));

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

      unlinkSync('./systems.json');
      unlinkSync('../credentials.json');
    });

    it('works if a systems.json is found but no credentials.json', () => {
      writeFileSync('./systems.json', JSON.stringify(systems));

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

      unlinkSync('./systems.json');
    });

    it('throws a reasonable error when the JSON file cannot be found', () => {
      try {
        fs.switchMockOn();
        getTestDestinations();
      } catch (error) {
        expect(error.message).toMatch(
          /No systems\.json could be found when searching in directory .+ and upwards and no paths have been provided directly\./
        );
      } finally {
        fs.switchMockOff();
      }
    });

    it('throws a reasonable error when the file does not contain proper JSON', () => {
      try {
        fs.switchMockOn();
        fs.setReadDirSync(['systems.json']);
        fs.setReadFileSync('not proper JSON');
        getTestDestinations();
        fail('Expected an error to be thrown, but none has been.');
      } catch (error) {
        expect(error.message).toContain('is not valid JSON');
      } finally {
        fs.switchMockOff();
      }
    });
  });

  it('throws a reasonable error when the format is not correct', () => {
    writeFileSync('./systems.json', '{"systems":[{"alias":"Foo"}]}');

    try {
      getTestDestinations();
      fail('Expected an error to be thrown, but none has been.');
    } catch (error) {
      expect(error.message).toMatch(
        /A system in .* is not valid - Mandatory alias or url missing./
      );
    }

    unlinkSync('./systems.json');
  });
});

describe('getDestinationByAlias', () => {
  it('locates the files and returns the destination by alias', () => {
    writeFileSync('./systems.json', JSON.stringify(systems));
    writeFileSync('./credentials.json', JSON.stringify(credentials));

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

    unlinkSync('./systems.json');
    unlinkSync('./credentials.json');
  });

  it("throws an error if the specified destination can't be found", () => {
    writeFileSync('./systems.json', JSON.stringify(systems));
    writeFileSync('./credentials.json', JSON.stringify(credentials));

    try {
      getTestDestinationByAlias('NOPE');
      fail('Expected an error to be thrown, but none has been.');
    } catch (error) {
      expect(error.message).toContain("Couldn't find destination that matches");
    }

    unlinkSync('./systems.json');
    unlinkSync('./credentials.json');
  });
});
