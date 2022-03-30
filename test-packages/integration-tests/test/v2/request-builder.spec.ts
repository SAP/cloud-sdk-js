import jwt from 'jsonwebtoken';
import nock from 'nock';
import {
  basicHeader,
  wrapJwtInHeader
} from '@sap-cloud-sdk/connectivity/internal';
import {
  mockInstanceDestinationsCall,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall
} from '../../../../test-resources/test/test-util/destination-service-mocks';
import {
  destinationServiceUri,
  destinationBindingClientSecretMock,
  mockServiceBindings,
  providerXsuaaUrl
} from '../../../../test-resources/test/test-util/environment-mocks';
import { privateKey } from '../../../../test-resources/test/test-util/keys';
import { mockClientCredentialsGrantCall } from '../../../../test-resources/test/test-util/xsuaa-service-mocks';
import { destinationName } from '../../../../test-resources/test/test-util/example-destination-service-responses';
import { singleTestEntityMultiLinkResponse } from '../test-data/single-test-entity-multi-link-response';
import { singleTestEntityResponse } from '../test-data/single-test-entity-response';
import { testEntityCollectionResponse } from '../test-data/test-entity-collection-response';
import { testEntityApi, testEntityMultiLinkApi } from './test-util';

const servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const entityName = 'A_TestEntity';
const username = 'username';
const password = 'password';
const url = 'https://example.com';

const getAllResponse = testEntityCollectionResponse();

const providerToken = jwt.sign(
  { zid: 'provider_token', iss: providerXsuaaUrl },
  privateKey,
  {
    algorithm: 'RS512'
  }
);

const mockedBuildHeaderResponse = {
  'x-csrf-token': 'mocked-x-csrf-token',
  'set-cookie': ['mocked-cookie-0', 'mocked-cookie-1']
};

function mockCsrfTokenRequest(path?: string) {
  nock(destination.url, {
    reqheaders: {
      authorization: basicHeader(destination.username, destination.password),
      'x-csrf-token': 'Fetch'
    }
  })
    .head(path ? `${servicePath}/${path}` : servicePath)
    .reply(200, '', mockedBuildHeaderResponse);
}

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
        authorization: basicHeader(destination.username, destination.password),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}`)
      .reply(200, getAllResponse);

    const request = testEntityApi
      .requestBuilder()
      .getAll()
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve without authentication when only destination url is specified', async () => {
    nock(destinationServiceUri, {
      reqheaders: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}`)
      .reply(200, getAllResponse);

    const request = testEntityApi.requestBuilder().getAll().execute({
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
      .get(`${servicePath}/${entityName}`)
      .reply(200, getAllResponse);

    const request = testEntityApi
      .requestBuilder()
      .getAll()
      .addCustomHeaders({ authorization: 'customcustom' })
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
      destinationBindingClientSecretMock.credentials
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
      .get(`${servicePath}/${entityName}`)
      .reply(200, getAllResponse);

    const request = testEntityApi
      .requestBuilder()
      .getAll()
      .addCustomHeaders({ authorization: 'customcustom' })
      .execute({
        destinationName: 'FINAL-DESTINATION'
      });

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for getByKey request', async () => {
    const response = singleTestEntityResponse();
    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(destination.username, destination.password),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(
        `${servicePath}/${entityName}(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd%3F1234%27)`
      )
      .reply(200, response);

    const request = testEntityApi
      .requestBuilder()
      .getByKey('aaaabbbb-cccc-dddd-eeee-ffff00001111', 'abcd?1234')
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for all field and multi-level selection', async () => {
    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(destination.username, destination.password),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(
        `${servicePath}/${entityName}?$select=*,to_SingleLink/*&$expand=to_SingleLink`
      )
      .reply(200, getAllResponse);

    const request = testEntityApi
      .requestBuilder()
      .getAll()
      .select(
        testEntityApi.schema.ALL_FIELDS,
        testEntityApi.schema.TO_SINGLE_LINK
      )
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('navigation properties should never be undefined', async () => {
    const response = singleTestEntityResponse();
    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(destination.username, destination.password),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(
        `${servicePath}/${entityName}(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)?$select=to_SingleLink/*&$expand=to_SingleLink`
      )
      .reply(200, response);

    const testEntity = await testEntityApi
      .requestBuilder()
      .getByKey('aaaabbbb-cccc-dddd-eeee-ffff00001111', 'abcd1234')
      .select(testEntityApi.schema.TO_SINGLE_LINK)
      .execute(destination);

    expect(testEntity.toSingleLink).toBeDefined();
  });

  it('should resolve for create request', async () => {
    const response = singleTestEntityResponse();
    mockCsrfTokenRequest(entityName);

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(destination.username, destination.password),
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token': mockedBuildHeaderResponse['x-csrf-token'],
        cookie: 'mocked-cookie-0;mocked-cookie-1'
      }
    })
      .post(`${servicePath}/${entityName}`, {
        StringProperty: 'someProperty',
        Int16Property: 16,
        BooleanProperty: false
      })
      .reply(200, response);

    const request = testEntityApi
      .requestBuilder()
      .create(
        testEntityApi
          .entityBuilder()
          .stringProperty('someProperty')
          .int16Property(16)
          .booleanProperty(false)
          .build()
      )
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve when creating a child entity of another entity', async () => {
    mockCsrfTokenRequest(
      `${entityName}(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)/to_MultiLink`
    );

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(destination.username, destination.password),
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token': mockedBuildHeaderResponse['x-csrf-token'],
        cookie: 'mocked-cookie-0;mocked-cookie-1'
      }
    })
      .post(
        `${servicePath}/${entityName}(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)/to_MultiLink`,
        {
          StringProperty: 'prop'
        }
      )
      .reply(200, singleTestEntityMultiLinkResponse());

    const parentEntity = testEntityApi.entityBuilder().build();
    parentEntity.keyPropertyGuid = 'aaaabbbb-cccc-dddd-eeee-ffff00001111';
    parentEntity.keyPropertyString = 'abcd1234';

    const request = testEntityMultiLinkApi
      .requestBuilder()
      .create(
        testEntityMultiLinkApi.entityBuilder().stringProperty('prop').build()
      )
      .asChildOf(parentEntity, testEntityApi.schema.TO_MULTI_LINK)
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for update request', async () => {
    mockCsrfTokenRequest(
      `${entityName}(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)`
    );

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(destination.username, destination.password),
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token': mockedBuildHeaderResponse['x-csrf-token'],
        cookie: 'mocked-cookie-0;mocked-cookie-1'
      }
    })
      .patch(
        `${servicePath}/${entityName}(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)`,
        {
          StringProperty: 'newStringProp'
        }
      )
      .reply(204);

    const request = testEntityApi
      .requestBuilder()
      .update(
        testEntityApi
          .entityBuilder()
          .keyPropertyGuid('aaaabbbb-cccc-dddd-eeee-ffff00001111')
          .keyPropertyString('abcd1234')
          .stringProperty('newStringProp')
          .build()
      )
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should fail for update request without keys', async () => {
    const request = testEntityApi
      .requestBuilder()
      .update(
        testEntityApi
          .entityBuilder()
          .stringProperty('test')
          .booleanProperty(false)
          .build()
      )
      .execute(destination);

    await expect(request).rejects.toThrowErrorMatchingSnapshot();
  });

  it('should resolve for delete with keys', async () => {
    mockCsrfTokenRequest(
      'A_TestEntity(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)'
    );

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(destination.username, destination.password),
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token': mockedBuildHeaderResponse['x-csrf-token'],
        cookie: 'mocked-cookie-0;mocked-cookie-1'
      }
    })
      .delete(
        `${servicePath}/A_TestEntity(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)`
      )
      .reply(204);

    const request = testEntityApi
      .requestBuilder()
      .delete('aaaabbbb-cccc-dddd-eeee-ffff00001111', 'abcd1234')
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for delete with entity', async () => {
    mockCsrfTokenRequest(
      'A_TestEntity(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)'
    );

    const entity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid('aaaabbbb-cccc-dddd-eeee-ffff00001111')
      .keyPropertyString('abcd1234')
      .build()
      .setVersionIdentifier('something-new');

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(destination.username, destination.password),
        accept: 'application/json',
        'content-type': 'application/json',
        'if-match': 'something-new',
        'x-csrf-token': mockedBuildHeaderResponse['x-csrf-token'],
        cookie: 'mocked-cookie-0;mocked-cookie-1'
      }
    })
      .delete(
        `${servicePath}/A_TestEntity(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)`
      )
      .reply(204);

    const request = testEntityApi
      .requestBuilder()
      .delete(entity)
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('sending OData request should not break when x-csrf-token or cookies are not defined in csrf fetch response', async () => {
    const response = singleTestEntityResponse();

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(destination.username, destination.password),
        'x-csrf-token': 'Fetch',
        'sap-client': destination.sapClient as string
      }
    })
      .get(`${servicePath}/${entityName}`)
      .reply(200, undefined, undefined);

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(destination.username, destination.password),
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

    const request = testEntityApi
      .requestBuilder()
      .create(
        testEntityApi
          .entityBuilder()
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
      .get(`${servicePath}/${entityName}`)
      .reply(200, getAllResponse);

    const request = testEntityApi
      .requestBuilder()
      .getAll()
      .addCustomHeaders({
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
      .get(`${servicePath}/${entityName}`)
      .reply(200, getAllResponse);

    const request = testEntityApi
      .requestBuilder()
      .getAll()
      .addCustomHeaders({
        authorization: 'customcustom'
      })
      .addCustomHeaders({
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
        testParameter: 'customcustom'
      })
      .reply(200, getAllResponse);

    const request = testEntityApi
      .requestBuilder()
      .getAll()
      .addCustomQueryParameters({
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
        testParameter: 'customcustom',
        additionalParameter: 'additional'
      })
      .reply(200, getAllResponse);

    const request = testEntityApi
      .requestBuilder()
      .getAll()
      .addCustomQueryParameters({
        testParameter: 'customcustom'
      })
      .addCustomQueryParameters({
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
      authTokens: [
        {
          type: 'Bearer',
          value: 'some.token',
          expires_in: '3600',
          error: null,
          http_header: {
            key: 'Authorization',
            value: 'Bearer some.token'
          }
        }
      ],
      Authentication: 'OAuth2ClientCredentials',
      tokenServiceURL: 'https://token.example.com/some/token/endpoint',
      clientId: 'TokenClientId',
      clientSecret: 'TokenClientSecret'
    };

    mockClientCredentialsGrantCall(
      providerXsuaaUrl,
      { access_token: providerToken },
      200,
      destinationBindingClientSecretMock.credentials
    );

    mockInstanceDestinationsCall(nock, [destination], 200, providerToken);
    mockSubaccountDestinationsCall(nock, [], 200, providerToken);

    mockSingleDestinationCall(
      nock,
      destination,
      200,
      destinationName,
      wrapJwtInHeader(providerToken).headers
    );

    nock(destination.URL, {
      reqheaders: {
        authorization: 'Bearer some.token',
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}`)
      .reply(200, {});

    const request = testEntityApi.requestBuilder().getAll().execute({
      destinationName: 'FINAL-DESTINATION'
    });

    await expect(request).resolves.not.toThrow();
  });
});
