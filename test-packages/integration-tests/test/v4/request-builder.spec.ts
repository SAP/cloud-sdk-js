import nock from 'nock';
import { basicHeader } from '@sap-cloud-sdk/connectivity/internal';
import { testService } from '@sap-cloud-sdk/test-services/v4/test-service';
import { testEntityCollectionResponse } from '../test-data/test-entity-collection-response-v4';
import { singleTestEntityResponse } from '../test-data/single-test-entity-response-v4';

const testEntityApi = testService().testEntityApi;

const servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const entityName = 'A_TestEntity';
const username = 'username';
const password = 'password';
const url = 'https://example.com';

const getAllResponse = testEntityCollectionResponse();

let destination;

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

  it('should resolve for getByKey request', async () => {
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

  it('should resolve for update request', async () => {
    mockCsrfTokenRequest(
      `${entityName}(KeyPropertyGuid=aaaabbbb-cccc-dddd-eeee-ffff00001111,KeyPropertyString=%27abcd1234%27)`
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
        `${servicePath}/${entityName}(KeyPropertyGuid=aaaabbbb-cccc-dddd-eeee-ffff00001111,KeyPropertyString=%27abcd1234%27)`,
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

  it('should resolve for delete request using key fields', async () => {
    mockCsrfTokenRequest(
      `${entityName}(KeyPropertyGuid=aaaabbbb-cccc-dddd-eeee-ffff00001111,KeyPropertyString=%27abcd1234%27)`
    );

    const entity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid('aaaabbbb-cccc-dddd-eeee-ffff00001111')
      .keyPropertyString('abcd1234')
      .stringProperty('someContent')
      .build();

    const entityJson = entity.toJSON();

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
        `${servicePath}/${entityName}(KeyPropertyGuid=aaaabbbb-cccc-dddd-eeee-ffff00001111,KeyPropertyString=%27abcd1234%27)`
      )
      .reply(200, entityJson);

    const request = testEntityApi
      .requestBuilder()
      .delete(entity.keyPropertyGuid, entity.keyPropertyString)
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });
});
