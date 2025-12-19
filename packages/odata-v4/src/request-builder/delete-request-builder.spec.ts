import { randomUUID } from 'node:crypto';
import nock from 'nock';
import moment from 'moment';
import {
  defaultDestination,
  mockDeleteRequest
} from '../../../../test-resources/test/test-util/request-mocker';
import { testEntityApi, testEntityResourcePath } from '../../test/test-util';
import { DeleteRequestBuilder } from './delete-request-builder';

describe('DeleteRequestBuilder', () => {
  const keyPropGuid = randomUUID();
  const keyPropString = 'TEST_ID';
  const keyPropDate = moment(0);

  afterAll(() => {
    nock.cleanAll();
  });

  it('should resolve if only the key is given.', async () => {
    mockDeleteRequest(
      { path: testEntityResourcePath(keyPropGuid, keyPropString, keyPropDate) },
      testEntityApi
    );

    const deleteRequest = new DeleteRequestBuilder(testEntityApi, {
      KeyPropertyGuid: keyPropGuid,
      KeyPropertyString: keyPropString,
      KeyDateProperty: keyPropDate
    }).execute(defaultDestination);

    await expect(deleteRequest).resolves.toBeUndefined();
  });

  it('should resolve if entity and version identifier are given', async () => {
    const versionId = 'not-a-star';
    const entity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid(keyPropGuid)
      .keyPropertyString(keyPropString)
      .keyDateProperty(keyPropDate)
      .build()
      .setVersionIdentifier(versionId);

    mockDeleteRequest(
      {
        path: testEntityResourcePath(keyPropGuid, keyPropString, keyPropDate),
        additionalHeaders: { 'if-match': versionId }
      },
      testEntityApi
    );

    const deleteRequest = new DeleteRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);

    await expect(deleteRequest).resolves.toBe(undefined);
  });
});
