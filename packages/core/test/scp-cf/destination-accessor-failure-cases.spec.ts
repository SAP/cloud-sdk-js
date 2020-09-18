/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock from 'nock';
import { clientCredentialsTokenCache, getDestination } from '../../src/scp-cf';
import {
  mockServiceBindings,
  mockXsuaaBinding
} from '../test-util/environment-mocks';
import {
  providerServiceToken,
  subscriberServiceToken,
  subscriberServiceTokenWithVerificationURL,
  subscriberUserJwt,
  userApprovedSubscriberServiceToken
} from '../test-util/mocked-access-tokens';
import {
  mockServiceToken,
  mockUserApprovedServiceToken
} from '../test-util/token-accessor-mocks';
import {
  mockInstanceDestinationsCall,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../test-util/destination-service-mocks';
import {
  basicMultipleResponse,
  destinationName,
  oauthMultipleResponse
} from '../test-util/example-destination-service-responses';

describe('Failure cases', () => {
  beforeEach(() => {
    clientCredentialsTokenCache.clear();
  });

  it('fails if no destination service is bound', async () => {
    process.env['VCAP_SERVICES'] = JSON.stringify({
      xsuaa: [mockXsuaaBinding]
    });

    await expect(
      getDestination(destinationName, {
        userJwt: subscriberServiceTokenWithVerificationURL,
        cacheVerificationKeys: false
      })
    ).rejects.toThrowErrorMatchingSnapshot();
  }, 50000);

  it('throws an error when the provide userJwt is invalid', async () => {
    mockServiceBindings();
    mockVerifyJwt();

    await expect(
      getDestination(destinationName, {
        userJwt: 'fails',
        cacheVerificationKeys: false
      })
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws an error if the subaccount/instance destinations call fails', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();

    const httpMocks = [
      mockInstanceDestinationsCall(
        nock,
        {
          ErrorMessage: 'Unable to parse the JWT in Authorization Header.'
        },
        400,
        subscriberServiceToken
      ),
      mockSubaccountDestinationsCall(
        nock,
        basicMultipleResponse,
        200,
        subscriberServiceToken
      )
    ];

    try {
      await getDestination(destinationName, {
        userJwt: subscriberServiceToken,
        enableCircuitBreaker: false,
        cacheVerificationKeys: false
      });
      fail();
    } catch (error) {
      expect(error.message).toContain('Failed to fetch instance destinations');
      expect(error.stack).toContain('status code 400');
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    }
  });

  it('returns an error if the single destination call fails for OAuth2SAMLBearerAssertion destinations', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    mockUserApprovedServiceToken();

    const httpMocks = [
      mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
      mockSubaccountDestinationsCall(
        nock,
        oauthMultipleResponse,
        200,
        subscriberServiceToken
      ),
      mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
      mockSubaccountDestinationsCall(nock, [], 200, providerServiceToken),
      mockSingleDestinationCall(
        nock,
        {
          ErrorMessage: 'Unable to parse the JWT in Authorization Header.'
        },
        401,
        destinationName,
        userApprovedSubscriberServiceToken
      )
    ];

    try {
      await getDestination(destinationName, {
        userJwt: subscriberUserJwt,
        enableCircuitBreaker: false,
        cacheVerificationKeys: false
      });
      fail();
    } catch (error) {
      expect(error instanceof Error).toBeTruthy();
      expect(error.message).toContain(
        'Failed to fetch destination FINAL-DESTINATION'
      );
      expect(error.stack).toContain('status code 401');
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    }
  });

  it('returns null if no destinations are found', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();

    const httpMocks = [
      mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
      mockSubaccountDestinationsCall(nock, [], 200, subscriberServiceToken),
      mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
      mockSubaccountDestinationsCall(nock, [], 200, providerServiceToken)
    ];

    const expected = null;
    const actual = await getDestination(destinationName, {
      userJwt: subscriberUserJwt,
      cacheVerificationKeys: false
    });
    expect(actual).toEqual(expected);
    httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
  });

  it('should throw an error when neither userJwt nor SystemUser are defined', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();

    const instanceDestinationCallMock = mockInstanceDestinationsCall(
      nock,
      oauthMultipleResponse,
      200,
      providerServiceToken
    );
    const subaccountDestinationCallMock = mockSubaccountDestinationsCall(
      nock,
      [],
      200,
      providerServiceToken
    );

    await expect(
      getDestination(destinationName, { cacheVerificationKeys: false })
    ).rejects.toThrowErrorMatchingSnapshot();
    expect(instanceDestinationCallMock.isDone()).toBe(true);
    expect(subaccountDestinationCallMock.isDone()).toBe(true);
  });
});
