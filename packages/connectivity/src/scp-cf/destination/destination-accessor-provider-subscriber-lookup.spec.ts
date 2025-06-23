import { createLogger } from '@sap-cloud-sdk/util';
import nock from 'nock';
import {
  mockFetchDestinationCalls,
  mockFetchDestinationCallsNotFound,
  mockInstanceDestinationsCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../../../../../test-resources/test/test-util/destination-service-mocks';
import {
  destinationServiceUri,
  onlyIssuerXsuaaUrl,
  mockServiceBindings
} from '../../../../../test-resources/test/test-util/environment-mocks';
import {
  basicMultipleResponse,
  certificateSingleResponse,
  destinationName,
  samlAssertionMultipleResponse,
  samlAssertionSingleResponse
} from '../../../../../test-resources/test/test-util/example-destination-service-responses';
import {
  onlyIssuerServiceToken,
  providerServiceToken,
  subscriberServiceToken,
  subscriberUserToken
} from '../../../../../test-resources/test/test-util/mocked-access-tokens';
import { mockServiceToken } from '../../../../../test-resources/test/test-util/token-accessor-mocks';
import * as identityService from '../identity-service';
import { decodeJwt } from '../jwt';
import { parseDestination } from './destination';
import {
  getAllDestinationsFromDestinationService,
  getDestination
} from './destination-accessor';
import { getDestinationFromDestinationService } from './destination-from-service';
import {
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst
} from './destination-selection-strategies';
import { destinationServiceCache } from './destination-service-cache';
import type {
  DestinationFetchOptions,
  DestinationWithoutToken
} from './destination-accessor-types';
import type { DestinationSelectionStrategy } from './destination-selection-strategies';
import type { DestinationConfiguration } from './destination';
import type { AxiosError } from 'axios';
import type { ErrorWithCause } from '@sap-cloud-sdk/util';
import type { Destination } from './destination-service-types';

const destName = 'DESTINATION';

const providerDestination: DestinationConfiguration = {
  Name: destName,
  Type: 'HTTP',
  URL: 'http://provider.com'
};

const parsedProviderDestination: DestinationWithoutToken = {
  authentication: 'NoAuthentication',
  certificates: [],
  forwardAuthToken: false,
  isTrustingAllCertificates: false,
  name: 'DESTINATION',
  originalProperties: {
    Name: 'DESTINATION',
    Type: 'HTTP',
    URL: 'http://provider.com'
  },
  type: 'HTTP',
  url: 'http://provider.com'
};

const subscriberDestination: DestinationConfiguration = {
  Name: destName,
  Type: 'HTTP',
  URL: 'http://subscriber.com'
};

const parsedSubscriberDestination: DestinationWithoutToken = {
  authentication: 'NoAuthentication',
  certificates: [],
  forwardAuthToken: false,
  isTrustingAllCertificates: false,
  name: 'DESTINATION',
  originalProperties: {
    Name: 'DESTINATION',
    Type: 'HTTP',
    URL: 'http://subscriber.com'
  },
  type: 'HTTP',
  url: 'http://subscriber.com'
};

const mockedDestinationUrlSubaccountDestinations = `${destinationServiceUri}/destination-configuration/v1/subaccountDestinations`;
function mockGetAllProvider(returnEmpty = false): nock.Scope[] {
  return [
    mockInstanceDestinationsCall([], 200, providerServiceToken),
    mockSubaccountDestinationsCall(
      returnEmpty ? [] : [providerDestination],
      200,
      providerServiceToken
    )
  ];
}

function mockGetAllSubscriber(returnEmpty = false): nock.Scope[] {
  return [
    mockInstanceDestinationsCall([], 200, subscriberServiceToken),
    mockSubaccountDestinationsCall(
      returnEmpty ? [] : [subscriberDestination],
      200,
      subscriberServiceToken
    )
  ];
}

function mockGetAllInternalErrorSubscriber(): nock.Scope[] {
  return [
    mockInstanceDestinationsCall(
      'Internal Server Error',
      500,
      subscriberServiceToken
    ),
    mockSubaccountDestinationsCall(
      'Internal Server Error',
      500,
      subscriberServiceToken
    )
  ];
}

async function fetchDestination(
  jwt: string | undefined,
  selectionStrategy: DestinationSelectionStrategy
): Promise<Destination | null> {
  const options: DestinationFetchOptions = {
    destinationName: destName,
    selectionStrategy,
    cacheVerificationKeys: false,
    jwt,
    // Caching is explicitly disabled as tests for fetching a single destination don't test caching behaviour
    useCache: false
  };
  return getDestination(options);
}

function mockDestinationMetadataCalls() {
  return {
    providerMock: mockFetchDestinationCalls(providerDestination, {
      mockWithTokenRetrievalCall: false
    })[0],
    subscriberMock: mockFetchDestinationCalls(subscriberDestination, {
      serviceToken: subscriberServiceToken,
      mockWithTokenRetrievalCall: false
    })[0]
  };
}

function assertMockUsed(mock: nock.Scope, used: boolean) {
  expect(mock.isDone()).toBe(used);
}

describe('JWT type and selection strategies', () => {
  beforeEach(() => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  describe('user token', () => {
    it('alwaysSubscriber: should not send a request to retrieve remote provider destination and return subscriber destination.', async () => {
      const { subscriberMock, providerMock } = mockDestinationMetadataCalls();

      const destination = await fetchDestination(
        subscriberUserToken,
        alwaysSubscriber
      );

      expect(destination?.url).toBe(subscriberDestination.URL);
      assertMockUsed(subscriberMock, true);
      assertMockUsed(providerMock, false);
    });

    it('alwaysProvider: should not sed a request to retrieve remote subscriber destination and return provider destination', async () => {
      const { subscriberMock, providerMock } = mockDestinationMetadataCalls();

      const destination = await fetchDestination(
        subscriberUserToken,
        alwaysProvider
      );

      expect(destination?.url).toEqual(providerDestination.URL);
      assertMockUsed(subscriberMock, false);
      assertMockUsed(providerMock, true);
    });

    it('subscriberFirst: should try subscriber first (found something), provider not called and return subscriber destination', async () => {
      const { subscriberMock, providerMock } = mockDestinationMetadataCalls();

      const destination = await fetchDestination(
        subscriberUserToken,
        subscriberFirst
      );

      expect(destination?.url).toBe(subscriberDestination.URL);
      assertMockUsed(subscriberMock, true);
      assertMockUsed(providerMock, false);
    });

    it('subscriber user token && subscriberFirst: should try subscriber first (found nothing), provider called and return provider destination', async () => {
      const [subscriberMock] = mockFetchDestinationCalls(providerDestination);

      const [providerMock] = mockFetchDestinationCallsNotFound(
        subscriberDestination.Name!,
        { serviceToken: subscriberServiceToken }
      );

      const destination = await fetchDestination(
        subscriberUserToken,
        subscriberFirst
      );

      expect(destination?.url).toBe(providerDestination.URL);
      assertMockUsed(subscriberMock, true);
      assertMockUsed(providerMock, true);
    });
  });

  describe('no user token', () => {
    it('retrieves destination without specifying userJwt', async () => {
      mockServiceBindings();
      mockServiceToken();

      mockFetchDestinationCalls(basicMultipleResponse[0], {
        mockWithTokenRetrievalCall: false
      });

      expect(
        await getDestination({
          destinationName,
          cacheVerificationKeys: false
        })
      ).toMatchObject(parseDestination(basicMultipleResponse[0]));
    });

    it('when combining `iss` and `jwt` it should fetch service token with `iss` and set user token to `jwt`', async () => {
      mockServiceBindings();
      mockServiceToken();

      jest
        .spyOn(identityService, 'exchangeTokenToXsuaaToken')
        .mockImplementationOnce(() => Promise.resolve(subscriberUserToken));

      mockFetchDestinationCalls(samlAssertionMultipleResponse[0], {
        serviceToken: onlyIssuerServiceToken,
        mockWithTokenRetrievalCall: {
          headers: { 'x-user-token': subscriberUserToken }
        }
      });

      expect(
        await getDestinationFromDestinationService({
          destinationName: 'FINAL-DESTINATION',
          iss: onlyIssuerXsuaaUrl,
          jwt: subscriberUserToken,
          cacheVerificationKeys: false
        })
      ).toMatchObject(parseDestination(samlAssertionSingleResponse));
    });

    it('gets a non-principal propagation destination when providing `iss` and no JWT', async () => {
      mockServiceBindings();
      mockServiceToken();
      mockFetchDestinationCalls(certificateSingleResponse, {
        serviceToken: onlyIssuerServiceToken
      });

      const logger = createLogger({
        package: 'connectivity',
        messageContext: 'destination-accessor-service'
      });
      const debugSpy = jest.spyOn(logger, 'debug');

      expect(
        await getDestinationFromDestinationService({
          destinationName: 'ERNIE-UND-CERT',
          iss: onlyIssuerXsuaaUrl,
          cacheVerificationKeys: false
        })
      ).toMatchObject(parseDestination(certificateSingleResponse));

      expect(debugSpy).toHaveBeenCalledWith(
        'Using `iss` option instead of a full JWT to fetch a destination. No validation is performed.'
      );
    });

    it('alwaysSubscriber: should return null since the token does not match subscriber', async () => {
      const { subscriberMock, providerMock } = mockDestinationMetadataCalls();
      const destination = await fetchDestination(undefined, alwaysSubscriber);

      expect(destination).toBe(null);
      assertMockUsed(subscriberMock, false);
      assertMockUsed(providerMock, false);
    });

    it('alwaysProvider: should not send a request to retrieve remote subscriber destination and return provider destination.', async () => {
      const { subscriberMock, providerMock } = mockDestinationMetadataCalls();
      const destination = await fetchDestination(undefined, alwaysProvider);

      expect(destination?.url).toEqual(providerDestination.URL);
      assertMockUsed(subscriberMock, false);
      assertMockUsed(providerMock, true);
    });

    it('subscriberFirst: should not send a request to retrieve remote subscriber destination and return provider destination.', async () => {
      const { subscriberMock, providerMock } = mockDestinationMetadataCalls();
      const destination = await fetchDestination(undefined, subscriberFirst);

      expect(destination?.url).toEqual(providerDestination.URL);
      assertMockUsed(subscriberMock, false);
      assertMockUsed(providerMock, true);
    });
  });
});

describe('call getAllDestinations with and without subscriber token', () => {
  beforeEach(() => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    destinationServiceCache.clear();
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  it('should fetch and cache all subscriber destinations', async () => {
    const logger = createLogger({
      package: 'connectivity',
      messageContext: 'destination-accessor'
    });

    mockGetAllSubscriber();
    mockGetAllProvider();

    const debugSpy = jest.spyOn(logger, 'debug');

    const allDestinations = await getAllDestinationsFromDestinationService({
      jwt: subscriberUserToken
    });

    expect(allDestinations).toEqual([parsedSubscriberDestination]);
    expect(debugSpy).toHaveBeenCalledWith(
      'Retrieving all destinations for account: "subscriber" from destination service.'
    );
    expect(debugSpy).toHaveBeenCalledWith(
      'Retrieving subaccount destination: DESTINATION.\n'
    );
    expect(
      destinationServiceCache.retrieveDestinationsFromCache(
        mockedDestinationUrlSubaccountDestinations,
        decodeJwt(subscriberUserToken)
      )
    ).toEqual([parsedSubscriberDestination]);
  });

  it('should fetch all subscriber destinations without caching them', async () => {
    mockGetAllSubscriber();
    mockGetAllProvider();

    const allDestinations = await getAllDestinationsFromDestinationService({
      jwt: subscriberUserToken,
      useCache: false
    });

    expect(allDestinations).toEqual([parsedSubscriberDestination]);
    expect(
      destinationServiceCache.retrieveDestinationsFromCache(
        mockedDestinationUrlSubaccountDestinations,
        decodeJwt(subscriberUserToken)
      )
    ).toBeUndefined();
  });

  it('should fetch all provider destinations when called without passing a JWT', async () => {
    mockGetAllSubscriber();
    mockGetAllProvider();
    const allDestinations = await getAllDestinationsFromDestinationService();
    expect(allDestinations).toEqual([parsedProviderDestination]);
  });

  it('should return an empty array if no destination are present', async () => {
    mockGetAllSubscriber(true);
    mockGetAllProvider(true);

    const logger = createLogger({
      package: 'connectivity',
      messageContext: 'destination-accessor'
    });
    const debugSpy = jest.spyOn(logger, 'debug');

    const allDestinations = await getAllDestinationsFromDestinationService();
    expect(allDestinations).toEqual([]);
    expect(debugSpy).toHaveBeenCalledWith(
      "Didn't receive any destinations from destination service."
    );
  });

  it('should throw an error', async () => {
    mockGetAllInternalErrorSubscriber();

    await getAllDestinationsFromDestinationService({
      jwt: subscriberUserToken
    }).catch((error: ErrorWithCause) => {
      const errorStatus = (error.rootCause as AxiosError).response!.status;

      expect(errorStatus).toEqual(500);
      expect(error.message).toMatch('Failed to fetch instance destinations.');
    });
  });
});
