import nock from 'nock';
import { v4 as uuid } from 'uuid';
import { createUriConverter } from '@sap-cloud-sdk/odata-common/internal';
import {
  defaultDestination,
  mockDeleteRequest
} from '../../../../test-resources/test/test-util/request-mocker';
import { testEntityResourcePath } from '../../../../test-resources/test/test-util/test-data';
import { defaultDeSerializers } from '../de-serializers';
import { testEntityApi } from '../../test/test-util';
import { DeleteRequestBuilder } from './delete-request-builder';

const convertToUriFormat = createUriConverter(defaultDeSerializers);

describe('DeleteRequestBuilder', () => {
  const keyPropGuid = uuid();
  const keyPropString = 'TEST_ID';

  afterAll(() => {
    nock.cleanAll();
  });

  it('should resolve if only the key is given.', async () => {
    mockDeleteRequest(
      {
        path: testEntityResourcePath(
          keyPropGuid,
          keyPropString,
          convertToUriFormat
        )
      },
      testEntityApi
    );

    const deleteRequest = new DeleteRequestBuilder(testEntityApi, {
      KeyPropertyGuid: keyPropGuid,
      KeyPropertyString: keyPropString
    }).execute(defaultDestination);

    await expect(deleteRequest).resolves.toBe(undefined);
  });

  it('should resolve if entity and version identifier are given', async () => {
    const versionId = 'not-a-star';
    const entity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid(keyPropGuid)
      .keyPropertyString(keyPropString)
      .build()
      .setVersionIdentifier(versionId);

    mockDeleteRequest(
      {
        path: testEntityResourcePath(
          keyPropGuid,
          keyPropString,
          convertToUriFormat
        ),
        additionalHeaders: {
          'if-match': versionId
        }
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
