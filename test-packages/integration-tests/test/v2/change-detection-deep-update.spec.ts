import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import nock from 'nock';
import { basicHeader } from '@sap-cloud-sdk/connectivity/internal';
import {
  testEntityKeyPropGuid,
  testEntityKeyPropString
} from '../test-data/keys';
import { testEntityApi, testEntitySingleLinkApi } from './test-util';

function mockCsrfTokenRequest(
  host: string,
  authHeader: string,
  csrfToken: string,
  path?: string
) {
  nock(host, {
    reqheaders: {
      authorization: authHeader,
      'x-csrf-token': 'Fetch'
    }
  })
    .head(
      path
        ? `${TestEntity._defaultServicePath}/${path}`
        : TestEntity._defaultServicePath
    )
    .reply(200, '', {
      'x-csrf-token': csrfToken,
      'Set-Cookie': ['key1=val1', 'key2=val2', 'key3=val3']
    });
}

function mockUpdateRequest(
  host: string,
  authHeader: string,
  csrfToken: string,
  entityNameWithKey: string,
  payload: { [key: string]: any }
) {
  return nock(host, {
    reqheaders: {
      authorization: authHeader,
      accept: 'application/json',
      'content-type': 'application/json',
      'x-csrf-token': csrfToken,
      cookie: 'key1=val1;key2=val2;key3=val3'
    }
  })
    .patch(`${TestEntity._defaultServicePath}/${entityNameWithKey}`, payload)
    .reply(204);
}

describe('deep-update and change detection', () => {
  const destination = {
    url: 'https://example.com',
    username: 'USERNAME',
    password: 'PASSWORD'
  };
  const testBasicHeader = 'Basic VVNFUk5BTUU6UEFTU1dPUkQ=';
  const csrfToken = 'csrf-token';

  it('change detection ignores navigation properties and complex types', async () => {
    const testEntity = testEntityApi
      .entityBuilder()
      .stringProperty('yes')
      .booleanProperty(false)
      .int16Property(1234)
      .keyPropertyGuid(testEntityKeyPropGuid)
      .keyPropertyString(testEntityKeyPropString)
      .build()
      .setOrInitializeRemoteState();

    testEntity.stringProperty = 'yes';
    testEntity.toSingleLink = testEntitySingleLinkApi
      .entityBuilder()
      .stringProperty('abc')
      .build();
    testEntity.complexTypeProperty = {
      stringProperty: 'test',
      booleanProperty: true
    };

    mockCsrfTokenRequest(destination.url, testBasicHeader, csrfToken);
    mockUpdateRequest(
      destination.url,
      testBasicHeader,
      csrfToken,
      `A_TestEntity(KeyPropertyGuid=guid%27${testEntityKeyPropGuid}%27,KeyPropertyString=%27${testEntityKeyPropString}%27)`,
      {
        StringProperty: 'yes'
      }
    );

    const request = testEntityApi
      .requestBuilder()
      .update(testEntity)
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('change detection can be overruled by explicitly requiring a field', async () => {
    const testEntity = testEntityApi
      .entityBuilder()
      .stringProperty('yes')
      .booleanProperty(false)
      .int16Property(1234)
      .keyPropertyGuid(testEntityKeyPropGuid)
      .keyPropertyString(testEntityKeyPropString)
      .build()
      .setOrInitializeRemoteState();

    testEntity.stringProperty = 'no';
    testEntity.toSingleLink = testEntitySingleLinkApi
      .entityBuilder()
      .stringProperty('abc')
      .build();
    testEntity.complexTypeProperty = {
      stringProperty: 'test',
      booleanProperty: true
    };

    mockCsrfTokenRequest(
      destination.url,
      basicHeader(destination.username, destination.password),
      csrfToken,
      `A_TestEntity(KeyPropertyGuid=guid%27${testEntityKeyPropGuid}%27,KeyPropertyString=%27${testEntityKeyPropString}%27)`
    );

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(destination.username, destination.password),
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token': csrfToken,
        cookie: 'key1=val1;key2=val2;key3=val3'
      }
    })
      .patch(
        `${TestEntity._defaultServicePath}/A_TestEntity(KeyPropertyGuid=guid%27${testEntityKeyPropGuid}%27,KeyPropertyString=%27${testEntityKeyPropString}%27)`,
        {
          StringProperty: 'no',
          to_SingleLink: { StringProperty: 'abc' },
          ComplexTypeProperty: { BooleanProperty: true, StringProperty: 'test' }
        }
      )
      .reply(204);

    const request = testEntityApi
      .requestBuilder()
      .update(testEntity)
      .setRequiredFields(
        testEntityApi.schema.TO_SINGLE_LINK,
        testEntityApi.schema.COMPLEX_TYPE_PROPERTY
      )
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });
});
