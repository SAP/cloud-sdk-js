import nock from 'nock';
import * as sdkJwt from '@sap-cloud-sdk/connectivity/src/scp-cf/jwt';
import { destinationServiceUri } from './environment-mocks';

type nockFunction = (a: string, b: nock.Options) => nock.Scope;

export function mockInstanceDestinationsCall(
  nockRef: nockFunction,
  response: any,
  responseCode: number,
  accessToken: string,
  uri: string = destinationServiceUri
) {
  return nockRef(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get('/destination-configuration/v1/instanceDestinations')
    .reply(responseCode, response);
}

export function mockSubaccountDestinationsCall(
  nockRef: nockFunction,
  response: any,
  responseCode: number,
  accessToken: string,
  uri: string = destinationServiceUri
) {
  return nockRef(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get('/destination-configuration/v1/subaccountDestinations')
    .reply(responseCode, response);
}

export function mockSingleDestinationCall(
  nockRef: nockFunction,
  response: any,
  responseCode: number,
  destName: string,
  headers: Record<string, any>,
  options?: { uri?: string; badheaders?: string[] }
) {
  return nockRef(options?.uri || destinationServiceUri, {
    reqheaders: headers,
    badheaders: options?.badheaders || ['X-tenant'] // X-tenant only allowed for OAuth2ClientCredentials flow
  })
    .get(`/destination-configuration/v1/destinations/${destName}`)
    .reply(responseCode, response);
}

export function mockVerifyJwt() {
  return jest
    .spyOn(sdkJwt, 'verifyJwt')
    .mockImplementation(token => Promise.resolve(sdkJwt.decodeJwt(token)));
}
