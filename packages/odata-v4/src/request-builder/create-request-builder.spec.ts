import nock from 'nock';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  defaultDestination,
  mockDeleteRequest
} from '../../../../test-resources/test/test-util/request-mocker';
import { testEntityApi, testEntityResourcePath } from '../../test/test-util';
import { CreateRequestBuilder } from './create-request-builder';

describe('DeleteRequestBuilder', () => {
  const keyPropGuid = uuid();
  const keyPropString = 'TEST_ID';
  const keyPropDate = moment(0);

  afterAll(() => {
    nock.cleanAll();
  });

  it('should resolve if entity and version identifier are given', async () => {
    const versionId = 'not-a-star';
    const entity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid(keyPropGuid)
      .keyPropertyString(keyPropString)
      .dateTimeOffSetProperty(keyPropDate)
      .build();

    const createRequest = new CreateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);

    await expect(createRequest).resolves.toBe(undefined);
  });
});
