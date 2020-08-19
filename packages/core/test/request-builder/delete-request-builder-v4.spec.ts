/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock from 'nock';
import { v4 as uuid } from 'uuid';
import { DeleteRequestBuilderV4, uriConverterV4 } from '../../src/odata/v4';
import { muteLoggers } from '../test-util/mute-logger';
import {
  defaultDestination,
  mockDeleteRequest
} from '../test-util/request-mocker';
import { testEntityResourcePath } from '../test-util/test-data';
import { TestEntity } from '../test-util/test-services/v4/test-service';

const { convertToUriFormat } = uriConverterV4;

describe('DeleteRequestBuilderV4', () => {
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
