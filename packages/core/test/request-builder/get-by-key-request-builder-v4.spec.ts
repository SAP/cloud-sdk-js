/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { GetByKeyRequestBuilder } from '../../src/odata/v4/';
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
import { TestEntity } from '../test-util/test-services/v4/test-service';
import { convertToUriFormat } from '../../src/odata/v4/uri-conversion';

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
          expected.keyPropertyString,
          convertToUriFormat
        ),
        responseBody: entityData
      }, TestEntity);

      const actual = await new GetByKeyRequestBuilder(TestEntity, {
        KeyPropertyGuid: expected.keyPropertyGuid,
        KeyPropertyString: expected.keyPropertyString
      }).execute(defaultDestination);
      expect(actual).toEqual(expected);
    });
  });
});
