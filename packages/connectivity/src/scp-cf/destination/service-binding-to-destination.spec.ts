import { createLogger } from '@sap-cloud-sdk/util';
import { serviceToken } from '../token-accessor';
import { resolveServiceBinding } from '../environment-accessor/service-bindings';
import { decodeJwt } from '../jwt';
import { transformServiceBindingToDestination } from './service-binding-to-destination';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'destination'
});

const services = {
  destination: [
    {
      name: 'my-destination-service1',
      label: 'destination',
      tags: ['destination1'],
      credentials: {
        clientid: 'destination-clientid1',
        clientsecret: 'destination-clientsecret1',
        uri: 'destination-uri1'
      }
    },
    {
      name: 'my-destination-service2',
      label: 'destination',
      tags: ['destination2'],
      credentials: {
        clientid: 'destination-clientid2',
        clientsecret: 'destination-clientsecret2',
        uri: 'destination-uri2'
      }
    }
  ],
  xsuaa: [
    {
      name: 'my-xsuaa-service1',
      label: 'xsuaa',
      tags: ['xsuaa1'],
      credentials: {
        clientid: 'xsuaa-clientid',
        clientsecret: 'xsuaa-clientsecret',
        apiurl: 'xsuaa-url'
      }
    }
  ],
  aicore: [
    {
      name: 'my-aicore-service1',
      label: 'aicore',
      tags: ['aicore1'],
      credentials: {
        clientid: 'aicore-clientid',
        clientsecret: 'aicore-clientsecret',
        serviceurls: {
          AI_API_URL: 'aicore-url'
        }
      }
    }
  ],
  's4-hana-cloud': [
    {
      name: 's4-hana-cloud-service',
      label: 's4-hana-cloud',
      credentials: {
        User: 'username',
        Password: 'password',
        URL: 's4-hana-cloud-url'
      }
    }
  ],
  'some-service': [
    {
      name: 'some-service1',
      label: 'some-service',
      tags: ['some-service'],
      credentials: {
        clientid: 'some-service-clientid',
        clientsecret: 'some-service-clientsecret',
        uri: 'some-service-uri'
      }
    }
  ]
};

jest.mock('../token-accessor', () => ({
  serviceToken: jest.fn()
}));

jest.mock('../jwt', () => ({
  decodeJwt: jest.fn()
}));

describe('service binding to destination', () => {
  beforeAll(() => {
    (serviceToken as jest.Mock).mockResolvedValue('access-token');
    (decodeJwt as jest.Mock).mockReturnValue({ exp: 1596549600 });
    process.env.VCAP_SERVICES = JSON.stringify(services);
  });

  afterAll(() => {
    jest.clearAllMocks();
    delete process.env.VCAP_SERVICES;
  });

  it('transform aicore service binding to destination', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('aicore')
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'aicore-url',
        name: 'my-aicore-service1',
        authentication: 'OAuth2ClientCredentials',
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: 'access-token',
            type: 'bearer'
          })
        ])
      })
    );
  });

  it('transform xsuaa service binding to destination', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('xsuaa')
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'xsuaa-url',
        name: 'my-xsuaa-service1',
        authentication: 'OAuth2ClientCredentials',
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: 'access-token',
            type: 'bearer'
          })
        ])
      })
    );
  });

  it('transform the first destination service binding from multiple to destination', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('destination')
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'destination-uri1',
        name: 'my-destination-service1',
        authentication: 'OAuth2ClientCredentials',
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: 'access-token',
            type: 'bearer'
          })
        ])
      })
    );
  });

  it('transform the s4-hana-cloud service binding into basic auth destination', async () => {
    const warnSpy = jest.spyOn(logger, 'warn');
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('s4-hana-cloud')
    );
    expect(warnSpy).toHaveBeenCalledWith(
      'For service binding of type s4-hana-cloud falling back to creating destination with basic authentication.'
    );
    expect(destination).toEqual({
      url: 's4-hana-cloud-url',
      authentication: 'BasicAuthentication',
      username: 'username',
      password: 'password'
    });
  });

  it('transforming unsupported service type throws', async () => {
    await expect(() =>
      transformServiceBindingToDestination(
        resolveServiceBinding('some-service')
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"The provided service binding of type some-service is not supported out of the box for destination transformation."'
    );
  });
});