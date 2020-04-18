/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger } from '@sap-cloud-sdk/util';
import { getCsrfHeaders } from '../../../src/request-builder/header-builder';
import { createCreateRequest } from '../../test-util/create-requests';
import { muteLoggers } from '../../test-util/mute-logger';
import {
  defaultBasicCredentials,
  defaultDestination,
  mockHeaderRequest
} from '../../test-util/request-mocker';

const standardHeaders = {
  Accept: 'application/json',
  authorization: defaultBasicCredentials,
  'Content-Type': 'application/json'
};

describe('csrf-headers', () => {
  beforeAll(() => {
    muteLoggers('http-agent', 'csrf-headers');
  });

  const logger = createLogger('csrf-headers');

  it('should build "cookie" and "x-csrf-token" properties.', async () => {
    const request = createCreateRequest(defaultDestination);
    const mockedHeaders = {
      'x-csrf-token': 'mocked-x-csrf-token',
      'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
    };

    mockHeaderRequest({ request });

    const expected = {
      cookie: 'mocked-cookie-0;mocked-cookie-2',
      'x-csrf-token': mockedHeaders['x-csrf-token']
    };
    const headers = await getCsrfHeaders(request, standardHeaders);
    expect(headers).toEqual(expected);
  });

  it('"x-csrf-token" should not be defined in header when not defined in CSRF headers response.', async () => {
    const request = createCreateRequest(defaultDestination);
    const warnSpy = jest.spyOn(logger, 'warn');

    mockHeaderRequest({
      request,
      responseHeaders: {
        'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
      }
    });

    const actual = await getCsrfHeaders(request, standardHeaders);

    expect('x-csrf-token' in actual).toBeFalsy();
    expect(warnSpy).toBeCalledWith(
      'Destination did not return a CSRF token. This may cause a failure when sending the OData request.'
    );
  });

  it('"cookie" should not be defined in header when not defined in CSRF headers response.', async () => {
    const request = createCreateRequest(defaultDestination);
    const warnSpy = jest.spyOn(logger, 'warn');

    mockHeaderRequest({
      request,
      responseHeaders: { 'x-csrf-token': 'mocked-x-csrf-token' }
    });

    const actual = await getCsrfHeaders(request, standardHeaders);

    expect('cookie' in actual).toBeFalsy();
    expect(warnSpy).toBeCalledWith(
      'CSRF header response does not include cookies.'
    );
  });
});
