import { createLogger } from '@sap-cloud-sdk/util';
import nock from 'nock';
import { v4 as uuid } from 'uuid';
import {
  defaultDestination,
  mockUpdateRequest
} from '../../../../test-resources/test/test-util';
import {
  testEntityApi,
  testEntityMultiLinkApi,
  testEntityResourcePath
} from '../../test/test-util';
import { UpdateRequestBuilder } from './update-request-builder';

function createTestEntity() {
  const keyPropGuid = uuid();
  const keyPropString = 'stringId';
  const int32Prop = 125;
  const stringProp = undefined;
  const booleanProp = null;

  return testEntityApi
    .entityBuilder()
    .keyPropertyGuid(keyPropGuid)
    .keyPropertyString(keyPropString)
    .int32Property(int32Prop)
    .stringProperty(stringProp)
    .booleanProperty(booleanProp)
    .build();
}

function createTestEntityWithStringProperty() {
  const keyPropGuid = uuid();
  const keyPropString = 'stringId';
  const stringProp = 'some value';

  return testEntityApi
    .entityBuilder()
    .keyPropertyGuid(keyPropGuid)
    .keyPropertyString(keyPropString)
    .stringProperty(stringProp)
    .build();
}

describe('UpdateRequestBuilder', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('no request is executed when there is no difference between current and remote state', async () => {
    const entity = createTestEntity().setOrInitializeRemoteState();
    const scope = nock(/.*/).get(/.*/).reply(500);
    const actual = await new UpdateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);
    expect(actual).toEqual(entity);
    expect(scope.isDone()).toBe(false);
  });

  it('no request is executed when only keys have been modified', async () => {
    const scope = nock(/.*/).get(/.*/).reply(500);
    const entity = createTestEntity().setOrInitializeRemoteState();
    entity.keyPropertyGuid = uuid();
    entity.keyPropertyString = 'UPDATED!';
    const actual = await new UpdateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);
    expect(actual).toEqual(entity);
    expect(scope.isDone()).toBe(false);
  });

  it('update request sends only non-key properties', async () => {
    const entity = createTestEntity();
    entity.booleanProperty = false;
    const requestBody = {
      Int32Property: entity.int32Property,
      BooleanProperty: false,
      StringProperty: null
    };

    mockUpdateRequest(
      {
        body: requestBody,
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        )
      },
      testEntityApi
    );

    const actual = await new UpdateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });

  it('update request includes new custom fields', async () => {
    const entity = createTestEntity();
    const customFieldVal = 'CUSTOM';
    entity.setCustomField('SomeCustomField', customFieldVal);

    const requestBody = {
      Int32Property: entity.int32Property,
      SomeCustomField: customFieldVal,
      StringProperty: null,
      BooleanProperty: null
    };

    mockUpdateRequest(
      {
        body: requestBody,
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        )
      },
      testEntityApi
    );

    const actual = await new UpdateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });

  it('update request includes updated custom fields', async () => {
    const entity = createTestEntity()
      .setCustomField('SomeCustomField', 'CUSTOM')
      .setOrInitializeRemoteState();

    const customFieldVal = 'UPDATED!';
    entity.setCustomField('SomeCustomField', customFieldVal);

    const requestBody = { SomeCustomField: customFieldVal };

    mockUpdateRequest(
      {
        body: requestBody,
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        )
      },
      testEntityApi
    );

    const actual = await new UpdateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });

  it('executes the update when nullable string is set to null', async () => {
    // Given: Entity with only key properties and one nullable string property which has non-null value
    const entity = createTestEntityWithStringProperty();

    const scope = mockUpdateRequest(
      {
        body: {
          StringProperty: null
        },
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        )
      },
      testEntityApi
    );

    // When: We update the nullable string property value to null
    entity.stringProperty = null;

    const actual = await new UpdateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);

    // Then: We expect the update to happen (http request is sent) and the value of the property to be null
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
    expect(actual.stringProperty).toBeNull();
    expect(scope.isDone()).toBe(true);
  });

  it('executes the update when nullable string is set to undefined', async () => {
    // Given: Entity with only key properties and one nullable string property which has non-null value
    const entity = createTestEntityWithStringProperty();

    const scope = mockUpdateRequest(
      {
        body: {
          StringProperty: null
        },
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        )
      },
      testEntityApi
    );

    // When: We update the nullable string property value to undefined
    entity.stringProperty = undefined;

    const actual = await new UpdateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);

    // Then: We expect the update to happen (http request is sent) and the value of the property to be null
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
    expect(actual.stringProperty).toBeUndefined();
    expect(scope.isDone()).toBe(true);
  });

  it('update request sends the whole entity when using PUT', async () => {
    const entity = createTestEntity();

    const putRequestBody = {
      KeyPropertyGuid: entity.keyPropertyGuid,
      KeyPropertyString: entity.keyPropertyString,
      Int32Property: entity.int32Property,
      StringProperty: null,
      BooleanProperty: null
    };

    mockUpdateRequest(
      {
        body: putRequestBody,
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        ),
        method: 'put'
      },
      testEntityApi
    );

    const actual = await new UpdateRequestBuilder(testEntityApi, entity)
      .replaceWholeEntityWithPut()
      .execute(defaultDestination);

    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });

  it('update request includes required fields', async () => {
    const entity = createTestEntity().setOrInitializeRemoteState();
    const requestBody = { KeyPropertyGuid: entity.keyPropertyGuid };

    const scope = mockUpdateRequest(
      {
        body: requestBody,
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        )
      },
      testEntityApi
    );

    const actual = await new UpdateRequestBuilder(testEntityApi, entity)
      .setRequiredFields(testEntityApi.schema.KEY_PROPERTY_GUID)
      .execute(defaultDestination);

    expect(scope.isDone()).toBe(true);
    expect(actual).toEqual(entity);
  });

  it('update request excludes ignored properties', async () => {
    const keyPropGuid = uuid();
    const keyPropString = 'stringId';

    const entity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid(keyPropGuid)
      .keyPropertyString(keyPropString)
      .build();

    const scope = nock(/.*/).patch(/.*/).reply(500);

    const actual = await new UpdateRequestBuilder(testEntityApi, entity)
      .setIgnoredFields(testEntityApi.schema.INT_32_PROPERTY)
      .execute(defaultDestination);

    expect(scope.isDone()).toBe(false);
    expect(actual).toEqual(entity);
  });

  it('update request should contain version identifier when set on entity', async () => {
    const entity = createTestEntity().setVersionIdentifier('not-a-star');
    const requestBody = {
      Int32Property: entity.int32Property,
      StringProperty: null,
      BooleanProperty: null
    };

    mockUpdateRequest(
      {
        body: requestBody,
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        ),
        additionalHeaders: { 'if-match': 'not-a-star' }
      },
      testEntityApi
    );

    const actual = await new UpdateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });

  it('update request should contain version identifier when set on request', async () => {
    const entity = createTestEntity().setVersionIdentifier('not-a-star');
    const requestBody = {
      Int32Property: entity.int32Property,
      StringProperty: null,
      BooleanProperty: null
    };
    const customVersionIdentifier = 'custom-version-identifier';

    mockUpdateRequest(
      {
        body: requestBody,
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        ),
        additionalHeaders: { 'if-match': customVersionIdentifier }
      },
      testEntityApi
    );

    const actual = await new UpdateRequestBuilder(testEntityApi, entity)
      .setVersionIdentifier(customVersionIdentifier)
      .execute(defaultDestination);

    expect(actual).toEqual(entity.setOrInitializeRemoteState());
    expect(actual.versionIdentifier).toBe(customVersionIdentifier);
  });

  it('should ignore version identifier', async () => {
    const entity = createTestEntity().setVersionIdentifier('not-a-star');
    const requestBody = {
      Int32Property: entity.int32Property,
      StringProperty: null,
      BooleanProperty: null
    };

    mockUpdateRequest(
      {
        body: requestBody,
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        ),
        additionalHeaders: { 'if-match': '*' }
      },
      testEntityApi
    );

    const actual = await new UpdateRequestBuilder(testEntityApi, entity)
      .ignoreVersionIdentifier()
      .execute(defaultDestination);

    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });

  it('throws an error when request execution fails', async () => {
    const entity = createTestEntity();

    mockUpdateRequest(
      {
        body: () => true,
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        ),
        statusCode: 500
      },
      testEntityApi
    );

    const updateRequest = new UpdateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);

    await expect(updateRequest).rejects.toThrow('OData update request failed!');
  });

  it('should set the remote state and ETag', async () => {
    const eTag = 'someEtag';

    const entity = createTestEntity().setVersionIdentifier('not-a-star');
    const requestBody = {
      Int32Property: entity.int32Property,
      StringProperty: null,
      BooleanProperty: null
    };

    mockUpdateRequest(
      {
        body: requestBody,
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        ),
        statusCode: 204,
        responseHeaders: { Etag: eTag }
      },
      testEntityApi
    );

    const actual = await new UpdateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);

    expect(actual['_versionIdentifier']).toBe(eTag);
    expect(actual['remoteState']).toEqual(entity);
  });

  it('warns if navigation properties are sent', async () => {
    const entity = createTestEntity();
    entity.toMultiLink = [
      testEntityMultiLinkApi.entityBuilder().keyProperty('someKey').build()
    ];
    const logger = createLogger('update-request-builder-v2');
    const warnSpy = jest.spyOn(logger, 'warn');

    mockUpdateRequest(
      {
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString
        ),
        statusCode: 201
      },
      testEntityApi
    );

    await new UpdateRequestBuilder(testEntityApi, entity).execute(
      defaultDestination
    );

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        'Update of navigation properties is not supported and will be ignored.'
      )
    );
  });

  describe('executeRaw', () => {
    it('returns undefined when only keys have been modified', async () => {
      const entity = createTestEntity().setOrInitializeRemoteState();
      entity.keyPropertyGuid = uuid();
      entity.keyPropertyString = 'UPDATED!';
      const actual = await new UpdateRequestBuilder(
        testEntityApi,
        entity
      ).executeRaw(defaultDestination);
      expect(actual).toEqual(undefined);
    });

    it('returns request and raw response when sending non-key properties', async () => {
      const entity = createTestEntity();
      entity.booleanProperty = false;
      const body = {
        Int32Property: entity.int32Property,
        BooleanProperty: false,
        StringProperty: null
      };

      mockUpdateRequest(
        {
          body,
          path: testEntityResourcePath(
            entity.keyPropertyGuid,
            entity.keyPropertyString
          )
        },
        testEntityApi
      );

      const actual = await new UpdateRequestBuilder(
        testEntityApi,
        entity
      ).executeRaw(defaultDestination);
      expect(actual?.status).toEqual(204);
      expect(actual?.request.method).toEqual('PATCH');
    });
  });
});
