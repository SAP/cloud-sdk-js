import nock from 'nock';
import { v4 as uuid } from 'uuid';
import { TestEntity } from '@sap-cloud-sdk/test-services/v4/test-service';
import { createUriConverter } from '@sap-cloud-sdk/odata-common/internal';
import {
  defaultDestination,
  mockDeleteRequest
} from '../../../../test-resources/test/test-util/request-mocker';
import { testEntityResourcePath } from '../../../../test-resources/test/test-util/test-data';
import { defaultDeSerializers } from '../de-serializers';
import { DeleteRequestBuilder } from './delete-request-builder';

const convertToUriFormat = createUriConverter(defaultDeSerializers);

describe('DeleteRequestBuilder', () => {
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

    const deleteRequest = new DeleteRequestBuilder(TestEntity, {
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

    const deleteRequest = new DeleteRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );

    await expect(deleteRequest).resolves.toBe(undefined);
  });
});
