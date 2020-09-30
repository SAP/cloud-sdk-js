import nock from 'nock';
import { v4 as uuid } from 'uuid';
import { createLogger } from '@sap-cloud-sdk/util';
import { UpdateRequestBuilderV2 } from '../../../src';
import {
  defaultDestination,
  mockUpdateRequest
} from '../../test-util/request-mocker';
import { testEntityResourcePath } from '../../test-util/test-data';
import {
  TestEntity,
  TestEntityMultiLink
} from '../../test-util/test-services/v2/test-service';

function createTestEntity() {
  const keyPropGuid = uuid();
  const keyPropString = 'stringId';
  const int32Prop = 125;

  return TestEntity.builder()
    .keyPropertyGuid(keyPropGuid)
    .keyPropertyString(keyPropString)
    .int32Property(int32Prop)
    .build();
}

describe('UpdateRequestBuilderV2', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('no request is executed when there is no difference between current and remote state', async () => {
    const entity = createTestEntity().setOrInitializeRemoteState();
    const scope = nock(/.*/).get(/.*/).reply(500);
    const actual = await new UpdateRequestBuilderV2(TestEntity, entity).execute(
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
    const actual = await new UpdateRequestBuilderV2(TestEntity, entity).execute(
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
        entity.keyPropertyString
      )
    });

    const actual = await new UpdateRequestBuilderV2(TestEntity, entity).execute(
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
        entity.keyPropertyString
      )
    });

    const actual = await new UpdateRequestBuilderV2(TestEntity, entity).execute(
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
        entity.keyPropertyString
      )
    });

    const actual = await new UpdateRequestBuilderV2(TestEntity, entity).execute(
      defaultDestination
    );
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });

  it('update request sends the whole entity when using PUT', async () => {
    const entity = createTestEntity();

    const putRequestBody = {
      KeyPropertyGuid: entity.keyPropertyGuid,
      KeyPropertyString: entity.keyPropertyString,
      Int32Property: entity.int32Property
    };

    mockUpdateRequest({
      body: putRequestBody,
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString
      ),
      method: 'put'
    });

    const actual = await new UpdateRequestBuilderV2(TestEntity, entity)
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
        entity.keyPropertyString
      )
    });

    const actual = await new UpdateRequestBuilderV2(TestEntity, entity)
      .requiredFields(TestEntity.KEY_PROPERTY_GUID)
      .execute(defaultDestination);

    expect(scope.isDone()).toBe(true);
    expect(actual).toEqual(entity);
  });

  it('update request excludes ignored properties', async () => {
    const entity = createTestEntity();

    const scope = nock(/.*/).patch(/.*/).reply(500);

    const actual = await new UpdateRequestBuilderV2(TestEntity, entity)
      .ignoredFields(TestEntity.INT_32_PROPERTY)
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
        entity.keyPropertyString
      ),
      additionalHeaders: { 'if-match': 'not-a-star' }
    });

    const actual = await new UpdateRequestBuilderV2(TestEntity, entity).execute(
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
        entity.keyPropertyString
      ),
      additionalHeaders: { 'if-match': customVersionIdentifier }
    });

    const actual = await new UpdateRequestBuilderV2(TestEntity, entity)
      .withCustomVersionIdentifier(customVersionIdentifier)
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
        entity.keyPropertyString
      ),
      additionalHeaders: { 'if-match': '*' }
    });

    const actual = await new UpdateRequestBuilderV2(TestEntity, entity)
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

    const updateRequest = new UpdateRequestBuilderV2(
      TestEntity,
      entity
    ).execute(defaultDestination);

    await expect(updateRequest).rejects.toThrowErrorMatchingSnapshot();
  });

  it('should set the remote state and etag', async () => {
    const stringProp = 'etagTest';
    const eTag = 'someEtag';

    const entity = createTestEntity().setVersionIdentifier('not-a-star');
    const requestBody = { Int32Property: entity.int32Property };

    mockUpdateRequest({
      body: requestBody,
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString
      ),
      statusCode: 204,
      responseHeaders: { Etag: eTag }
    });

    const actual = await new UpdateRequestBuilderV2(TestEntity, entity).execute(
      defaultDestination
    );

    expect(actual['_versionIdentifier']).toBe(eTag);
    expect(actual['remoteState']).toEqual(entity);
  });

  it('warns if navigaton properties are sent', async () => {
    const entity = createTestEntity();
    entity.toMultiLink = [
      TestEntityMultiLink.builder().keyProperty('someKey').build()
    ];
    const requestBody = { Int32Property: entity.int32Property };
    const logger = createLogger('update-request-builder-v2');
    const warnSpy = jest.spyOn(logger, 'warn');

    mockUpdateRequest({
      path: testEntityResourcePath(
        entity.keyPropertyGuid,
        entity.keyPropertyString
      ),
      statusCode: 201
    });

    await new UpdateRequestBuilderV2(TestEntity, entity).execute(
      defaultDestination
    );

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        'Update of navigation properties is not supported in OData v2 by the SDK.'
      )
    );
  });
});
