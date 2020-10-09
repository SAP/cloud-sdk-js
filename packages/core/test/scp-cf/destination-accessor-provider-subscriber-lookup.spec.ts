import nock from 'nock';
import {
  alwaysProvider,
  alwaysSubscriber,
  Destination,
  DestinationConfiguration,
  DestinationOptions,
  DestinationSelectionStrategy,
  getDestination,
  subscriberFirst
} from '../../src/scp-cf';
import {
  mockInstanceDestinationsCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../test-util/destination-service-mocks';
import {
  providerServiceToken,
  providerUserJwt,
  subscriberServiceToken,
  subscriberUserJwt
} from '../test-util/mocked-access-tokens';
import { mockServiceBindings } from '../test-util/environment-mocks';
import { mockServiceToken } from '../test-util/token-accessor-mocks';
import * as destinationService from '../../src/scp-cf/destination-service';

describe('jwtType x selection strategy combinations. Possible values are {subscriberUserToken,providerUserToken,noUser} and {alwaysSubscriber, alwaysProvider, subscriberFirst}', () => {
  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks(); // clears alls spyes
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

  // The same destination name is used for provider and subscriber but the URL is different to distinguish which destination was fetched in the end.
  function mockProviderAndSubscriber(
    subscriberEmpty: boolean,
    providerEmpty: boolean
  ): mocks {
    return {
      subscriberMocks: mockSubscriber(subscriberEmpty),
      providerMocks: mockProvider(providerEmpty)
    };
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

  describe('Combinations: subscriberUserToken x {alwaysSubscriber,alwaysProvider,subscriberFirst}', () => {
    it('subscriberUserToken && alwaysSubscriberToken: should not send a request to retrieve remote provider destination and return subscriber destination.', async () => {
      const mocks = mockThingsForCombinations();

      const actual = await fetchDestination(
        subscriberUserJwt,
        alwaysSubscriber
      );
      expect(actual!.url).toBe(subscriberDestination.URL);

      mocks.subscriberMocks.forEach(mock => expect(mock.isDone()).toBe(true));
      mocks.providerMocks.forEach(mock => expect(mock.isDone()).toBe(false));
    });

    it('subscriberUserToken && alwaysProvider: should not sed a request to retrieve remote subscriber destination and return provider destination', async () => {
      const mocks = mockThingsForCombinations();

      const actual = await fetchDestination(subscriberUserJwt, alwaysProvider);
      assertSubscriberNotCalledAndProviderFound(mocks, actual!);
    });

    it('subscriberUserToken && subscriberFirst: should try subscriber first (found something), provider not called and return subscriber destination', async () => {
      mockThingsForCombinations();

      const requestSpy = jest.spyOn(
        destinationService,
        'fetchSubaccountDestinations'
      );
      const actual = await fetchDestination(subscriberUserJwt, subscriberFirst);
      expect(requestSpy).toHaveBeenCalledTimes(1);
      expect(requestSpy).toHaveBeenNthCalledWith(
        1,
        'https://destination.example.com',
        subscriberServiceToken,
        expect.anything()
      );
      expect(actual!.url).toBe(subscriberDestination.URL);
    });

    it('subscriberUserToken && subscriberFirst: should try subscriber first (found nothing), provider called and return provider destination', async () => {
      mockThingsForCombinations(true, false);

      const requestSpy = jest.spyOn(
        destinationService,
        'fetchSubaccountDestinations'
      );
      const actual = await fetchDestination(subscriberUserJwt, subscriberFirst);
      expect(requestSpy).toHaveBeenCalledTimes(2);
      expect(requestSpy).toHaveBeenNthCalledWith(
        1,
        'https://destination.example.com',
        subscriberServiceToken,
        expect.anything()
      );
      expect(requestSpy).toHaveBeenNthCalledWith(
        2,
        'https://destination.example.com',
        providerServiceToken,
        expect.anything()
      );
      expect(actual!.url).toBe(providerDestination.URL);
    });
  });

  describe('providerUserToken x {alwaysSubscriber,alwaysProvider,subscriberFirst}', () => {
    it('providerUserToken && alwaysSubscriber: should return null since the token does not match subscriber', async () => {
      const mocks = mockThingsForCombinations();

      const actual = await fetchDestination(providerUserJwt, alwaysSubscriber);
      assertNothingCalledAndNullFound(mocks, actual);
    });

    it('providerUserToken && alwaysProvider: should not send a request to retrieve remote subscriber destination and return provider destination.', async () => {
      const mocks = mockThingsForCombinations();

      const actual = await fetchDestination(providerUserJwt, alwaysProvider);
      assertSubscriberNotCalledAndProviderFound(mocks, actual!);
    });

    it('providerUserToken && subscriberFirst: should not sed a request to retrieve remote subscriber destination and return provider destination.', async () => {
      const mocks = mockThingsForCombinations();

      const actual = await fetchDestination(providerUserJwt, subscriberFirst);
      assertSubscriberNotCalledAndProviderFound(mocks, actual!);
    });
  });

  describe('no UserToken x {alwaysSubscriber,alwaysProvider,subscriberFirst}', () => {
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
