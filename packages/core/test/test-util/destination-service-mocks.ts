import nock from 'nock';
import * as sdkJwt from '@sap-cloud-sdk/connectivity';
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
  uri: string = destinationServiceUri
) {
  return nockRef(uri, {
    reqheaders: headers
  })
    .get(`/destination-configuration/v1/destinations/${destName}`)
    .reply(responseCode, response);
}

export function mockVerifyJwt() {
  return jest
    .spyOn(sdkJwt, 'verifyJwt')
    .mockImplementation(token => Promise.resolve(sdkJwt.decodeJwt(token)));
}
