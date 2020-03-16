/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import * as assert from 'assert';
import { Destination } from '../../src/scp-cf/destination-service-types';
import { getDestinationByName, getDestinations } from '../../src/scp-cf/env-destination-accessor';

const environmentDestination = {
  name: 'ErpQueryEndpoint',
  url: 'https://mys4hana.com',
  username: 'myuser',
  password: 'mypw'
};

const destinationFromEnv: Destination = {
  authTokens: [],
  authentication: 'BasicAuthentication',
  name: 'ErpQueryEndpoint',
  isTrustingAllCertificates: false,
  originalProperties: {
    name: 'ErpQueryEndpoint',
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
    // Setup
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
    // Setup
    process.env['destinations'] = `[${JSON.stringify(environmentDestination)}]`;

    const expected: Destination = destinationFromEnv;
    const actual = getDestinationByName('ErpQueryEndpoint');
    expect(actual).toMatchObject(expected);
  });

  it('should return null when no destination can be found', () => {
    const expected = null;
    const actual = getDestinationByName('ErpQueryEndpoint');

    assert.equal(actual, expected, 'Expected null, but got something.');
  });

  it('should throw an error when multiple destinations with the same name are found', () => {
    process.env['destinations'] = `[${JSON.stringify(environmentDestination)},${JSON.stringify(environmentDestination)}]`;

    try {
      getDestinationByName('ErpQueryEndpoint');
    } catch (error) {
      assert.equal('There are multiple destinations with the name "ErpQueryEndpoint".', error.message, 'Did not get the expected error message.');
    }
  });
});
