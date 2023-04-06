import { createLogger } from '@sap-cloud-sdk/util';
import { getDestinationServiceCredentials } from './destination';

const logger = createLogger('environment-accessor');

const services = {
  destination: [
    {
      name: 'my-destination-service1',
      label: 'destination',
      tags: ['destination1']
    },
    {
      name: 'my-destination-service2',
      label: 'destination',
      tags: ['destination2'],
      credentials: {
        clientid: 'clientid2',
        clientsecret: 'clientsecret2',
        uri: 'uri2'
      }
    }
  ]
};

describe('getDestinationServiceCredentials()', () => {
  beforeEach(() => {
    process.env.VCAP_SERVICES = JSON.stringify(services);
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete process.env.VCAP_SERVICES;
  });

  it('retrieves the first available credentials', () => {
    expect(getDestinationServiceCredentials()).toEqual(
      services.destination[1].credentials
    );
  });

  it('throws an error if no credentials are found', () => {
    process.env.VCAP_SERVICES = JSON.stringify({
      destination: [services.destination[0]]
    });

    expect(() =>
      getDestinationServiceCredentials()
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not find binding to the destination service, that includes credentials."'
    );
  });

  it('logs a warning if multiple credentials were found', () => {
    const warnSpy = jest.spyOn(logger, 'warn');
    process.env.VCAP_SERVICES = JSON.stringify({
      destination: [
        services.destination[1],
        { ...services.destination[1], name: 'my-destination-service3' }
      ]
    });
    getDestinationServiceCredentials();

    expect(warnSpy).toHaveBeenCalledWith(
      'Found multiple bindings to the destination service. Using the first one.'
    );
  });
});
