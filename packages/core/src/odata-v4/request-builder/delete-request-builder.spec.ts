import nock from 'nock';
import { v4 as uuid } from 'uuid';
import {
  defaultDestination,
  mockDeleteRequest
} from '../../../test/test-util/request-mocker';
import { testEntityResourcePath } from '../../../test/test-util/test-data';
import { TestEntity } from '../../../test/test-util/test-services/v4/test-service';
import { uriConverter } from '../uri-conversion';
import { DeleteRequestBuilderV4 } from './delete-request-builder';

const { convertToUriFormat } = uriConverter;

describe('DeleteRequestBuilderV4', () => {
  const keyPropGuid = uuid();
  const keyPropString = 'TEST_ID';

  afterAll(() => {
    nock.cleanAll();
  });

  it('should resolve if only the key is given.', async () => {
    mockDeleteRequest({
      path: testEntityResourcePath(
        keyPropGuid,
        keyPropString,
        convertToUriFormat
      )
    });

    const deleteRequest = new DeleteRequestBuilderV4(TestEntity, {
      KeyPropertyGuid: keyPropGuid,
      KeyPropertyString: keyPropString
    }).execute(defaultDestination);

    await expect(deleteRequest).resolves.toBe(undefined);
  });

  it('should resolve if entity and version identifier are given', async () => {
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
        convertToUriFormat
      ),
      additionalHeaders: {
        'if-match': versionId
      }
    });

    const deleteRequest = new DeleteRequestBuilderV4(
      TestEntity,
      entity
    ).execute(defaultDestination);

    await expect(deleteRequest).resolves.toBe(undefined);
  });
});
