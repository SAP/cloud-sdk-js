import nock = require('nock');
import { v4 as uuid } from 'uuid';
import {
  defaultDestination,
  mockGetRequest
} from '../../../test/test-util/request-mocker';
import {
  createOriginalTestEntityData1,
  createTestEntity,
  testEntityResourcePath
} from '../../../test/test-util/test-data';
import { TestEntity } from '../../../test/test-util/test-services/v2/test-service';
import { GetByKeyRequestBuilderV2 } from './get-by-key-request-builder';

describe('GetByKeyRequestBuilderV2', () => {
  describe('execute', () => {
    it('returns entity by key', async () => {
      const entityData = createOriginalTestEntityData1();
      const expected = createTestEntity(entityData);

      mockGetRequest({
        path: testEntityResourcePath(
          expected.keyPropertyGuid,
          expected.keyPropertyString
        ),
        responseBody: { d: entityData }
      });

      const actual = await new GetByKeyRequestBuilderV2(TestEntity, {
        KeyPropertyGuid: expected.keyPropertyGuid,
        KeyPropertyString: expected.keyPropertyString
      }).execute(defaultDestination);
      expect(actual).toEqual(expected);
      expect(actual.versionIdentifier).toBeUndefined();
    });

    it('etag should be pulled from __metadata', async () => {
      const entityData = createOriginalTestEntityData1();
      const versionIdentifier = 'etagInMetadata';
      entityData['__metadata'] = { etag: versionIdentifier };
      const expected = createTestEntity(entityData);

      mockGetRequest({
        path: testEntityResourcePath(
          expected.keyPropertyGuid,
          expected.keyPropertyString
        ),
        responseBody: { d: entityData }
      });

      const actual = await new GetByKeyRequestBuilderV2(TestEntity, {
        KeyPropertyGuid: expected.keyPropertyGuid,
        KeyPropertyString: expected.keyPropertyString
      }).execute(defaultDestination);
      expected.setVersionIdentifier(versionIdentifier);
      expect(actual).toEqual(expected);
    });

    it('etag should be pulled from response header when __metadata has no etag property', async () => {
      const entityData = createOriginalTestEntityData1();
      const expected = createTestEntity(entityData);
      const versionIdentifier = 'etagInHeader';
      expected.setVersionIdentifier(versionIdentifier);

      mockGetRequest({
        path: testEntityResourcePath(
          expected.keyPropertyGuid,
          expected.keyPropertyString
        ),
        responseBody: { d: entityData },
        responseHeaders: { Etag: versionIdentifier }
      });

      const actual = await new GetByKeyRequestBuilderV2(TestEntity, {
        KeyPropertyGuid: expected.keyPropertyGuid,
        KeyPropertyString: expected.keyPropertyString
      }).execute(defaultDestination);
      expect(actual).toEqual(expected);
    });

    it('can handle the C4C response format', async () => {
      const entityData = createOriginalTestEntityData1();
      const expected = createTestEntity(entityData);

      mockGetRequest({
        path: testEntityResourcePath(
          expected.keyPropertyGuid,
          expected.keyPropertyString
        ),
        responseBody: { d: { results: entityData } }
      });

      const actual = await new GetByKeyRequestBuilderV2(TestEntity, {
        KeyPropertyGuid: expected.keyPropertyGuid,
        KeyPropertyString: expected.keyPropertyString
      }).execute(defaultDestination);
      expect(actual).toEqual(expected);
      expect(actual.versionIdentifier).toBeUndefined();
    });
  });

  it('throws a useful error when request execution fails', async () => {
    nock(/.*/).get(/.*/).reply(500);

    const getByKeyRequest = new GetByKeyRequestBuilderV2(TestEntity, {
      KeyPropertyGuid: uuid(),
      KeyPropertyString: 'test'
    }).execute(defaultDestination);
    await expect(getByKeyRequest).rejects.toThrowErrorMatchingSnapshot();
  });
});
