import nock from 'nock';
import { v4 as uuid } from 'uuid';
import {
  defaultDestination,
  mockDeleteRequest
} from '../../../core/test/test-util/request-mocker';
import { testEntityResourcePath } from '../../../core/test/test-util/test-data';
import { TestEntity } from '../../../core/test/test-util/test-services/v2/test-service';
import { uriConverter } from '../uri-conversion';
import { DeleteRequestBuilder } from './delete-request-builder';

describe('DeleteRequestBuilder', () => {
  const keyPropGuid = uuid();
  const keyPropString = 'TEST_ID';

  afterEach(() => {
    nock.cleanAll();
  });

  it('delete request with keys should resolve', async () => {
    mockDeleteRequest({
      path: testEntityResourcePath(
        keyPropGuid,
        keyPropString,
        uriConverter.convertToUriFormat
      )
    });

    const deleteRequest = new DeleteRequestBuilder(TestEntity, {
      KeyPropertyGuid: keyPropGuid,
      KeyPropertyString: keyPropString
    }).execute(defaultDestination);

    await expect(deleteRequest).resolves.toBe(undefined);
  });

  it('delete request with entity and version identifier should resolve', async () => {
    const versionId = 'not-a-star';
    const entity = TestEntity.builder()
      .keyPropertyGuid(keyPropGuid)
      .keyPropertyString(keyPropString)
      .build()
      .setVersionIdentifier(versionId);

    mockDeleteRequest({
      path: testEntityResourcePath(
        keyPropGuid,
        keyPropString,
        uriConverter.convertToUriFormat
      ),
      additionalHeaders: {
        'if-match': versionId
      }
    });

    const deleteRequest = new DeleteRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );

    await expect(deleteRequest).resolves.toBe(undefined);
  });

  it('delete request with version identifier on the request should resolve', async () => {
    const versionId = 'not-a-star';

    mockDeleteRequest({
      path: testEntityResourcePath(
        keyPropGuid,
        keyPropString,
        uriConverter.convertToUriFormat
      ),
      additionalHeaders: {
        'if-match': versionId
      }
    });

    const deleteRequest = new DeleteRequestBuilder(TestEntity, {
      KeyPropertyGuid: keyPropGuid,
      KeyPropertyString: keyPropString
    })
      .setVersionIdentifier('not-a-star')
      .execute(defaultDestination);

    await expect(deleteRequest).resolves.toBe(undefined);
  });

  it('delete requests does not use if-match header when the version identifier is an empty string', async () => {
    mockDeleteRequest({
      path: testEntityResourcePath(
        keyPropGuid,
        keyPropString,
        uriConverter.convertToUriFormat
      )
    });

    const deleteRequest = new DeleteRequestBuilder(TestEntity, {
      KeyPropertyGuid: keyPropGuid,
      KeyPropertyString: keyPropString
    })
      .setVersionIdentifier('')
      .execute(defaultDestination);

    await expect(deleteRequest).resolves.toBe(undefined);
  });

  it('should ignore the version identifier on delete if set', async () => {
    mockDeleteRequest({
      path: testEntityResourcePath(
        keyPropGuid,
        keyPropString,
        uriConverter.convertToUriFormat
      ),
      additionalHeaders: {
        'if-match': '*'
      }
    });

    const deleteRequest = new DeleteRequestBuilder(TestEntity, {
      KeyPropertyGuid: keyPropGuid,
      KeyPropertyString: keyPropString
    })
      .ignoreVersionIdentifier()
      .execute(defaultDestination);

    await expect(deleteRequest).resolves.toBe(undefined);
  });

  it('throws an error when request execution fails', async () => {
    mockDeleteRequest({
      path: testEntityResourcePath(keyPropGuid, keyPropString),
      statusCode: 500
    });

    const deleteRequest = new DeleteRequestBuilder(TestEntity, {
      KeyPropertyGuid: keyPropGuid
    }).execute(defaultDestination);

    await expect(deleteRequest).rejects.toThrowErrorMatchingSnapshot();
  });

  describe('executeRaw', () => {
    it('returns request and raw response', async () => {
      mockDeleteRequest({
        path: testEntityResourcePath(
          keyPropGuid,
          keyPropString,
          uriConverter.convertToUriFormat
        )
      });

      const actual = await new DeleteRequestBuilder(TestEntity, {
        KeyPropertyGuid: keyPropGuid,
        KeyPropertyString: keyPropString
      }).executeRaw(defaultDestination);

      expect(actual.data).toEqual('');
      expect(actual.request.method).toBe('DELETE');
    });
  });
});
