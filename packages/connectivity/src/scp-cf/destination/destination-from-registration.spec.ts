import { X509Certificate } from 'node:crypto';
import { createLogger } from '@sap-cloud-sdk/util';
import mock from 'mock-fs';
import {
  mockServiceBindings,
  providerServiceToken,
  signedJwt,
  subscriberServiceToken,
  subscriberUserToken,
  unmockDestinationsEnv,
  xsuaaBindingMock
} from '../../../../../test-resources/test/test-util';
import { certAsString } from '../../../../../test-resources/test/test-util/test-certificate';
import {
  registerDestination,
  searchRegisteredDestination
} from './destination-from-registration';
import { registerDestinationCache } from './register-destination-cache';
import type { DestinationWithName } from './destination-from-registration';

const testDestination: DestinationWithName = {
  name: 'RegisteredDestination',
  url: 'https://example.com'
};

const testDestinationWithMtls: DestinationWithName = {
  name: 'RegisteredDestinationMtls',
  url: 'https://example.com'
};

const mailDestination: DestinationWithName = {
  name: 'RegisteredDestination',
  type: 'MAIL'
};

describe('register-destination', () => {
  describe('with XSUAA service binding', () => {
    beforeEach(() => {
      mockServiceBindings();
      mock({
        'cf-crypto': {
          'cf-cert': certAsString,
          'cf-key': 'my-key'
        }
      });
    });

    afterEach(() => {
      mock.restore();
    });

    afterAll(() => {
      delete process.env.VCAP_SERVICES;
    });

    afterEach(() => {
      registerDestinationCache.destination.clear();
      registerDestinationCache.mtls.clear();
      unmockDestinationsEnv();
      delete process.env.CF_INSTANCE_CERT;
      delete process.env.CF_INSTANCE_KEY;
    });

    it('registers HTTP destination and retrieves it', async () => {
      await registerDestination(testDestination);
      const actual = await searchRegisteredDestination({
        destinationName: testDestination.name
      });
      expect(actual).toEqual(testDestination);
    });

    it('registers HTTP destination with mTLS and retrieves it', async () => {
      const options = {
        inferMtls: true
      };
      await registerDestination(testDestinationWithMtls, options);
      const actual = await searchRegisteredDestination({
        destinationName: testDestinationWithMtls.name
      });
      expect(actual?.mtls).toStrictEqual(true);
    });

    it('registers with mTLS and contains mtls options in cache', async () => {
      process.env.CF_INSTANCE_CERT = 'cf-crypto/cf-cert';
      process.env.CF_INSTANCE_KEY = 'cf-crypto/cf-key';
      const currentTimeInMs = Date.now();
      const validCertTime = currentTimeInMs + 10000;
      jest
        .spyOn(X509Certificate.prototype, 'validTo', 'get')
        .mockImplementation(() => validCertTime.toString());
      const options = {
        inferMtls: true,
        useMtlsCache: true
      };

      await registerDestination(testDestinationWithMtls, options);

      const actualDestination = await searchRegisteredDestination({
        destinationName: testDestinationWithMtls.name
      });
      const actualCert = (
        await registerDestinationCache.mtls.retrieveMtlsOptionsFromCache()
      )?.cert;

      expect(actualDestination?.mtls).toStrictEqual(true);
      expect(registerDestinationCache.mtls.useMtlsCache).toStrictEqual(true);
      expect(actualCert).toEqual(certAsString);
    });

    it('registers mail destination and retrieves it', async () => {
      await registerDestination(mailDestination);
      const actual = await searchRegisteredDestination({
        destinationName: mailDestination.name
      });
      expect(actual).toEqual(mailDestination);
    });

    it('registers destination and retrieves it with JWT', async () => {
      await registerDestination(testDestination, { jwt: providerServiceToken });
      const actual = await searchRegisteredDestination({
        destinationName: testDestination.name,
        jwt: providerServiceToken
      });
      expect(actual).toEqual(testDestination);
    });

    it('returns undefined if destination key is not found', async () => {
      const actual = await searchRegisteredDestination({
        destinationName: 'Non-existing-destination'
      });
      expect(actual).toBeNull();
    });

    it('caches with tenant-isolation if no JWT is given', async () => {
      await registerDestination(testDestination);
      await expect(
        registerDestinationCache.destination
          .getCacheInstance()
          .hasKey(
            `${xsuaaBindingMock.credentials.subaccountid}::RegisteredDestination`
          )
      ).resolves.toBe(true);
    });

    it('caches with tenant isolation if JWT does not contain user-id', async () => {
      await registerDestination(testDestination, {
        jwt: subscriberServiceToken
      });
      await expect(
        registerDestinationCache.destination
          .getCacheInstance()
          .hasKey('subscriber::RegisteredDestination')
      ).resolves.toBe(true);
    });

    it('caches with tenant-user-isolation if JWT is given', async () => {
      await registerDestination(testDestination, { jwt: subscriberUserToken });
      await expect(
        registerDestinationCache.destination
          .getCacheInstance()
          .hasKey('user-sub:subscriber:RegisteredDestination')
      ).resolves.toBe(true);
    });

    it('cache if tenant if you want', async () => {
      await registerDestination(testDestination, {
        jwt: subscriberUserToken,
        isolationStrategy: 'tenant'
      });
      await expect(
        registerDestinationCache.destination
          .getCacheInstance()
          .hasKey('subscriber::RegisteredDestination')
      ).resolves.toBe(true);
    });

    it('caches with unlimited time', async () => {
      jest.useFakeTimers();
      registerDestination(testDestination);
      const minutesToExpire = 9999;
      // Shift time to expire the set item
      jest.advanceTimersByTime(60000 * minutesToExpire);
      const actual = await searchRegisteredDestination({
        destinationName: testDestination.name
      });
      expect(actual).toEqual(testDestination);
    });

    it('adds proxy to registered destination', async () => {
      process.env['https_proxy'] = 'some.http.com';
      registerDestination(testDestination);
      const actual = await searchRegisteredDestination({
        destinationName: testDestination.name
      });
      expect(actual?.proxyConfiguration?.host).toEqual('some.http.com');
      delete process.env['https_proxy'];
    });

    it('sets forwarded auth token if needed', async () => {
      const destinationName = 'FORWARD';
      const jwt = signedJwt({});
      registerDestination({ name: destinationName, forwardAuthToken: true });

      const destination = await searchRegisteredDestination({
        destinationName,
        jwt
      });
      expect(destination?.authTokens?.[0]).toMatchObject({ value: jwt });
    });

    it('infos if registered destination is retrieved.', async () => {
      registerDestination(testDestination);

      const logger = createLogger('register-destination');
      const infoSpy = jest.spyOn(logger, 'info');
      await searchRegisteredDestination({
        destinationName: testDestination.name
      });
      expect(infoSpy).toHaveBeenCalledWith(
        expect.stringMatching(
          /Successfully retrieved destination '\w+' from registered destinations./
        )
      );
    });
  });

  describe('without XSUAA binding', () => {
    afterEach(async () => {
      await registerDestinationCache.destination.clear();
      await registerDestinationCache.mtls.clear();
      unmockDestinationsEnv();
    });

    it('registers destination and retrieves it with JWT', async () => {
      await registerDestination(testDestination, { jwt: providerServiceToken });
      expect(
        await searchRegisteredDestination({
          destinationName: testDestination.name,
          jwt: providerServiceToken
        })
      ).toEqual(testDestination);
    });

    it('registers destination and retrieves it with IAS JWT', async () => {
      const iasJwt = signedJwt({ app_tid: 'test', iat: 123 });
      await registerDestination(testDestination, { jwt: iasJwt });
      expect(
        await searchRegisteredDestination({
          destinationName: testDestination.name,
          jwt: iasJwt
        })
      ).toEqual(testDestination);
    });

    it('throws an error if there is a JWT, but no tenant ID could be identified', async () => {
      const dummyTenantId = 'provider-tenant';

      expect(
        registerDestination(testDestination, { jwt: signedJwt({}) })
      ).rejects.toThrowErrorMatchingSnapshot();
      const registeredDestination = await registerDestinationCache.destination
        .getCacheInstance()
        .get(`${dummyTenantId}::${testDestination.name}`);

      expect(registeredDestination).toEqual(undefined);
    });

    it('registers destination with a dummy ID, if there is no JWT and no tenant ID can be identified', async () => {
      delete process.env.VCAP_SERVICES;
      const logger = createLogger('register-destination');
      jest.spyOn(logger, 'debug');

      const dummyTenantId = 'provider-tenant';

      await registerDestination(testDestination);
      const registeredDestination = await registerDestinationCache.destination
        .getCacheInstance()
        .get(`${dummyTenantId}::${testDestination.name}`);

      expect(registeredDestination).toEqual(testDestination);

      expect(logger.debug).toHaveBeenCalledWith(
        'Could not determine tenant from XSUAA, identity or destination service binding. Destination is registered without tenant information.'
      );
    });
  });
});
