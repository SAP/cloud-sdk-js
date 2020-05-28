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

  it('should resolve without authentication when only destination url is specified', async () => {
    nock(destinationServiceUri, {
      reqheaders: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}?$format=json`)
      .reply(200, getAllResponse);

    const request = TestEntity.requestBuilder().getAll().execute({
      url: destinationServiceUri
    });

    await expect(request).resolves.not.toThrow();
  });

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

    const request = TestEntity.requestBuilder()
      .getAll()
      .withCustomHeaders({ authorization: 'customcustom' })
      .execute({
        destinationName: 'Testination'
      });

    await expect(request).resolves.not.toThrow();
  });

  it('should retrieve userJwt and destination for getAll request using basic authentication', async () => {
    mockServiceBindings();
    destination = {
      Name: 'FINAL-DESTINATION',
      Authentication: 'BasicAuthentication',
      Password: password,
      User: username,
      ProxyType: 'Internet',
      sapclient: null,
      URL: url,
      authTokens: []
    };

    mockClientCredentialsGrantCall(
      providerXsuaaUrl,
      { access_token: providerToken },
      200,
      mockDestinationServiceBinding.credentials.clientid,
      mockDestinationServiceBinding.credentials.clientsecret
    );

    mockInstanceDestinationsCall(nock, [destination], 200, providerToken);
    mockSubaccountDestinationsCall(nock, [], 200, providerToken);

    nock(destination.URL, {
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
      .withCustomHeaders({ authorization: 'customcustom' })
      .execute({
        destinationName: 'FINAL-DESTINATION'
      });

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for getByKey request', async () => {
    const response = singleTestEntityResponse();
    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(
        `${servicePath}/${entityName}(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)?$format=json`
      )
      .reply(200, response);

    const request = TestEntity.requestBuilder()
      .getByKey('aaaabbbb-cccc-dddd-eeee-ffff00001111', 'abcd1234')
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for all field and multi-level selection', async () => {
    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(
        `${servicePath}/${entityName}?$format=json&$select=*,to_SingleLink/*&$expand=to_SingleLink`
      )
      .reply(200, getAllResponse);

    const request = TestEntity.requestBuilder()
      .getAll()
      .select(TestEntity.ALL_FIELDS, TestEntity.TO_SINGLE_LINK)
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('navigation properties should never be undefined', async () => {
    const response = singleTestEntityResponse();
    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(
        `${servicePath}/${entityName}(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)?$format=json&$select=to_SingleLink/*&$expand=to_SingleLink`
      )
      .reply(200, response);

    const testEntity = await TestEntity.requestBuilder()
      .getByKey('aaaabbbb-cccc-dddd-eeee-ffff00001111', 'abcd1234')
      .select(TestEntity.TO_SINGLE_LINK)
      .execute(destination);

    expect(testEntity.toSingleLink).toBeDefined();
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

  it('should resolve when creating a child entity of another enitity', async () => {
    mockCsrfTokenRequest(destination.url, destination.sapClient!);
    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json',
        cookie: 'key1=val1;key2=val2;key3=val3'
      }
    })
      .post(
        `${servicePath}/${entityName}(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)/to_MultiLink`,
        {
          StringProperty: 'prop'
        }
      )
      .reply(200, singleTestEntityMultiLinkResponse());

    const parentEntity = new TestEntity();
    parentEntity.keyPropertyGuid = 'aaaabbbb-cccc-dddd-eeee-ffff00001111';
    parentEntity.keyPropertyString = 'abcd1234';

    const request = TestEntityMultiLink.requestBuilder()
      .create(TestEntityMultiLink.builder().stringProperty('prop').build())
      .asChildOf(parentEntity, TestEntity.TO_MULTI_LINK)
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
        `${servicePath}/${entityName}(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)`,
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

  it('should fail for update request without keys', async () => {
    const request = TestEntity.requestBuilder()
      .update(
        TestEntity.builder()
          .stringProperty('test')
          .booleanProperty(false)
          .build()
      )
      .execute(destination);

    await expect(request).rejects.toThrowErrorMatchingSnapshot();
  });

  it('should resolve for delete with keys', async () => {
    mockCsrfTokenRequest(destination.url, destination.sapClient!);

    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json',
        cookie: 'key1=val1;key2=val2;key3=val3'
      }
    })
      .delete(
        `${servicePath}/A_TestEntity(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)`
      )
      .reply(204);

    const request = TestEntity.requestBuilder()
      .delete('aaaabbbb-cccc-dddd-eeee-ffff00001111', 'abcd1234')
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for delete with entity', async () => {
    mockCsrfTokenRequest(destination.url, destination.sapClient!);

    const entity = TestEntity.builder()
      .keyPropertyGuid('aaaabbbb-cccc-dddd-eeee-ffff00001111')
      .keyPropertyString('abcd1234')
      .build()
      .setVersionIdentifier('something-new');

    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json',
        cookie: 'key1=val1;key2=val2;key3=val3',
        'if-match': 'something-new'
      }
    })
      .delete(
        `${servicePath}/A_TestEntity(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)`
      )
      .reply(204);

    const request = TestEntity.requestBuilder()
      .delete(entity)
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('sending OData request should not break when x-csrf-token or cookies are not defined in csrf fetch response', async () => {
    const response = singleTestEntityResponse();

    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        'x-csrf-token': 'Fetch',
        'sap-client': destination.sapClient as string
      }
    })
      .get(servicePath)
      .reply(200, undefined, undefined);

    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .post(`${servicePath}/${entityName}`, {
        StringProperty: 'stringProp',
        Int16Property: 145,
        BooleanProperty: true
      })
      .reply(200, response);

    const request = TestEntity.requestBuilder()
      .create(
        TestEntity.builder()
          .stringProperty('stringProp')
          .int16Property(145)
          .booleanProperty(true)
          .build()
      )
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

  it('should allow setting custom headers twice', async () => {
    nock(destinationServiceUri, {
      reqheaders: {
        authorization: 'customcustom',
        additionalheader: 'additional',
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
      .withCustomHeaders({
        additionalHeader: 'additional'
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

  it('should allow setting custom query parameters twice', async () => {
    nock(destinationServiceUri)
      .get(`${servicePath}/${entityName}`)
      .query({
        $format: 'json',
        testParameter: 'customcustom',
        additionalParameter: 'additional'
      })
      .reply(200, getAllResponse);

    const request = TestEntity.requestBuilder()
      .getAll()
      .withCustomQueryParameters({
        testParameter: 'customcustom'
      })
      .withCustomQueryParameters({
        additionalParameter: 'additional'
      })
      .execute({
        url: destinationServiceUri
      });

    await expect(request).resolves.not.toThrow();
  });

  it('should retrieve access token for OAuth2ClientCredentials authentication and set it in request header', async () => {
    mockServiceBindings();
    destination = {
      Name: 'FINAL-DESTINATION',
      Password: password,
      User: username,
      ProxyType: 'Internet',
      sapclient: null,
      URL: url,
      authTokens: [],
      Authentication: 'OAuth2ClientCredentials',
      tokenServiceURL: 'https://token.example.com',
      clientId: 'TokenClientId',
      clientSecret: 'TokenClientSecret'
    };

    const fakeOAuthToken = 'FakeOAuth2ClientCredentialsToken';

    mockClientCredentialsGrantCall(
      providerXsuaaUrl,
      { access_token: providerToken },
      200,
      mockDestinationServiceBinding.credentials.clientid,
      mockDestinationServiceBinding.credentials.clientsecret
    );

    mockInstanceDestinationsCall(nock, [destination], 200, providerToken);
    mockSubaccountDestinationsCall(nock, [], 200, providerToken);

    nock(destination.tokenServiceURL, {
      reqheaders: {
        authorization: 'Basic VG9rZW5DbGllbnRJZDpUb2tlbkNsaWVudFNlY3JldA=='
      }
    })
      .post(
        '/oauth/token',
        'grant_type=client_credentials&client_id=TokenClientId&client_secret=TokenClientSecret'
      )
      .reply(200, { access_token: fakeOAuthToken });

    nock(destination.URL, {
      reqheaders: {
        authorization: `Bearer ${fakeOAuthToken}`,
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}?$format=json`)
      .reply(200, getAllResponse);

    const request = TestEntity.requestBuilder().getAll().execute({
      destinationName: 'FINAL-DESTINATION'
    });

    await expect(request).resolves.not.toThrow();
  });
});
