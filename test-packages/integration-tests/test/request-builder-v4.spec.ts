/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import jwt from 'jsonwebtoken';
import nock from 'nock';
import { TestEntity } from '@sap-cloud-sdk/core/test/test-util/test-services/v4/test-service';
import { privateKey } from '../../../packages/core/test/test-util/keys';
import { basicCredentials } from './test-util/destination-encoder';
import { testEntityCollectionResponse } from './test-data/test-entity-collection-response-v4';
import { singleTestEntityResponse } from './test-data/single-test-entity-response-v4';
import { mockCsrfTokenRequest } from './test-util/request-mocker';

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

  it('should resolve when ALL_FIELDS is selected and links are expanded', async () => {
    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}`)
      .query({
        $format: 'json',
        $select: '*',
        $expand: 'to_SingleLink,to_MultiLink'
      })
      .reply(200, getAllResponse);

    const request = TestEntity.requestBuilder()
      .getAll()
      .select(TestEntity.ALL_FIELDS)
      .expand(TestEntity.TO_SINGLE_LINK, TestEntity.TO_MULTI_LINK)
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for create request', async () => {
    const response = singleTestEntityResponse();

    mockCsrfTokenRequest(destination.url, destination.sapClient!);
    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json',
        cookie: 'key1=val1;key2=val2;key3=val3'
      }
    })
      .post(`${servicePath}/${entityName}`, {
        StringProperty: 'someProperty',
        Int16Property: 16,
        BooleanProperty: false
      })
      .reply(200, response);

    const request = TestEntity.requestBuilder()
      .create(
        TestEntity.builder()
          .stringProperty('someProperty')
          .int16Property(16)
          .booleanProperty(false)
          .build()
      )
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for update request', async () => {
    mockCsrfTokenRequest(destination.url, destination.sapClient!);

    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json',
        cookie: 'key1=val1;key2=val2;key3=val3'
      }
    })
      .patch(
        `${servicePath}/${entityName}(KeyPropertyGuid=aaaabbbb-cccc-dddd-eeee-ffff00001111,KeyPropertyString=%27abcd1234%27)`,
        {
          StringProperty: 'newStringProp'
        }
      )
      .reply(204);

    const request = TestEntity.requestBuilder()
      .update(
        TestEntity.builder()
          .keyPropertyGuid('aaaabbbb-cccc-dddd-eeee-ffff00001111')
          .keyPropertyString('abcd1234')
          .stringProperty('newStringProp')
          .build()
      )
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for delete request using key fields', async () => {
    mockCsrfTokenRequest(destination.url, destination.sapClient!);

    const entity = TestEntity.builder()
      .keyPropertyGuid('aaaabbbb-cccc-dddd-eeee-ffff00001111')
      .keyPropertyString('abcd1234')
      .stringProperty('someContent')
      .build();

    const entityJson = entity.toJSON();

    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json',
        cookie: 'key1=val1;key2=val2;key3=val3'
      }
    })
      .delete(
        `${servicePath}/${entityName}(KeyPropertyGuid=aaaabbbb-cccc-dddd-eeee-ffff00001111,KeyPropertyString=%27abcd1234%27)`
      )
      .reply(200, entityJson);

    const request = TestEntity.requestBuilder()
      .delete(entity.keyPropertyGuid, entity.keyPropertyString)
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });
});
