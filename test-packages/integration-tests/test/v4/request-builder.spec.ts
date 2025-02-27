import nock from 'nock';
import { basicHeader } from '@sap-cloud-sdk/connectivity/internal';
import { testService } from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import moment from 'moment';
import { testEntityCollectionResponse } from '../test-data/test-entity-collection-response-v4';
import { singleTestEntityResponse } from '../test-data/single-test-entity-response-v4';

const testEntityApi = testService().testEntityApi;

const basePath = '/sap/opu/odata/sap/API_TEST_SRV';
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
    .head(path ? `${basePath}/${path}/` : `${basePath}/`)
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
      .get(`${basePath}/${entityName}`)
      .reply(200, getAllResponse);

    const request = testEntityApi
      .requestBuilder()
      .getAll()
      .execute(destination);

    await expect(request).resolves.not.toThrow();
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
      .post(`${basePath}/${entityName}`, {
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
      );

    await expect(request.execute(destination)).resolves.not.toThrow();
  });

  it('should resolve for update request', async () => {
    mockCsrfTokenRequest(
      `${entityName}(KeyPropertyGuid=aaaabbbb-cccc-dddd-eeee-ffff00001111,KeyPropertyString='abcd1234',KeyDateProperty=1970-01-01)`
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
        `${basePath}/${entityName}(KeyPropertyGuid=aaaabbbb-cccc-dddd-eeee-ffff00001111,KeyPropertyString='abcd1234',KeyDateProperty=1970-01-01)`,
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
          .keyDateProperty(moment(0))
          .stringProperty('newStringProp')
          .build()
      )
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for delete request using key fields', async () => {
    mockCsrfTokenRequest(
      `${entityName}(KeyPropertyGuid=aaaabbbb-cccc-dddd-eeee-ffff00001111,KeyPropertyString='abcd1234',KeyDateProperty=2023-05-05)`
    );

    const entity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid('aaaabbbb-cccc-dddd-eeee-ffff00001111')
      .keyPropertyString('abcd1234')
      .keyDateProperty(moment.utc('2023-05-05', 'Y-MM-DD', true))
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
        `${basePath}/${entityName}(KeyPropertyGuid=aaaabbbb-cccc-dddd-eeee-ffff00001111,KeyPropertyString='abcd1234',KeyDateProperty=2023-05-05)`
      )
      .reply(200, entityJson);

    const request = testEntityApi
      .requestBuilder()
      .delete(
        entity.keyPropertyGuid,
        entity.keyPropertyString,
        entity.keyDateProperty!
      )
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });
});
