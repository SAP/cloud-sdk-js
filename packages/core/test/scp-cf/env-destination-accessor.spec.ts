/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import * as assert from 'assert';
import { createLogger } from '@sap-cloud-sdk/util';
import { Destination } from '../../src/scp-cf/destination-service-types';
import { getDestinationByName, getDestinationsFromEnv } from '../../src/scp-cf/env-destination-accessor';
import { muteLoggers } from '../test-util/mute-logger';
import { mockDestinationsEnv, unmockDestinationsEnv } from '../test-util/request-mocker';

const environmentDestination = {
  name: 'FINAL-DESTINATION',
  url: 'https://mys4hana.com',
  username: 'myuser',
  password: 'mypw'
};

const destinationFromEnv: Destination = {
  authTokens: [],
  authentication: 'BasicAuthentication',
  name: 'FINAL-DESTINATION',
  isTrustingAllCertificates: false,
  originalProperties: {
    name: 'FINAL-DESTINATION',
    url: 'https://mys4hana.com',
    username: 'myuser',
    password: 'mypw'
  },
  password: 'mypw',
  username: 'myuser',
  url: 'https://mys4hana.com'
};

const environmentDestinationConfig = {
  Name: 'TESTINATION',
  URL: 'https://mys4hana.com'
};

const destinationFromConfigEnv: Destination = {
  authTokens: [],
  authentication: 'NoAuthentication',
  name: 'TESTINATION',
  isTrustingAllCertificates: false,
  originalProperties: {
    Name: 'TESTINATION',
    URL: 'https://mys4hana.com'
  },
  url: 'https://mys4hana.com'
};

describe('env-destination-accessor', () => {
  beforeAll(() => {
    muteLoggers('env-destination-accessor', 'proxy-util');
  });

  afterEach(() => {
    unmockDestinationsEnv();
    jest.resetAllMocks();
  });

  describe('getDestinationsFromEnv()', () => {
    it('should return all destinations from environment variables', () => {
      mockDestinationsEnv(environmentDestination, environmentDestinationConfig);

      const expected = [destinationFromEnv, destinationFromConfigEnv];
      const actual = getDestinationsFromEnv();
      expected.forEach((e, index) => {
        expect(actual[index]).toMatchObject(e);
      });
    });

    it('should return an empty array if no destinations can be found', () => {
      assert.deepEqual([], getDestinationsFromEnv());
    });

    it('should log a warning when destinations exist but do not contain a `name` or `Name` key', () => {
      const destinationMissingName = { url: 'example.com' };
      mockDestinationsEnv(environmentDestination, destinationMissingName);
      const logger = createLogger('env-destination-accessor');
      const warnSpy = jest.spyOn(logger, 'warn');

      getDestinationsFromEnv();
      expect(warnSpy).toBeCalledWith(expect.stringMatching("Destination from 'destinations' env variable is missing 'name' or 'Name' property."));
    });
  });

  describe('getDestinationByName()', () => {
    it('should return a destination for a name', () => {
      mockDestinationsEnv(environmentDestination);

      const actual = getDestinationByName('FINAL-DESTINATION');
      expect(actual).toMatchObject(destinationFromEnv);
    });

    it('should return a destination for a name, that is given as a destination configuration', () => {
      mockDestinationsEnv(environmentDestinationConfig);

      const actual = getDestinationByName('TESTINATION');
      expect(actual).toMatchObject(destinationFromConfigEnv);
    });

    it('should return null when no destination can be found', () => {
      const expected = null;
      const actual = getDestinationByName('FINAL-DESTINATION');

      assert.equal(actual, expected, 'Expected null, but got something.');
    });

    it('should log a warning when there are multiple destinations for the given name', () => {
      mockDestinationsEnv(environmentDestination, { Name: 'FINAL-DESTINATION', URL: 'example.com' });

      const logger = createLogger('env-destination-accessor');
      const warnSpy = jest.spyOn(logger, 'warn');

      getDestinationByName('FINAL-DESTINATION');
      expect(warnSpy).toBeCalledWith(
        "The 'destinations' env variable contains multiple destinations with the name 'FINAL-DESTINATION'. Only the first entry will be respected."
      );
    });
  });
});
