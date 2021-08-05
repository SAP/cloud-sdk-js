import {
  defaultDestination,
  mockGetRequest
} from '../../../test/test-util/request-mocker';
import {
  createOriginalTestEntityData1,
  createOriginalTestEntityWithEnumKeyData,
  createTestEntity,
  createTestEntityWithEnumKey,
  testEntityResourcePath
} from '../../../test/test-util/test-data';
import {
  TestEntity,
  TestEntityWithEnumKey
} from '../../../test/test-util/test-services/v4/test-service';
import { uriConverter } from '../uri-conversion';
import { GetByKeyRequestBuilder } from './get-by-key-request-builder';

const { convertToUriFormat } = uriConverter;

describe('GetByKeyRequestBuilder', () => {
  describe('execute', () => {
    it('returns entity by key', async () => {
      const entityData = createOriginalTestEntityData1();
      const expected = createTestEntity(entityData);

      mockGetRequest(
        {
          path: testEntityResourcePath(
            expected.keyPropertyGuid,
            expected.keyPropertyString,
            convertToUriFormat
          ),
          responseBody: entityData
        },
        TestEntity
      );

      const actual = await new GetByKeyRequestBuilder(TestEntity, {
        KeyPropertyGuid: expected.keyPropertyGuid,
        KeyPropertyString: expected.keyPropertyString
      }).execute(defaultDestination);
      expect(actual).toEqual(expected);
    });

    it('returns entity with enum type as a key', async () => {
      const entityData = createOriginalTestEntityWithEnumKeyData();
      const expected = createTestEntityWithEnumKey(entityData);

      mockGetRequest(
        {
          path: "A_TestEntityWithEnumKey(KeyPropertyEnum1='Member1')",
          responseBody: entityData
        },
        TestEntityWithEnumKey
      );

      const actual = await new GetByKeyRequestBuilder(TestEntityWithEnumKey, {
        KeyPropertyEnum1: expected.keyPropertyEnum1
      }).execute(defaultDestination);
      expect(actual).toEqual(expected);
    });
  });

  it('is possible to use untyped properties', async () => {
    const entityData1 = {
      SomethingTheSDKDoesNotSupport: 'SomeValue'
    };

    mockGetRequest({
      query: { $select: 'SomethingTheSDKDoesNotSupport' },
      responseBody: { value: [entityData1] }
    });

    const actual = await TestEntity.requestBuilder()
      .getAll()
      .select(TestEntity.SOMETHING_THE_SDK_DOES_NOT_SUPPORT)
      .execute(defaultDestination);
    expect(actual[0].somethingTheSdkDoesNotSupport).toBe('SomeValue');
  });

  it('etag should be pulled from @odata.etag', async () => {
    const entityData = createOriginalTestEntityData1();
    const versionIdentifier = 'etagInMetadata';
    entityData['@odata.etag'] = versionIdentifier;
    const expected = createTestEntity(entityData);

    mockGetRequest({
      path: testEntityResourcePath(
        expected.keyPropertyGuid,
        expected.keyPropertyString,
        convertToUriFormat
      ),
      responseBody: entityData
    });

    const actual = await new GetByKeyRequestBuilder(TestEntity, {
      KeyPropertyGuid: expected.keyPropertyGuid,
      KeyPropertyString: expected.keyPropertyString
    }).execute(defaultDestination);
    expected.setVersionIdentifier(versionIdentifier);
    expect(actual).toEqual(expected);
  });

  it('etag should be pulled from response header when json payload has no @odata.etag property', async () => {
    const entityData = createOriginalTestEntityData1();
    const expected = createTestEntity(entityData);
    const versionIdentifier = 'etagInHeader';
    expected.setVersionIdentifier(versionIdentifier);

    mockGetRequest({
      path: testEntityResourcePath(
        expected.keyPropertyGuid,
        expected.keyPropertyString,
        convertToUriFormat
      ),
      responseBody: entityData,
      responseHeaders: { Etag: versionIdentifier }
    });

    const actual = await new GetByKeyRequestBuilder(TestEntity, {
      KeyPropertyGuid: expected.keyPropertyGuid,
      KeyPropertyString: expected.keyPropertyString
    }).execute(defaultDestination);
    expect(actual).toEqual(expected);
  });
});
