import nock from 'nock';
import {
  mockServiceBindings,
  xsuaaBindingMock
} from '../../../../core/test/test-util/environment-mocks';
import {
  providerServiceToken,
  subscriberJwtBearerToken,
  subscriberServiceToken,
  subscriberServiceTokenWithVerificationURL,
  subscriberUserJwt
} from '../../../../core/test/test-util/mocked-access-tokens';
import {
  mockJwtBearerToken,
  mockServiceToken
} from '../../../../core/test/test-util/token-accessor-mocks';
import {
  mockInstanceDestinationsCall,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../../../../core/test/test-util/destination-service-mocks';
import {
  basicMultipleResponse,
  destinationName,
  oauthMultipleResponse
} from '../../../../core/test/test-util/example-destination-service-responses';
import { clientCredentialsTokenCache } from '../client-credentials-token-cache';
import * as jwt from '../jwt';
import { getDestination } from './destination-accessor';

const { wrapJwtInHeader } = jwt;

describe('Failure cases', () => {
  beforeEach(() => {
    clientCredentialsTokenCache.clear();
  });

  it('fails if no destination service is bound', async () => {
    process.env['VCAP_SERVICES'] = JSON.stringify({
      xsuaa: [xsuaaBindingMock]
    });

    jest
      .spyOn(jwt, 'verifyJwt')
      .mockResolvedValue(
        jwt.decodeJwt(subscriberServiceTokenWithVerificationURL)
      );

    await expect(
      getDestination({
        destinationName,
        userJwt: subscriberServiceTokenWithVerificationURL,
        cacheVerificationKeys: false,
        iasToXsuaaTokenExchange: false
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Unable to get access token for \\"destination\\" service. No service instance of type \\"destination\\" found."'
    );
  }, 50000);

  it('throws an error when the provide userJwt is invalid', async () => {
    mockServiceBindings();
    mockVerifyJwt();

    await expect(
      getDestination({
        destinationName,
        userJwt: 'fails',
        cacheVerificationKeys: false,
        iasToXsuaaTokenExchange: false
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
      await getDestination({
        destinationName,
        userJwt: subscriberServiceToken,
        enableCircuitBreaker: false,
        cacheVerificationKeys: false,
        iasToXsuaaTokenExchange: false
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

    const httpMocks = [
      mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
      mockSubaccountDestinationsCall(
        nock,
        oauthMultipleResponse,
        200,
        subscriberServiceToken
      ),
      mockSingleDestinationCall(
        nock,
        {
          ErrorMessage: 'Unable to parse the JWT in Authorization Header.'
        },
        401,
        destinationName,
        wrapJwtInHeader(subscriberJwtBearerToken).headers
      )
    ];

    try {
      await getDestination({
        destinationName,
        userJwt: subscriberUserJwt,
        enableCircuitBreaker: false,
        cacheVerificationKeys: false,
        iasToXsuaaTokenExchange: false
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
    const actual = await getDestination({
      destinationName,
      userJwt: subscriberUserJwt,
      cacheVerificationKeys: false,
      iasToXsuaaTokenExchange: false
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
      getDestination({
        destinationName,
        cacheVerificationKeys: false,
        iasToXsuaaTokenExchange: false
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"No user token (JWT) has been provided. This is strictly necessary for principal propagation."'
    );
    expect(instanceDestinationCallMock.isDone()).toBe(true);
    expect(subaccountDestinationCallMock.isDone()).toBe(true);
  });
});
