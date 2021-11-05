import nock from 'nock';
import { createLogger } from '@sap-cloud-sdk/util';
import {
  mockInstanceDestinationsCall,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../../../../test/test-util/destination-service-mocks';
import {
  onlyIssuerServiceToken,
  providerServiceToken,
  subscriberServiceToken,
  subscriberUserJwt
} from '../../../../test/test-util/mocked-access-tokens';
import {
  mockServiceBindings,
  onlyIssuerXsuaaUrl
} from '../../../../test/test-util/environment-mocks';
import { mockServiceToken } from '../../../../test/test-util/token-accessor-mocks';
import {
  basicMultipleResponse,
  certificateMultipleResponse,
  certificateSingleResponse,
  destinationName
} from '../../../../test/test-util/example-destination-service-responses';
import { wrapJwtInHeader } from '../jwt';
import { DestinationConfiguration, parseDestination } from './destination';
import {
  alwaysProvider,
  alwaysSubscriber,
  DestinationSelectionStrategy,
  subscriberFirst
} from './destination-selection-strategies';
import { Destination } from './destination-service-types';
import { DestinationOptions, getDestination } from './destination-accessor';
import { getDestinationFromDestinationService } from './destination-from-service';

describe('jwtType x selection strategy combinations. Possible values are {subscriberUserToken,providerUserToken,noUser} and {alwaysSubscriber, alwaysProvider, subscriberFirst}', () => {
  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  const destName = 'DESTINATION';

  const providerDestination: DestinationConfiguration = {
    Name: destName,
    Type: 'HTTP',
    URL: 'http://provider.com'
  };

  const subscriberDestination: DestinationConfiguration = {
    Name: destName,
    Type: 'HTTP',
    URL: 'http://subscriber.com'
  };

  function mockProvider(returnEmpty: boolean): nock.Scope[] {
    return [
      mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
      mockSubaccountDestinationsCall(
        nock,
        returnEmpty ? [] : [providerDestination],
        200,
        providerServiceToken
      )
    ];
  }

  function mockSubscriber(returnEmpty: boolean): nock.Scope[] {
    return [
      mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
      mockSubaccountDestinationsCall(
        nock,
        returnEmpty ? [] : [subscriberDestination],
        200,
        subscriberServiceToken
      )
    ];
  }
  interface mocks {
    subscriberMocks: nock.Scope[];
    providerMocks: nock.Scope[];
  }

  async function fetchDestination(
    userJwt: string | undefined,
    selectionStrategy: DestinationSelectionStrategy
  ): Promise<Destination | null> {
    let options: DestinationOptions = {
      selectionStrategy,
      cacheVerificationKeys: false
    };
    options = userJwt ? { ...options, userJwt } : options;
    return getDestination(destName, options);
  }

  function mockThingsForCombinations(
    subscriberEmpty = false,
    providerEmpty = false
  ): mocks {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    return {
      subscriberMocks: mockSubscriber(subscriberEmpty),
      providerMocks: mockProvider(providerEmpty)
    };
  }

  function assertSubscriberNotCalledAndProviderFound(
    mocks: mocks,
    destination: Destination
  ) {
    mocks.subscriberMocks.forEach(mock => expect(mock.isDone()).toBe(false));
    mocks.providerMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    expect(destination.url).toBe(providerDestination.URL);
  }

  function assertNothingCalledAndNullFound(
    mocks: mocks,
    destination: Destination | null
  ) {
    mocks.subscriberMocks.forEach(mock => expect(mock.isDone()).toBe(false));
    mocks.providerMocks.forEach(mock => expect(mock.isDone()).toBe(false));
    expect(destination).toBe(null);
  }

  describe('userToken x {alwaysSubscriber,alwaysProvider,subscriberFirst}', () => {
    it('alwaysSubscriber does not call provider', async () => {
      const mocks = mockThingsForCombinations();

      const destination = await fetchDestination(
        subscriberUserJwt,
        alwaysSubscriber
      );

      mocks.subscriberMocks.forEach(mock => expect(mock.isDone()).toBe(true));
      mocks.providerMocks.forEach(mock => expect(mock.isDone()).toBe(false));
      expect(destination!.url).toBe(subscriberDestination.URL);
    });

    it('alwaysPovider does not call subscriber', async () => {
      const mocks = mockThingsForCombinations();

      const destination = await fetchDestination(
        subscriberUserJwt,
        alwaysProvider
      );

      mocks.subscriberMocks.forEach(mock => expect(mock.isDone()).toBe(false));
      mocks.providerMocks.forEach(mock => expect(mock.isDone()).toBe(true));
      expect(destination!.url).toBe(providerDestination.URL);
    });

    it('subscriberFirst does not call provider if subscriber is found', async () => {
      const mocks = mockThingsForCombinations();

      const destination = await fetchDestination(
        subscriberUserJwt,
        subscriberFirst
      );

      mocks.subscriberMocks.forEach(mock => expect(mock.isDone()).toBe(true));
      mocks.providerMocks.forEach(mock => expect(mock.isDone()).toBe(false));
      expect(destination!.url).toBe(subscriberDestination.URL);
    });
  });

  describe('no UserToken x {alwaysSubscriber,alwaysProvider,subscriberFirst}', () => {
    it('retrieves destination without specifying userJwt', async () => {
      mockServiceBindings();
      mockServiceToken();

      mockInstanceDestinationsCall(nock, [], 200, providerServiceToken);
      mockSubaccountDestinationsCall(
        nock,
        basicMultipleResponse,
        200,
        providerServiceToken
      );

      const actual = await getDestination(destinationName, {
        cacheVerificationKeys: false
      });
      const expected = parseDestination(basicMultipleResponse[0]);
      expect(actual).toMatchObject(expected);
    });

    it('it warns if you use iss property and user jwt', async () => {
      mockServiceBindings();
      const logger = createLogger({
        package: 'core',
        messageContext: 'destination-accessor-service'
      });
      const warnSpy = jest.spyOn(logger, 'warn');
      await expect(
        getDestinationFromDestinationService('someDest', {
          userJwt: 'someJwt',
          iss: 'someIss'
        })
      ).rejects.toThrowError(
        'The given jwt payload does not encode valid JSON.'
      );
      expect(warnSpy).toHaveBeenCalledWith(
        'You have provided the `userJwt` and `iss` options to fetch the destination. This is most likely unintentional. Ignoring `iss`.'
      );
    });

    it('is possible to get a non-principal propagation destination by only providing the subdomain (iss) instead of the whole jwt', async () => {
      mockServiceBindings();
      mockServiceToken();

      mockInstanceDestinationsCall(nock, [], 200, onlyIssuerServiceToken);
      mockSubaccountDestinationsCall(
        nock,
        certificateMultipleResponse,
        200,
        onlyIssuerServiceToken
      );

      mockSingleDestinationCall(
        nock,
        certificateSingleResponse,
        200,
        'ERNIE-UND-CERT',
        wrapJwtInHeader(onlyIssuerServiceToken).headers
      );

      const logger = createLogger({
        package: 'core',
        messageContext: 'destination-accessor-service'
      });
      const infoSpy = jest.spyOn(logger, 'info');
      const expected = parseDestination(certificateSingleResponse);
      const actual = await getDestinationFromDestinationService(
        'ERNIE-UND-CERT',
        {
          iss: onlyIssuerXsuaaUrl,
          cacheVerificationKeys: false
        }
      );
      expect(actual).toMatchObject(expected);
      expect(infoSpy).toHaveBeenCalledWith(
        'Using `iss` option to fetch a destination instead of a full JWT. No validation is performed.'
      );
    });

    it('noUserToken && alwaysSubscriber: should return null since the token does not match subscriber', async () => {
      const mocks = mockThingsForCombinations();

      const actual = await fetchDestination(undefined, alwaysSubscriber);
      assertNothingCalledAndNullFound(mocks, actual);
    });

    it('noUserToken && alwaysProvider: should not sed a request to retrieve remote subscriber destination and return provider destination.', async () => {
      const mocks = mockThingsForCombinations();

      const actual = await fetchDestination(undefined, alwaysProvider);
      assertSubscriberNotCalledAndProviderFound(mocks, actual!);
    });

    it('noUserToken && subscriberFirst: should not sed a request to retrieve remote subscriber destination and return provider destination.', async () => {
      const mocks = mockThingsForCombinations();

      const actual = await fetchDestination(undefined, subscriberFirst);
      assertSubscriberNotCalledAndProviderFound(mocks, actual!);
    });
  });
});
