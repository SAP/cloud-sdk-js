/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import jwt from 'jsonwebtoken';
import nock from 'nock';
import { Person } from '@sap-cloud-sdk/core/test/test-util/test-services/v4/trip-service/Person';
import { destinationServiceUri } from '../../../packages/core/test/test-util/environment-mocks';
import { privateKey } from '../../../packages/core/test/test-util/keys';
import { basicCredentials } from './test-util/destination-encoder';
import { personGetAllResponse } from './test-data/person-get-all-response';

const servicePath = '/TripPinRESTierService';
const entityName = 'People';
const username = 'username';
const password = 'password';
const url = 'https://example.com';

const getAllResponse = personGetAllResponse();

const providerToken = jwt.sign({ zid: 'provider_token' }, privateKey(), {
  algorithm: 'RS512'
});

let destination;

describe('Request Builder', () => {
  beforeEach(() => {
    delete process.env.destinations;
    delete process.env.VCAP_SERVICES;

    destination = {
      url,
      username,
      password,
      sapClient: '123',
      authTokens: [],
      originalProperties: {}
    };
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should resolve for getAll request', async () => {
    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}?$format=json`)
      .reply(200, getAllResponse);

    const request = Person.requestBuilder().getAll().execute(destination);

    await expect(request).resolves.not.toThrow();
  });
  // todo duplicate
  it('should resolve without authentication when only destination url is specified', async () => {
    nock(destinationServiceUri, {
      reqheaders: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}?$format=json`)
      .reply(200, getAllResponse);

    const request = Person.requestBuilder().getAll().execute({
      url: destinationServiceUri
    });

    await expect(request).resolves.not.toThrow();
  });
  // todo duplicate
  it('should use destination from env variables when only destinationName is specified', async () => {
    process.env.destinations = JSON.stringify([
      {
        name: 'Testination',
        url: destinationServiceUri
      }
    ]);

    nock(destinationServiceUri, {
      reqheaders: {
        authorization: 'customcustom',
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}?$format=json`)
      .reply(200, getAllResponse);

    const request = Person.requestBuilder()
      .getAll()
      .withCustomHeaders({ authorization: 'customcustom' })
      .execute({
        destinationName: 'Testination'
      });

    await expect(request).resolves.not.toThrow();
  });

  it('should select all fields and expand multiple navigation properties', async () => {
    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}?$format=json&$select=*&$expand=BestFriend,Friends`)
      .reply(200, getAllResponse);

    const request = Person.requestBuilder()
      .getAll()
      .select(Person.ALL_FIELDS)
      .expand(Person.BEST_FRIEND, Person.FRIEND)
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should allow setting custom headers', async () => {
    nock(destinationServiceUri, {
      reqheaders: {
        authorization: 'customcustom',
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}?$format=json`)
      .reply(200, getAllResponse);

    const request = Person.requestBuilder()
      .getAll()
      .withCustomHeaders({
        authorization: 'customcustom'
      })
      .execute({
        url: destinationServiceUri
      });

    await expect(request).resolves.not.toThrow();
  });

  it('should allow setting custom query parameters', async () => {
    nock(destinationServiceUri)
      .get(`${servicePath}/${entityName}`)
      .query({
        $format: 'json',
        testParameter: 'customcustom'
      })
      .reply(200, getAllResponse);

    const request = Person.requestBuilder()
      .getAll()
      .withCustomQueryParameters({
        testParameter: 'customcustom'
      })
      .execute({
        url: destinationServiceUri
      });

    await expect(request).resolves.not.toThrow();
  });
});
