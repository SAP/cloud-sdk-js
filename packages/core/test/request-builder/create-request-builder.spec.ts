/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock = require('nock');
import { v4 as uuid } from 'uuid';
import { CreateRequestBuilder } from '../../src';
import { muteLoggers } from '../test-util/mute-logger';
import {
  defaultDestination,
  mockCreateRequest
} from '../test-util/request-mocker';
import { testEntityResourcePath } from '../test-util/test-data';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '../test-util/test-services/v2/test-service';
import { testPostRequestOutcome } from '../test-util/testPostRequestOutcome';

describe('CreateRequestBuilder', () => {
  beforeAll(() => {
    muteLoggers('http-agent', 'entity-builder');
  });

  afterAll(() => {
    nock.cleanAll();
  });

  it('create an entity with field properties', async () => {
    const keyProp = uuid();
    const stringProp = 'testStr';
    const postBody = { KeyPropertyGuid: keyProp, StringProperty: stringProp };

    mockCreateRequest({
      body: postBody
    });

    const entity = TestEntity.builder()
      .keyPropertyGuid(keyProp)
      .stringProperty(stringProp)
      .build();

    const actual = await new CreateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );

    testPostRequestOutcome(actual, entity.setOrInitializeRemoteState());
  });

  it('should set the remote state and etag', async () => {
    const stringProp = 'etagTest';
    const eTag = 'someEtag';

    const postBody = {
      StringProperty: stringProp
    };

    mockCreateRequest({
      body: postBody,
      responseBody: {
        ...postBody,
        __metadata: { etag: eTag }
      }
    });

    const entity = TestEntity.builder().stringProperty(stringProp).build();
    const actual = await new CreateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );

    expect(actual['_versionIdentifier']).toBe(eTag);
    expect(actual['remoteState']).toEqual(entity);
  });

  it('create an entity with a single link property', async () => {
    const stringProp = 'test';
    const postBody = { to_SingleLink: { StringProperty: stringProp } };

    mockCreateRequest({
      body: postBody
    });

    const entity = TestEntity.builder()
      .toSingleLink(
        TestEntitySingleLink.builder().stringProperty(stringProp).build()
      )
      .build();

    const actual = await new CreateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );

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
      responseBody: { to_MultiLink: { results: linkedEntityBody } }
    });

    const entity = TestEntity.builder()
      .toMultiLink([
        TestEntityMultiLink.builder()
          .keyProperty(keyProp)
          .stringProperty(stringProp)
          .build()
      ])
      .build();

    const actual = await new CreateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );

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
      body: postBody
    });

    const entity = TestEntity.builder()
      .keyPropertyGuid(keyProp)
      .stringProperty(stringProp)
      .withCustomFields(customFields)
      .build();

    const actual = await new CreateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );

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

    const parentEntity = TestEntity.builder()
      .keyPropertyGuid(parentKeyGuid)
      .keyPropertyString(parentKeyString)
      .build();

    const postBody = { BooleanProperty: booleanProp, Int16Property: int16Prop };

    const toChildPath = `${testEntityResourcePath(
      parentKeyGuid,
      parentKeyString
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

    const someEntity = TestEntity.builder().stringProperty('').build();

    const createRequest = new CreateRequestBuilder(
      TestEntity,
      someEntity
    ).execute(defaultDestination);

    await expect(createRequest).rejects.toThrowErrorMatchingSnapshot();
  });
});
