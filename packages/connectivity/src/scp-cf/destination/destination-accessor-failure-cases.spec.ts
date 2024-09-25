import {
  mockServiceBindings,
  xsuaaBindingMock
} from '../../../../../test-resources/test/test-util/environment-mocks';
import {
  subscriberServiceToken,
  subscriberUserToken
} from '../../../../../test-resources/test/test-util/mocked-access-tokens';
import {
  mockJwtBearerToken,
  mockServiceToken
} from '../../../../../test-resources/test/test-util/token-accessor-mocks';
import {
  mockFetchDestinationCalls,
  mockFetchDestinationCallsNotFound,
  mockInstanceDestinationsCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../../../../../test-resources/test/test-util/destination-service-mocks';
import {
  basicMultipleResponse,
  destinationName,
  oauthMultipleResponse
} from '../../../../../test-resources/test/test-util/example-destination-service-responses';
import {
  getAllDestinationsFromDestinationService,
  getDestination
} from './destination-accessor';

describe('Failure cases', () => {
  it('fails if no destination service is bound', async () => {
    process.env['VCAP_SERVICES'] = JSON.stringify({
      xsuaa: [xsuaaBindingMock]
    });

    mockVerifyJwt();

    await expect(
      getDestination({
        destinationName,
        jwt: subscriberServiceToken,
        cacheVerificationKeys: false
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Could not find service binding of type \'destination\'."'
    );
  }, 50000);

  it('throws an error when the provide userJwt is invalid', async () => {
    mockServiceBindings();
    mockVerifyJwt();

    await expect(
      getDestination({
        destinationName,
        jwt: 'fails',
        cacheVerificationKeys: false
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"JwtError: The given jwt payload does not encode valid JSON."'
    );
  });

  it('throws an error if the subaccount/instance destinations call fails', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();

    const httpMocks = [
      mockInstanceDestinationsCall(
        {
          ErrorMessage: 'Unable to parse the JWT in Authorization Header.'
        },
        400,
        subscriberServiceToken
      ),
      mockSubaccountDestinationsCall(
        basicMultipleResponse,
        200,
        subscriberServiceToken
      )
    ];

    try {
      await getAllDestinationsFromDestinationService({
        jwt: subscriberServiceToken,
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
    mockJwtBearerToken();

    const httpMocks = mockFetchDestinationCalls(oauthMultipleResponse[0], {
      serviceToken: subscriberServiceToken,
      mockWithTokenRetrievalCall: {
        responseCode: 401,
        response: {
          ErrorMessage: 'Unable to parse the JWT in Authorization Header.'
        },
        headers: { 'x-user-token': subscriberUserToken }
      }
    });

    try {
      await getDestination({
        destinationName,
        jwt: subscriberUserToken,
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
      ...mockFetchDestinationCallsNotFound(destinationName),
      ...mockFetchDestinationCallsNotFound(destinationName, {
        serviceToken: subscriberServiceToken
      })
    ];

    expect(
      await getDestination({
        destinationName,
        jwt: subscriberUserToken,
        cacheVerificationKeys: false
      })
    ).toEqual(null);
    httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
  });

  it('should throw an error when neither userJwt nor SystemUser are defined', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();

    const [httpMock] = mockFetchDestinationCalls(oauthMultipleResponse[0], {
      mockWithTokenRetrievalCall: false
    });

    await expect(
      getDestination({
        destinationName,
        cacheVerificationKeys: false
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"No user token (JWT) has been provided. This is strictly necessary for \'OAuth2SAMLBearerAssertion\'."'
    );
    expect(httpMock.isDone()).toBe(true);
  });
});
