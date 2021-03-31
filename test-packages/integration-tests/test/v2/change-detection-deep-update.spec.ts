import {
  TestEntity,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v2/test-service';
import nock from 'nock';
import { basicHeader } from '@sap-cloud-sdk/core';
import {
  testEntityKeyPropGuid,
  testEntityKeyPropString
} from '../test-data/keys';

function mockCsrfTokenRequest(
  host: string,
  authHeader: string,
  csrfToken: string
) {
  nock(host, {
    reqheaders: {
      authorization: authHeader,
      'x-csrf-token': 'Fetch'
    }
  })
    .get(TestEntity._defaultServicePath)
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

const mockedBuildHeaderResponse = {
  'x-csrf-token': 'mocked-x-csrf-token',
  'set-cookie': ['mocked-cookie-0', 'mocked-cookie-1']
};

describe('deep-update and change detection', () => {
  const destination = {
    url: 'https://example.com',
    username: 'USERNAME',
    password: 'PASSWORD'
  };
  const testBasicHeader = 'Basic VVNFUk5BTUU6UEFTU1dPUkQ=';
  const csrfToken = 'csrf-token';

  it('change detection ignores navigation properties and complex types', async () => {
    const testEntity = TestEntity.builder()
      .stringProperty('yes')
      .booleanProperty(false)
      .int16Property(1234)
      .keyPropertyGuid(testEntityKeyPropGuid)
      .keyPropertyString(testEntityKeyPropString)
      .build()
      .setOrInitializeRemoteState();

    testEntity.stringProperty = 'yes';
    testEntity.toSingleLink = TestEntitySingleLink.builder()
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

    const request = TestEntity.requestBuilder()
      .update(testEntity)
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });

  it('change detection can be overruled by explicitly requiring a field', async () => {
    const testEntity = TestEntity.builder()
      .stringProperty('yes')
      .booleanProperty(false)
      .int16Property(1234)
      .keyPropertyGuid(testEntityKeyPropGuid)
      .keyPropertyString(testEntityKeyPropString)
      .build()
      .setOrInitializeRemoteState();

    testEntity.stringProperty = 'no';
    testEntity.toSingleLink = TestEntitySingleLink.builder()
      .stringProperty('abc')
      .build();
    testEntity.complexTypeProperty = {
      stringProperty: 'test',
      booleanProperty: true
    };

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(destination.username, destination.password),
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token': 'Fetch'
      }
    })
      .get(
        `${TestEntity._defaultServicePath}/A_TestEntity(KeyPropertyGuid=guid%27${testEntityKeyPropGuid}%27,KeyPropertyString=%27${testEntityKeyPropString}%27)`
      )
      .reply(200, undefined, mockedBuildHeaderResponse);

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
        `${TestEntity._defaultServicePath}/A_TestEntity(KeyPropertyGuid=guid%27${testEntityKeyPropGuid}%27,KeyPropertyString=%27${testEntityKeyPropString}%27)`,
        {
          StringProperty: 'no',
          to_SingleLink: { StringProperty: 'abc' },
          ComplexTypeProperty: { BooleanProperty: true, StringProperty: 'test' }
        }
      )
      .reply(204);

    const request = TestEntity.requestBuilder()
      .update(testEntity)
      .requiredFields(
        TestEntity.TO_SINGLE_LINK,
        TestEntity.COMPLEX_TYPE_PROPERTY
      )
      .execute(destination);

    await expect(request).resolves.not.toThrow();
  });
});
