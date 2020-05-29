/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import jwt from 'jsonwebtoken';
import nock from 'nock';
import { destinationServiceUri } from '../../../packages/core/test/test-util/environment-mocks';
import { privateKey } from '../../../packages/core/test/test-util/keys';
import { basicCredentials } from './test-util/destination-encoder';
import { testEntityCollectionResponse } from './test-data/test-entity-collection-response-v4';
import { TestEntity } from '@sap-cloud-sdk/core/test/test-util/test-services/v4/test-service';

const servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const entityName = 'A_TestEntity';
const username = 'username';
const password = 'password';
const url = 'https://example.com';

const getAllResponse = testEntityCollectionResponse();

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

    const request = TestEntity.requestBuilder().getAll().execute(destination);

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
      .get(`${servicePath}/${entityName}?$format=json&$select=*`)
      .reply(200, getAllResponse);

    const request = TestEntity.requestBuilder()
      .getAll()
      .select(TestEntity.ALL_FIELDS)
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

    const request = TestEntity.requestBuilder()
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

    const request = TestEntity.requestBuilder()
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
