import { createLogger } from '@sap-cloud-sdk/util';
import { DestinationServiceCredentials } from './environment-accessor-types';
import {
  getDestinationBasicCredentials,
  getDestinationServiceCredentialsList,
  getDestinationServiceUri,
  getServiceList,
  getXsuaaServiceCredentials
} from './environment-accessor';

const logger = createLogger('environment-accessor');

const CLIENT_ID = 'sb-jwt-app';

const services = {
  destination: [
    {
      name: 'my-destination',
      plan: 'lite',
      label: 'destination',
      credentials: {
        clientid: 'sb-clone',
        clientsecret: 'jQZB..',
        uri: 'https://..'
      }
    }
  ],
  xsuaa: [
    {
      credentials: {
        clientid: CLIENT_ID,
        url: 'https://tenant-id.authentication.sap.hana.ondemand.com'
      },
      plan: 'application',
      label: 'xsuaa',
      name: 'my-xsuaa'
    }
  ]
};

describe('Environment Accessor', () => {
  describe('env', () => {
    let warnSpy: jest.SpyInstance;
    beforeEach(() => {
      process.env.VCAP_SERVICES = JSON.stringify(services);
      warnSpy = jest.spyOn(logger, 'warn');
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('check a non defined service in env variables', () => {
      const undefinedService = 'not_existing_variable';
      expect(getServiceList(undefinedService)).toEqual([]);
    });

    it('get a credentials list from "destination"', () => {
      const destinations = services.destination;
      const expected: Partial<DestinationServiceCredentials>[] = [];

      for (const dest of destinations) {
        expected.push(dest.credentials);
      }

      const actual = getDestinationServiceCredentialsList();
      expect(actual).toEqual(expected);
    });

    it('skips a service without credentials', () => {
      const expected = [];
      process.env.VCAP_SERVICES = JSON.stringify({
        destination: [{ name: 'my-destination' }]
      });
      const actual = getDestinationServiceCredentialsList();
      expect(actual).toEqual(expected);
    });
  });

  describe('getDestinationServiceUrl', () => {
    beforeEach(() => {
      process.env.VCAP_SERVICES = JSON.stringify(services);
    });

    it('get uri from destination service class', () => {
      const expected = 'https://..';
      const actual = getDestinationServiceUri();
      expect(actual).toBe(expected);
    });

    it('skip credentials that has no uri property', () => {
      const mutatedVcap_services = {
        destination: [
          {
            name: 'my-destination',
            credentials: { clientid: 'sb-clone', clientsecret: 'jQZB..' }
          }
        ]
      };
      process.env.VCAP_SERVICES = JSON.stringify(mutatedVcap_services);
      const expected = null;
      const actual = getDestinationServiceUri();
      expect(actual).toEqual(expected);
    });

    it('return null if credentials list is empty', () => {
      const mutatedVcap_services = {
        destination: [{ name: 'my-destination' }]
      };
      process.env.VCAP_SERVICES = JSON.stringify(mutatedVcap_services);
      const expected = null;
      const actual = getDestinationServiceUri();
      expect(actual).toEqual(expected);
    });

    it('get destination basic credentials', () => {
      const expected = { clientid: 'sb-clone', clientsecret: 'jQZB..' };
      const actual = getDestinationBasicCredentials();
      expect(actual).toEqual(expected);
    });
  });

  describe('getXsuaaServiceCredentials', () => {
    afterEach(() => {
      delete process.env.VCAP_SERVICES;
    });

    it('returns the XSUAA service credentials for a given JWT', () => {
      process.env.VCAP_SERVICES = JSON.stringify(services);

      const expected = CLIENT_ID;
      const decodedJwt = {
        client_id: CLIENT_ID
      };

      expect(getXsuaaServiceCredentials(decodedJwt).clientid).toBe(expected);
    });

    it('uses the audience for matching when no match can be found using the clientid', () => {
      process.env.VCAP_SERVICES = JSON.stringify(services);

      const expected = CLIENT_ID;
      const decodedJwt = {
        aud: [CLIENT_ID]
      };

      expect(getXsuaaServiceCredentials(decodedJwt).clientid).toBe(expected);
    });

    it('uses scope if audience array is empty for matching when no match can be found using the clientid', () => {
      process.env.VCAP_SERVICES = JSON.stringify(services);

      const expected = CLIENT_ID;
      const decodedJwt = {
        aud: [],
        scope: [CLIENT_ID + '.rest.of.the.link']
      };

      expect(getXsuaaServiceCredentials(decodedJwt).clientid).toBe(expected);
    });

    it('Throws error if no match can be found', () => {
      expect(() => getXsuaaServiceCredentials({})).toThrow();
    });
  });
});
