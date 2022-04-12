import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import nock from 'nock';
import { basicHeader } from '@sap-cloud-sdk/connectivity/internal';
import { Destination } from '@sap-cloud-sdk/connectivity';
import { singleTestEntityResponse } from '../test-data/single-test-entity-response';
import { testEntityCollectionResponse } from '../test-data/test-entity-collection-response';
import { testEntityApi } from './test-util';

const basicHeaderCSRF = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';
const servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const csrfToken = 'CSRFTOKEN';
const entityName = TestEntity._entityName;

function mockCsrfTokenRequest(host: string, sapClient: string, path?: string) {
  nock(host, {
    reqheaders: {
      authorization: basicHeaderCSRF,
      'x-csrf-token': 'Fetch',
      'sap-client': sapClient
    }
  })
    .head(path ? `${servicePath}/${path}` : servicePath)
    .reply(200, '', {
      'x-csrf-token': csrfToken,
      'Set-Cookie': ['key1=val1', 'key2=val2', 'key3=val3']
    });
}

const getAllResponseWithCustomField = injectCustomField(
  testEntityCollectionResponse()
);

const destination: Destination = {
  url: 'https://example.com',
  username: 'username',
  password: 'password',
  sapClient: '123',
  authTokens: [],
  originalProperties: {}
};

describe('Custom Fields', () => {
  it('entities with custom fields should be deserialized correctly', async () => {
    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(
          destination.username!,
          destination.password!
        ),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}`)
      .reply(200, getAllResponseWithCustomField);

    const entities = await testEntityApi
      .requestBuilder()
      .getAll()
      .execute(destination);
    const actual = entities[0].getCustomField('MyCustomField');
    expect(actual).toBe('InjectedCustomField');
  });

  it('should be selectable', async () => {
    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(
          destination.username!,
          destination.password!
        ),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}?$select=MyCustomField`)
      .reply(200, getAllResponseWithCustomField);

    const request = testEntityApi
      .requestBuilder()
      .getAll()
      .select(testEntityApi.customField('MyCustomField'))
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should be filterable', async () => {
    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(
          destination.username!,
          destination.password!
        ),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(
        `${servicePath}/${entityName}?$filter=(MyCustomField%20eq%20%27ToMatch%27)`
      )
      .reply(200, getAllResponseWithCustomField);

    const request = testEntityApi
      .requestBuilder()
      .getAll()
      .filter(
        testEntityApi.customField('MyCustomField').edmString().equals('ToMatch')
      )
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for update requests', async () => {
    mockCsrfTokenRequest(
      destination.url,
      destination.sapClient!,
      `${entityName}(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)`
    );

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(
          destination.username!,
          destination.password!
        ),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/${entityName}`)
      .reply(200, getAllResponseWithCustomField);

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(
          destination.username!,
          destination.password!
        ),
        accept: 'application/json',
        'content-type': 'application/json',
        cookie: 'key1=val1;key2=val2;key3=val3'
      }
    })
      .patch(
        `${servicePath}/${entityName}(KeyPropertyGuid=guid%27aaaabbbb-cccc-dddd-eeee-ffff00001111%27,KeyPropertyString=%27abcd1234%27)`,
        {
          MyCustomField: 'NewValue'
        }
      )
      .reply(204);

    const entities = await testEntityApi
      .requestBuilder()
      .getAll()
      .execute(destination);
    const entity = entities[0];
    entity.setCustomField('MyCustomField', 'NewValue');

    const request = testEntityApi
      .requestBuilder()
      .update(entity)
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('should resolve for create requests', async () => {
    mockCsrfTokenRequest(destination.url, destination.sapClient!, entityName);
    const response = singleTestEntityResponse();

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(
          destination.username!,
          destination.password!
        ),
        accept: 'application/json',
        'content-type': 'application/json',
        cookie: 'key1=val1;key2=val2;key3=val3'
      }
    })
      .post(`${servicePath}/${entityName}`, {
        StringProperty: 'stringProp',
        Int16Property: 19,
        MyCustomField: 'CustomField'
      })
      .reply(200, response);

    const request = testEntityApi
      .requestBuilder()
      .create(
        testEntityApi
          .entityBuilder()
          .stringProperty('stringProp')
          .int16Property(19)
          .withCustomFields({ MyCustomField: 'CustomField' })
          .build()
      )
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });
});

function injectCustomField(getAll): { d: { results: TestEntity[] } } {
  const results = getAll.d.results.map(result => {
    result['MyCustomField'] = 'InjectedCustomField';
    return result;
  });
  return { d: { results } };
}
