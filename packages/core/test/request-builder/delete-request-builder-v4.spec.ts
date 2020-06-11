/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock from 'nock';
import { v4 as uuid } from 'uuid';
import { muteLoggers } from '../test-util/mute-logger';
import {
  defaultDestination,
  mockDeleteRequest
} from '../test-util/request-mocker';
import { TestEntity } from '../test-util/test-services/v4/test-service';
import { DeleteRequestBuilder } from '../../src/odata/v4/request-builder';
import { testEntityResourcePath } from '../test-util/test-data';
import { convertToUriFormat } from '../../src/odata/v4';

describe('DeleteRequestBuilder', () => {
  const keyPropGuid = uuid();
  const keyPropString = 'TEST_ID';

  beforeAll(() => {
    muteLoggers('http-agent');
  });

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

  it('should throw an error when request execution fails', async () => {
    mockDeleteRequest({
      path: testEntityResourcePath(keyPropGuid, keyPropString),
      statusCode: 500
    });

    const deleteRequest = new DeleteRequestBuilder(TestEntity, {
      KeyPropertyGuid: keyPropGuid
    }).execute(defaultDestination);

    await expect(deleteRequest).rejects.toThrowErrorMatchingSnapshot();
  });
});
