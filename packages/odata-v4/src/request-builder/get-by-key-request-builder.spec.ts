import { TestEnumType } from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import {
  defaultDestination,
  mockGetRequest
} from '../../../../test-resources/test/test-util/request-mocker';
import { createOriginalTestEntityData1 } from '../../../../test-resources/test/test-util/test-data';
import {
  testEntityApi,
  testEntityWithEnumKeyApi,
  testEntityResourcePath,
  createTestEntityWithEnumKey,
  createTestEntity
} from '../../test/test-util';
import { GetByKeyRequestBuilder } from './get-by-key-request-builder';

function createOriginalTestEntityWithEnumKeyData() {
  return {
    KeyPropertyEnum1: TestEnumType.Member1
  };
}

describe('GetByKeyRequestBuilder', () => {
  describe('execute', () => {
    it('returns entity by key', async () => {
      const entityData = createOriginalTestEntityData1();
      const expected = createTestEntity(entityData);

      mockGetRequest(
        {
          path: testEntityResourcePath(
            expected.keyPropertyGuid,
            expected.keyPropertyString
          ),
          responseBody: entityData
        },
        testEntityApi
      );

      const actual = await new GetByKeyRequestBuilder(testEntityApi, {
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
        testEntityWithEnumKeyApi
      );

      const actual = await new GetByKeyRequestBuilder(
        testEntityWithEnumKeyApi,
        {
          KeyPropertyEnum1: expected.keyPropertyEnum1
        }
      ).execute(defaultDestination);
      expect(actual).toEqual(expected);
    });
  });

  it('is possible to use untyped properties', async () => {
    const entityData1 = {
      SomethingTheSDKDoesNotSupport: 'SomeValue'
    };

    mockGetRequest(
      {
        query: { $select: 'SomethingTheSDKDoesNotSupport' },
        responseBody: { value: [entityData1] }
      },
      testEntityApi
    );

    const actual = await testEntityApi
      .requestBuilder()
      .getAll()
      .select(testEntityApi.schema.SOMETHING_THE_SDK_DOES_NOT_SUPPORT)
      .execute(defaultDestination);
    expect(actual[0].somethingTheSdkDoesNotSupport).toBe('SomeValue');
  });

  it('ETag should be pulled from @odata.etag', async () => {
    const entityData = createOriginalTestEntityData1();
    const versionIdentifier = 'etagInMetadata';
    entityData['@odata.etag'] = versionIdentifier;
    const expected = createTestEntity(entityData);

    mockGetRequest(
      {
        path: testEntityResourcePath(
          expected.keyPropertyGuid,
          expected.keyPropertyString
        ),
        responseBody: entityData
      },
      testEntityApi
    );

    const actual = await new GetByKeyRequestBuilder(testEntityApi, {
      KeyPropertyGuid: expected.keyPropertyGuid,
      KeyPropertyString: expected.keyPropertyString
    }).execute(defaultDestination);
    expected.setVersionIdentifier(versionIdentifier);
    expect(actual).toEqual(expected);
  });

  it('ETag should be pulled from response header when json payload has no @odata.etag property', async () => {
    const entityData = createOriginalTestEntityData1();
    const expected = createTestEntity(entityData);
    const versionIdentifier = 'etagInHeader';
    expected.setVersionIdentifier(versionIdentifier);

    mockGetRequest(
      {
        path: testEntityResourcePath(
          expected.keyPropertyGuid,
          expected.keyPropertyString
        ),
        responseBody: entityData,
        responseHeaders: { Etag: versionIdentifier }
      },
      testEntityApi
    );

    const actual = await new GetByKeyRequestBuilder(testEntityApi, {
      KeyPropertyGuid: expected.keyPropertyGuid,
      KeyPropertyString: expected.keyPropertyString
    }).execute(defaultDestination);
    expect(actual).toEqual(expected);
  });
});
