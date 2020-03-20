/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock from 'nock';
import { destinationServiceUri } from './environment-mocks';

type nockFunction = (a: string, b: nock.Options) => nock.Scope;

export function mockInstanceDestinationsCall(
  abc: nockFunction,
  response: any,
  responseCode: number,
  accessToken: string,
  uri: string = destinationServiceUri
) {
  return abc(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get('/destination-configuration/v1/instanceDestinations')
    .reply(responseCode, response);
}

export function mockSubaccountDestinationsCall(
  abc: nockFunction,
  response: any,
  responseCode: number,
  accessToken: string,
  uri: string = destinationServiceUri
) {
  return abc(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get('/destination-configuration/v1/subaccountDestinations')
    .reply(responseCode, response);
}

export function mockSingleDestinationCall(
  abc: nockFunction,
  response: any,
  responseCode: number,
  destName: string,
  accessToken: string,
  uri: string = destinationServiceUri
) {
  return abc(uri, {
    reqheaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .get(`/destination-configuration/v1/destinations/${destName}`)
    .reply(responseCode, response);
}
