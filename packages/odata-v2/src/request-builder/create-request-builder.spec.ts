import nock = require('nock');
import { v4 as uuid } from 'uuid';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v2/test-service';
import { createUriConverter } from '@sap-cloud-sdk/odata-common/internal';
import {
  defaultDestination,
  defaultHost,
  mockCreateRequest
} from '../../../../test-resources/test/test-util/request-mocker';
import { testEntityResourcePath } from '../../../../test-resources/test/test-util/test-data';
import { testPostRequestOutcome } from '../../../../test-resources/test/test-util/testPostRequestOutcome';
import { defaultDeSerializers } from '../de-serializers';
import { testEntityApi } from '../../test/test-util';
import { CreateRequestBuilder } from './create-request-builder';

describe('CreateRequestBuilder', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('create an entity with field properties', async () => {
    const keyProp = uuid();
    const stringProp = 'testStr';
    const postBody = { KeyPropertyGuid: keyProp, StringProperty: stringProp };

    mockCreateRequest({
      body: postBody,
      path: 'A_TestEntity'
    });

    const entity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid(keyProp)
      .stringProperty(stringProp)
      .build();

    const actual = await new CreateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);

    testPostRequestOutcome(actual, entity.setOrInitializeRemoteState());
  });

  it('should set the remote state and ETag', async () => {
    const stringProp = 'etagTest';
    const eTag = 'someEtag';

    const postBody = {
      StringProperty: stringProp
    };

    mockCreateRequest({
      body: postBody,
      path: 'A_TestEntity',
      responseBody: {
        ...postBody,
        __metadata: { etag: eTag }
      }
    });

    const entity = testEntityApi
      .entityBuilder()
      .stringProperty(stringProp)
      .build();
    const actual = await new CreateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);

    expect(actual['_versionIdentifier']).toBe(eTag);
    expect(actual['remoteState']).toEqual(entity);
  });

  it('create an entity with a single link property', async () => {
    const stringProp = 'test';
    const postBody = { to_SingleLink: { StringProperty: stringProp } };

    mockCreateRequest({
      body: postBody,
      path: 'A_TestEntity'
    });

    const entity = testEntityApi
      .entityBuilder()
      .toSingleLink(
        TestEntitySingleLink.builder().stringProperty(stringProp).build()
      )
      .build();

    const actual = await new CreateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);

    testPostRequestOutcome(actual, entity.setOrInitializeRemoteState());
  });

  it('create an entity with a multi link property', async () => {
    const keyProp = 'test';
    const stringProp = 'someStr';

    const linkedEntityBody = [
      { KeyProperty: keyProp, StringProperty: stringProp }
    ];

    mockCreateRequest({
      body: { to_MultiLink: linkedEntityBody },
      path: 'A_TestEntity',
      responseBody: { to_MultiLink: { results: linkedEntityBody } }
    });

    const entity = testEntityApi
      .entityBuilder()
      .toMultiLink([
        TestEntityMultiLink.builder()
          .keyProperty(keyProp)
          .stringProperty(stringProp)
          .build()
      ])
      .build();

    const actual = await new CreateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);

    testPostRequestOutcome(actual, entity.setOrInitializeRemoteState());
  });

  it('create an entity with custom fields', async () => {
    const keyProp = uuid();
    const stringProp = 'test';

    const customFields = {
      CustomField1: 'abcd',
      CustomField2: 1234,
      CustomField3: { Attribute1: '1', Attribute2: false }
    };

    const postBody = {
      KeyPropertyGuid: keyProp,
      StringProperty: stringProp,
      ...customFields
    };

    mockCreateRequest({
      body: postBody,
      path: 'A_TestEntity'
    });

    const entity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid(keyProp)
      .stringProperty(stringProp)
      .withCustomFields(customFields)
      .build();

    const actual = await new CreateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);

    testPostRequestOutcome(actual, entity.setOrInitializeRemoteState());
  });

  it('create entity as a child of an entity', async () => {
    const booleanProp = false;
    const int16Prop = 17;
    const parentKeyGuid = uuid();
    const parentKeyString = 'test-key';

    const childEntity = TestEntityMultiLink.builder()
      .booleanProperty(booleanProp)
      .int16Property(int16Prop)
      .build();

    const parentEntity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid(parentKeyGuid)
      .keyPropertyString(parentKeyString)
      .build();

    const postBody = { BooleanProperty: booleanProp, Int16Property: int16Prop };

    const toChildPath = `${testEntityResourcePath(
      parentKeyGuid,
      parentKeyString,
      createUriConverter(defaultDeSerializers)
    )}/to_MultiLink`;

    mockCreateRequest({
      body: postBody,
      path: toChildPath
    });

    const actual = await new CreateRequestBuilder(
      TestEntityMultiLink,
      childEntity
    )
      .asChildOf(parentEntity, TestEntity.TO_MULTI_LINK)
      .execute(defaultDestination);

    testPostRequestOutcome(actual, childEntity.setOrInitializeRemoteState());
  });

  it('throws an error when request execution fails', async () => {
    mockCreateRequest({
      body: () => true,
      statusCode: 500
    });

    const someEntity = testEntityApi.entityBuilder().stringProperty('').build();

    const createRequest = new CreateRequestBuilder(
      testEntityApi,
      someEntity
    ).execute(defaultDestination);

    await expect(createRequest).rejects.toThrowErrorMatchingSnapshot();
  });

  it('create an entity with csrf token request when the option is set to false', async () => {
    const keyProp = uuid();
    const stringProp = 'testStr';
    const postBody = { KeyPropertyGuid: keyProp, StringProperty: stringProp };

    nock(defaultHost)
      .post(
        '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity',
        postBody
      )
      .reply(200, { d: postBody }, {});

    const entity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid(keyProp)
      .stringProperty(stringProp)
      .build();

    const actual = await new CreateRequestBuilder(testEntityApi, entity)
      .skipCsrfTokenFetching()
      .execute(defaultDestination);

    testPostRequestOutcome(actual, entity.setOrInitializeRemoteState());
  });

  describe('executeRaw', () => {
    it('returns request and raw response', async () => {
      const keyProp = uuid();
      const stringProp = 'testStr';
      const postBody = { KeyPropertyGuid: keyProp, StringProperty: stringProp };

      mockCreateRequest({
        body: postBody,
        path: 'A_TestEntity'
      });

      const entity = testEntityApi
        .entityBuilder()
        .keyPropertyGuid(keyProp)
        .stringProperty(stringProp)
        .build();

      const actual = await new CreateRequestBuilder(
        testEntityApi,
        entity
      ).executeRaw(defaultDestination);

      expect(actual.data.d).toEqual(postBody);
      expect(actual.request.method).toBe('POST');
    });
  });
});
