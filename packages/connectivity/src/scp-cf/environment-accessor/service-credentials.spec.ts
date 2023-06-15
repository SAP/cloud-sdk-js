import { createLogger } from '@sap-cloud-sdk/util';
import { getServiceCredentials } from './service-credentials';

const logger = createLogger('environment-accessor');

function mockBindings(...bindings: { label: string; name: string }[]) {
  process.env.VCAP_SERVICES = JSON.stringify(
    bindings.reduce((services, binding) => {
      if (!services[binding.label]) {
        services[binding.label] = [];
      }
      services[binding.label].push(binding);
      return services;
    }, {})
  );
}

describe('service credentials', () => {
  let warnSpy;
  beforeEach(() => {
    warnSpy = jest.spyOn(logger, 'warn');
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete process.env.VCAP_SERVICES;
  });

  describe('getServiceCredentials() without JWT', () => {
    it('gets credentials and does not log warnings, when there is one binding with credentials', () => {
      const binding = {
        label: 'single-credentials',
        name: 'single-credentials-1',
        credentials: {
          clientid: 'clientid',
          clientsecret: 'clientsecret',
          uri: 'uri'
        }
      };
      mockBindings(binding);
      expect(getServiceCredentials('single-credentials')).toEqual(
        binding.credentials
      );

      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('gets credentials and does not logs a warning, when there are multiple bindings with credentials', () => {
      const bindings = [1, 2].map(id => ({
        label: 'multiple-credentials',
        name: `multiple-credentials-${id}`,
        credentials: {
          clientid: `clientid${id}`,
          clientsecret: `clientsecret${id}`,
          uri: `uri${id}`,
          xsappname: `app${id}`
        }
      }));
      mockBindings(...bindings);
      expect(getServiceCredentials('multiple-credentials')).toEqual(
        bindings[0].credentials
      );
      expect(warnSpy).toHaveBeenCalledWith(
        "Found multiple bindings for service 'multiple-credentials'. App names:\n\t- app1\n\t- app2\nChoosing first one ('app1')."
      );
    });

    it('logs a debug message if no credentials could be found', () => {
      const debugSpy = jest.spyOn(logger, 'debug');
      mockBindings(
        {
          label: 'no-credentials',
          name: 'no-credentials-1'
        },
        {
          label: 'no-credentials',
          name: 'no-credentials-2'
        }
      );

      expect(getServiceCredentials('no-credentials')).toBeUndefined();
      expect(debugSpy).toHaveBeenCalledWith(
        "Could not find binding to service 'no-credentials', that includes credentials."
      );
      expect(warnSpy).toHaveBeenCalledWith(
        "Ignoring 2 service bindings of service type 'no-credentials' because of missing credentials."
      );
    });
  });

  describe('getServiceCredentials() with JWT', () => {
    const clientId = 'clientId';
    beforeEach(() => {
      const bindings = [
        {
          label: 'with-client-id',
          name: 'with-client-id-1',
          credentials: { clientid: 'otherId', xsappname: 'otherId' }
        },
        {
          label: 'with-client-id',
          name: 'with-client-id-2',
          credentials: { clientid: clientId, xsappname: clientId }
        }
      ];
      mockBindings(...bindings);
    });

    it('uses client id to match a binding', () => {
      expect(
        getServiceCredentials('with-client-id', {
          client_id: clientId
        })?.clientid
      ).toBe(clientId);
    });

    it('uses audience to match a binding, if client id match returned nothing', () => {
      expect(
        getServiceCredentials('with-client-id', {
          aud: [clientId]
        })?.clientid
      ).toBe(clientId);
    });

    it('uses scope to match a binding, if client id and audience matches returned nothing', () => {
      expect(
        getServiceCredentials('with-client-id', {
          scope: [clientId + '.rest.of.the.link']
        })?.clientid
      ).toBe(clientId);
    });
  });
});
