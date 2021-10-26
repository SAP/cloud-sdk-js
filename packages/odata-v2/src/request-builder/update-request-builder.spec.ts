import nock from 'nock';
import { v4 as uuid } from 'uuid';
import { createLogger } from '@sap-cloud-sdk/util';
import {
  defaultDestination,
  mockUpdateRequest
} from '../../../core/test/test-util/request-mocker';
import { testEntityResourcePath } from '../../../core/test/test-util/test-data';
import {
  TestEntity,
  TestEntityMultiLink
} from '../../../core/test/test-util/test-services/v2/test-service';
import { uriConverter } from '../uri-conversion/uri-value-converter';
import { UpdateRequestBuilder } from './update-request-builder';

function createTestEntity() {
  const keyPropGuid = uuid();
  const keyPropString = 'stringId';
  const int32Prop = 125;
  const stringProp = undefined;
  const booleanProp = null;

  return TestEntity.builder()
    .keyPropertyGuid(keyPropGuid)
    .keyPropertyString(keyPropString)
    .int32Property(int32Prop)
    .stringProperty(stringProp)
    .booleanProperty(booleanProp)
    .build();
}

describe('UpdateRequestBuilder', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('no request is executed when there is no difference between current and remote state', async () => {
    const entity = createTestEntity().setOrInitializeRemoteState();
    const scope = nock(/.*/).get(/.*/).reply(500);
    const actual = await new UpdateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );
    expect(actual).toEqual(entity);
    expect(scope.isDone()).toBe(false);
  });

  it('no request is executed when only keys have been modified', async () => {
    const scope = nock(/.*/).get(/.*/).reply(500);
    const entity = createTestEntity().setOrInitializeRemoteState();
    entity.keyPropertyGuid = uuid();
    entity.keyPropertyString = 'UPDATED!';
    const actual = await new UpdateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );
    expect(actual).toEqual(entity);
    expect(scope.isDone()).toBe(false);
  });

  it('update request sends only non-key properties', async () => {
    const entity = createTestEntity();
    entity.booleanProperty = false;
    const requestBody = {
      Int32Property: entity.int32Property,
      BooleanProperty: false
    };

    mockUpdateRequest({
      body: requestBody,
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString,
        uriConverter.convertToUriFormat
      )
    });

    const actual = await new UpdateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });

  it('update request includes new custom fields', async () => {
    const entity = createTestEntity();
    const customFieldVal = 'CUSTOM';
    entity.setCustomField('SomeCustomField', customFieldVal);

    const requestBody = {
      Int32Property: entity.int32Property,
      SomeCustomField: customFieldVal
    };

    mockUpdateRequest({
      body: requestBody,
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString,
        uriConverter.convertToUriFormat
      )
    });

    const actual = await new UpdateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });

  it('update request includes updated custom fields', async () => {
    const entity = createTestEntity()
      .setCustomField('SomeCustomField', 'CUSTOM')
      .setOrInitializeRemoteState();

    const customFieldVal = 'UPDATED!';
    entity.setCustomField('SomeCustomField', customFieldVal);

    const requestBody = { SomeCustomField: customFieldVal };

    mockUpdateRequest({
      body: requestBody,
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString,
        uriConverter.convertToUriFormat
      )
    });

    const actual = await new UpdateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
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

    mockUpdateRequest({
      body: putRequestBody,
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString,
        uriConverter.convertToUriFormat
      ),
      method: 'put'
    });

    const actual = await new UpdateRequestBuilder(TestEntity, entity)
      .replaceWholeEntityWithPut()
      .execute(defaultDestination);

    expect(await actual).toEqual(entity.setOrInitializeRemoteState());
  });

  it('update request includes required fields', async () => {
    const entity = createTestEntity().setOrInitializeRemoteState();
    const requestBody = { KeyPropertyGuid: entity.keyPropertyGuid };

    const scope = mockUpdateRequest({
      body: requestBody,
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString,
        uriConverter.convertToUriFormat
      )
    });

    const actual = await new UpdateRequestBuilder(TestEntity, entity)
      .setRequiredFields(TestEntity.KEY_PROPERTY_GUID)
      .execute(defaultDestination);

    expect(scope.isDone()).toBe(true);
    expect(actual).toEqual(entity);
  });

  it('update request excludes ignored properties', async () => {
    const entity = createTestEntity();

    const scope = nock(/.*/).patch(/.*/).reply(500);

    const actual = await new UpdateRequestBuilder(TestEntity, entity)
      .setIgnoredFields(TestEntity.INT_32_PROPERTY)
      .execute(defaultDestination);

    expect(scope.isDone()).toBe(false);
    expect(actual).toEqual(entity);
  });

  it('update request should contain version identifier when set on entity', async () => {
    const entity = createTestEntity().setVersionIdentifier('not-a-star');
    const requestBody = { Int32Property: entity.int32Property };

    mockUpdateRequest({
      body: requestBody,
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString,
        uriConverter.convertToUriFormat
      ),
      additionalHeaders: { 'if-match': 'not-a-star' }
    });

    const actual = await new UpdateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });

  it('update request should contain version identifier when set on request', async () => {
    const entity = createTestEntity().setVersionIdentifier('not-a-star');
    const requestBody = { Int32Property: entity.int32Property };
    const customVersionIdentifier = 'custom-version-identifier';

    mockUpdateRequest({
      body: requestBody,
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString,
        uriConverter.convertToUriFormat
      ),
      additionalHeaders: { 'if-match': customVersionIdentifier }
    });

    const actual = await new UpdateRequestBuilder(TestEntity, entity)
      .setVersionIdentifier(customVersionIdentifier)
      .execute(defaultDestination);

    expect(actual).toEqual(entity.setOrInitializeRemoteState());
    expect(actual.versionIdentifier).toBe(customVersionIdentifier);
  });

  it('should ignore version identifier', async () => {
    const entity = createTestEntity().setVersionIdentifier('not-a-star');
    const requestBody = { Int32Property: entity.int32Property };

    mockUpdateRequest({
      body: requestBody,
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString,
        uriConverter.convertToUriFormat
      ),
      additionalHeaders: { 'if-match': '*' }
    });

    const actual = await new UpdateRequestBuilder(TestEntity, entity)
      .ignoreVersionIdentifier()
      .execute(defaultDestination);

    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });

  it('throws an error when request execution fails', async () => {
    const entity = createTestEntity();

    mockUpdateRequest({
      body: () => true,
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString
      ),
      statusCode: 500
    });

    const updateRequest = new UpdateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );

    await expect(updateRequest).rejects.toThrowErrorMatchingSnapshot();
  });

  it('should set the remote state and ETag', async () => {
    const eTag = 'someEtag';

    const entity = createTestEntity().setVersionIdentifier('not-a-star');
    const requestBody = { Int32Property: entity.int32Property };

    mockUpdateRequest({
      body: requestBody,
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString,
        uriConverter.convertToUriFormat
      ),
      statusCode: 204,
      responseHeaders: { Etag: eTag }
    });

    const actual = await new UpdateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );

    expect(actual['_versionIdentifier']).toBe(eTag);
    expect(actual['remoteState']).toEqual(entity);
  });

  it('warns if navigation properties are sent', async () => {
    const entity = createTestEntity();
    entity.toMultiLink = [
      TestEntityMultiLink.builder().keyProperty('someKey').build()
    ];
    const logger = createLogger('update-request-builder-v2');
    const warnSpy = jest.spyOn(logger, 'warn');

    mockUpdateRequest({
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString,
        uriConverter.convertToUriFormat
      ),
      statusCode: 201
    });

    await new UpdateRequestBuilder(TestEntity, entity).execute(
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
        TestEntity,
        entity
      ).executeRaw(defaultDestination);
      await expect(actual).toEqual(undefined);
    });

    it('returns request and raw response when sending non-key properties', async () => {
      const entity = createTestEntity();
      entity.booleanProperty = false;
      const requestBody = {
        Int32Property: entity.int32Property,
        BooleanProperty: false
      };
      const response = { d: requestBody };

      mockUpdateRequest({
        body: requestBody,
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString,
          uriConverter.convertToUriFormat
        ),
        responseBody: response
      });

      const actual = await new UpdateRequestBuilder(
        TestEntity,
        entity
      ).executeRaw(defaultDestination);
      expect(actual!.data).toEqual(response);
      expect(actual!.request.method).toEqual('PATCH');
    });
  });
});
