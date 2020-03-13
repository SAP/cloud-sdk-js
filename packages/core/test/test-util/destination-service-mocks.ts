/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock from 'nock';
import { destinationServiceUri } from './environment-mocks';

export function mockInstanceDestinationsCall(response: any, responseCode: number, accessToken: string, uri: string = destinationServiceUri) {
  return nock(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get('/destination-configuration/v1/instanceDestinations')
    .reply(responseCode, response);
}

export function mockSubaccountDestinationsCall(response: any, responseCode: number, accessToken: string, uri: string = destinationServiceUri) {
  return nock(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get('/destination-configuration/v1/subaccountDestinations')
    .reply(responseCode, response);
}

export function mockSingleDestinationCall(
  response: any,
  responseCode: number,
  destName: string,
  accessToken: string,
  uri: string = destinationServiceUri
) {
  return nock(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get(`/destination-configuration/v1/destinations/${destName}`)
    .reply(responseCode, response);
}
