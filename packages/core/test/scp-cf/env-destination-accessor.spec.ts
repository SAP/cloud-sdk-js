/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import * as assert from 'assert';
import { createLogger } from '@sap-cloud-sdk/util';
import { Destination } from '../../src/scp-cf/destination-service-types';
import { getDestinationByName, getDestinations } from '../../src/scp-cf/env-destination-accessor';

const environmentDestination = {
  name: 'FINAL_DESTINATION',
  url: 'https://mys4hana.com',
  username: 'myuser',
  password: 'mypw'
};

const destinationFromEnv: Destination = {
  authTokens: [],
  authentication: 'BasicAuthentication',
  name: 'FINAL_DESTINATION',
  isTrustingAllCertificates: false,
  originalProperties: {
    name: 'FINAL_DESTINATION',
    url: 'https://mys4hana.com',
    username: 'myuser',
    password: 'mypw'
  },
  password: 'mypw',
  username: 'myuser',
  url: 'https://mys4hana.com'
};

describe('getDestinations()', () => {
  afterEach(() => {
    delete process.env.destinations;
  });

  it('should return all destinations from environment variables', () => {
    process.env['destinations'] = `[${JSON.stringify(environmentDestination)}]`;

    const expected: Destination[] = [destinationFromEnv];
    const actual = getDestinations();
    expected.forEach((e, index) => {
      expect(actual[index]).toMatchObject(e);
    });
  });

  it('should return an empty array if no destinations can be found', () => {
    const expected = [];
    const actual = getDestinations();
    assert.deepEqual(expected, actual, 'No empty array was returned');
  });
});

describe('getDestinationByName()', () => {
  afterEach(() => {
    delete process.env.destinations;
  });

  it('should return the destination if a destination with the respective name is present in the environment variables', () => {
    process.env['destinations'] = `[${JSON.stringify(environmentDestination)}]`;

    const expected: Destination = destinationFromEnv;
    const actual = getDestinationByName('FINAL_DESTINATION');
    expect(actual).toMatchObject(expected);
  });

  it('should return null when no destination can be found', () => {
    const expected = null;
    const actual = getDestinationByName('FINAL_DESTINATION');

    assert.equal(actual, expected, 'Expected null, but got something.');
  });

  it('should throw an error when multiple destinations with the same name are found', () => {
    process.env['destinations'] = `[${JSON.stringify(environmentDestination)},${JSON.stringify(environmentDestination)}]`;

    expect(() => getDestinationByName('FINAL_DESTINATION')).toThrowErrorMatchingSnapshot();
  });

  it('should log a warning when destinations exist but do not contain a `name` key', () => {
    const destinationMissingName = { url: 'example.com' };
    process.env['destinations'] = `[${JSON.stringify(environmentDestination)},${JSON.stringify(destinationMissingName)}]`;
    const logger = createLogger('env-destination-accessor');
    const warnSpy = jest.spyOn(logger, 'warn');

    getDestinationByName('FINAL_DESTINATION');
    expect(warnSpy).toBeCalledWith(
      expect.stringMatching("Destination from 'destinations' env variable is missing 'name' property. Make sure it exists:")
    );
  });

  it('should log a warning when destinations exist but do not contain a `url` key', () => {
    const destinationMissingUrl = { name: 'TESTINATION' };
    process.env['destinations'] = `[${JSON.stringify(environmentDestination)},${JSON.stringify(destinationMissingUrl)}]`;
    const logger = createLogger('env-destination-accessor');
    const warnSpy = jest.spyOn(logger, 'warn');

    getDestinationByName('TESTINATION');
    expect(warnSpy).toBeCalledWith(
      expect.stringMatching("Destination from 'destinations' env variable is missing 'url' property. Make sure it exists:")
    );
  });
});
