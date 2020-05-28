/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  TestEntity,
  TestEntityMultiLink
} from '@sap-cloud-sdk/test-services/test-service';
import jwt from 'jsonwebtoken';
import nock from 'nock';
import {
  mockInstanceDestinationsCall,
  mockSubaccountDestinationsCall
} from '../../../packages/core/test/test-util/destination-service-mocks';
import {
  destinationServiceUri,
  mockDestinationServiceBinding,
  mockServiceBindings,
  providerXsuaaUrl
} from '../../../packages/core/test/test-util/environment-mocks';
import { privateKey } from '../../../packages/core/test/test-util/keys';
import { mockClientCredentialsGrantCall } from '../../../packages/core/test/test-util/xsuaa-service-mocks';
import { singleTestEntityMultiLinkResponse } from './test-data/single-test-entity-multi-link-response';
import { singleTestEntityResponse } from './test-data/single-test-entity-response';
import { testEntityCollectionResponse } from './test-data/test-entity-collection-response';
import { basicCredentials } from './test-util/destination-encoder';
import { Person } from '@sap-cloud-sdk/core/test/test-util/test-services/v4/trip-service/Person';
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
    }).log(console.log)
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

  it('should resolve for all field', async () => {
    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(
        `${servicePath}/${entityName}?$format=json&$select=*`
      )
      .reply(200, getAllResponse);

    const request = Person.requestBuilder()
      .getAll()
      .select(Person.ALL_FIELDS)
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
