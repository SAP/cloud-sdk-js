/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock = require('nock');
import { v4 as uuid } from 'uuid';
import { GetByKeyRequestBuilder } from '../../src/request-builder';
import { muteLoggers } from '../test-util/mute-logger';
import {
  defaultDestination,
  mockGetRequest
} from '../test-util/request-mocker';
import {
  createOriginalTestEntityData1,
  createTestEntity,
  testEntityResourcePath
} from '../test-util/test-data';
import { TestEntity } from '../test-util/test-services/test-service';

describe('GetByKeyRequestBuilder', () => {
  beforeAll(() => {
    muteLoggers('http-agent');
  });

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

      const actual = await new GetByKeyRequestBuilder(TestEntity, {
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

      const actual = await new GetByKeyRequestBuilder(TestEntity, {
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

      const actual = await new GetByKeyRequestBuilder(TestEntity, {
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

      const actual = await new GetByKeyRequestBuilder(TestEntity, {
        KeyPropertyGuid: expected.keyPropertyGuid,
        KeyPropertyString: expected.keyPropertyString
      }).execute(defaultDestination);
      expect(actual).toEqual(expected);
      expect(actual.versionIdentifier).toBeUndefined();
    });
  });

  it('throws a useful error when request execution fails', async () => {
    nock(/.*/).get(/.*/).reply(500);

    const getByKeyRequest = new GetByKeyRequestBuilder(TestEntity, {
      KeyPropertyGuid: uuid(),
      KeyPropertyString: 'test'
    }).execute(defaultDestination);
    await expect(getByKeyRequest).rejects.toThrowErrorMatchingSnapshot();
  });
});
