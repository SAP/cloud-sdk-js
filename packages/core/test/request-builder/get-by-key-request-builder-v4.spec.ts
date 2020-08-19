/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { GetByKeyRequestBuilderV4, uriConverterV4 } from '../../src/odata/v4/';
import { muteLoggers } from '../test-util/mute-logger';
import {
  defaultDestination,
  mockGetRequest
} from '../test-util/request-mocker';
import {
  createOriginalTestEntityData1,
  createTestEntityV4,
  testEntityResourcePath
} from '../test-util/test-data';
import { TestEntity } from '../test-util/test-services/v4/test-service';

const { convertToUriFormat } = uriConverterV4;

describe('GetByKeyRequestBuilderV4', () => {
  beforeAll(() => {
    muteLoggers('http-agent');
  });

  describe('execute', () => {
    it('returns entity by key', async () => {
      const entityData = createOriginalTestEntityData1();
      const expected = createTestEntityV4(entityData);

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

      const actual = await new GetByKeyRequestBuilderV4(TestEntity, {
        KeyPropertyGuid: expected.keyPropertyGuid,
        KeyPropertyString: expected.keyPropertyString
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
    const expected = createTestEntityV4(entityData);

    mockGetRequest({
      path: testEntityResourcePath(
        expected.keyPropertyGuid,
        expected.keyPropertyString,
        convertToUriFormat
      ),
      responseBody: entityData
    });

    const actual = await new GetByKeyRequestBuilderV4(TestEntity, {
      KeyPropertyGuid: expected.keyPropertyGuid,
      KeyPropertyString: expected.keyPropertyString
    }).execute(defaultDestination);
    expected.setVersionIdentifier(versionIdentifier);
    expect(actual).toEqual(expected);
  });

  it('etag should be pulled from response header when json payload has no @odata.etag property', async () => {
    const entityData = createOriginalTestEntityData1();
    const expected = createTestEntityV4(entityData);
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

    const actual = await new GetByKeyRequestBuilderV4(TestEntity, {
      KeyPropertyGuid: expected.keyPropertyGuid,
      KeyPropertyString: expected.keyPropertyString
    }).execute(defaultDestination);
    expect(actual).toEqual(expected);
  });
});
