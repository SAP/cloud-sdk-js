/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Destination } from '@sap-cloud-sdk/core';
import { unlinkSync, writeFileSync } from 'fs';
import {
  mockAllTestDestinations,
  mockTestDestination,
  setTestDestination,
  unmockAllTestDestinations,
  unmockTestDestination
} from '../src/test-destination-mocker';
import { credentials, systems } from './test-util/test-destinations';

describe('setTestDestinationInEnv', () => {
  let envDestination: Destination = { url: 'https://example.com', name: 'envDestination' };
  beforeAll(() => {
    writeFileSync('./systems.json', JSON.stringify(systems));
    writeFileSync('./credentials.json', JSON.stringify(credentials));
  });

  afterAll(() => {
    unlinkSync('./systems.json');
    unlinkSync('./credentials.json');
  });

  afterEach(() => {
    delete process.env['destinations'];
  });

  it('provided test destinations should be parsed in environment variables', () => {
    process.env['destinations'] = JSON.stringify([envDestination]);
    mockAllTestDestinations();

    const actual = JSON.parse(process.env['destinations']!);

    const expected = [
      envDestination,
      { name: 'SYS_001', url: 'https://example.com', username: 'username', password: 'password', isTestDestination: true },
      { name: 'SYS_002', url: 'https://example.com', sapClient: '002', isTestDestination: true }
    ];

    expect(actual).toEqual(expected);
  });

  it('setTestDestination should add mocked destination with isTestDestination flag', () => {
    process.env['destinations'] = JSON.stringify([envDestination]);

    setTestDestination({ name: 'MockedDestination', url: 'https://example.com' });
    const actual = JSON.parse(process.env['destinations']!);

    const expected = [envDestination, { name: 'MockedDestination', url: 'https://example.com', isTestDestination: true }];

    expect(actual).toEqual(expected);
  });

  it('all test destination should be removed after their insertion', () => {
    process.env['destinations'] = JSON.stringify([envDestination]);
    mockAllTestDestinations();
    // mock destinations inserted (see previous test)
    unmockAllTestDestinations();
    // all mock destinations should be removed

    const actual = JSON.parse(process.env['destinations']!);

    const expected = [envDestination];

    expect(actual).toEqual(expected);
  });

  it('insert uniquely one destination in environment variables destinations', () => {
    process.env['destinations'] = JSON.stringify([envDestination]);
    mockTestDestination('SYS_002');

    const actual = JSON.parse(process.env['destinations']!);

    const expected = [envDestination, { name: 'SYS_002', url: 'https://example.com', sapClient: '002', isTestDestination: true }];

    expect(actual).toEqual(expected);
  });

  it('unmock function should not remove non-mocked destination', () => {
    process.env['destinations'] = JSON.stringify([envDestination]);
    unmockTestDestination(envDestination.name!);

    const actual = JSON.parse(process.env['destinations']!);

    const expected = [envDestination];

    expect(actual).toEqual(expected);
  });

  it('the test destination should be removed after their insertion', () => {
    process.env['destinations'] = JSON.stringify([envDestination]);
    mockTestDestination('SYS_002');
    // mock destination 'SYS_002' inserted
    unmockTestDestination('SYS_002');
    // mocked destination should be removed

    const actual = JSON.parse(process.env['destinations']!);

    const expected = [envDestination];

    expect(actual).toEqual(expected);
  });

  it('should fail when mock a destination name already exists in destinations of environment variables', () => {
    envDestination = { url: 'UrlOfBookedDestinationName', name: 'SYS_001' };
    process.env['destinations'] = JSON.stringify([envDestination]);
    try {
      mockAllTestDestinations();
    } catch (error) {
      expect(error.message).toBe(
        'Parsing mocked destinations failed, destination with name "SYS_001" already exists in the "destinations" environment variables.'
      );
    }
  });
});
