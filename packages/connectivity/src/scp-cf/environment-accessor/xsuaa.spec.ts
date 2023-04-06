import { createLogger } from '@sap-cloud-sdk/util';
import { getXsuaaServiceCredentials } from './xsuaa';

const logger = createLogger('environment-accessor');

const clientId = 'sb-jwt-app';

const services = {
  xsuaa: [
    {
      credentials: {
        clientid: clientId,
        url: 'https://tenant-id.authentication.sap.hana.ondemand.com'
      },
      plan: 'application',
      label: 'xsuaa',
      name: 'my-xsuaa'
    }
  ]
};

describe('getXsuaaServiceCredentials', () => {
  beforeEach(() => {
    process.env.VCAP_SERVICES = JSON.stringify(services);
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete process.env.VCAP_SERVICES;
  });

  it('gets the XSUAA service credentials matching a given JWT', () => {
    expect(
      getXsuaaServiceCredentials({
        client_id: clientId
      }).clientid
    ).toBe(clientId);
  });

  it('uses the audience for matching when no match can be found using the clientid', () => {
    expect(
      getXsuaaServiceCredentials({
        aud: [clientId]
      }).clientid
    ).toBe(clientId);
  });

  it('uses scope if audience array is empty for matching when no match can be found using the clientid', () => {
    expect(
      getXsuaaServiceCredentials({
        aud: [],
        scope: [clientId + '.rest.of.the.link']
      }).clientid
    ).toBe(clientId);
  });

  it('throws an error if no match can be found', () => {
    process.env.VCAP_SERVICES = JSON.stringify({
      xsuaa: [{ name: 'xsuaa1' }, { name: 'xsuaa2' }]
    });

    expect(() =>
      getXsuaaServiceCredentials()
    ).toThrowErrorMatchingInlineSnapshot(
      `"Could not find binding to the XSUAA service, that includes credentials."`
    );
  });
});
