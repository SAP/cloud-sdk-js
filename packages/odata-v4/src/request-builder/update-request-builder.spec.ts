import nock from 'nock';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  defaultDestination,
  mockUpdateRequest
} from '../../../../test-resources/test/test-util/request-mocker';
import { testEntityApi, testEntityResourcePath } from '../../test/test-util';
import { UpdateRequestBuilder } from './update-request-builder';

function createTestEntity() {
  const keyPropGuid = uuid();
  const keyPropString = 'stringId';
  const int32Prop = 125;
  const keyPropDate = moment();

  return testEntityApi
    .entityBuilder()
    .keyPropertyGuid(keyPropGuid)
    .keyPropertyString(keyPropString)
    .keyDateProperty(keyPropDate)
    .int32Property(int32Prop)
    .build();
}

describe('UpdateRequestBuilder', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('update request sends only non-key properties', async () => {
    const entity = createTestEntity();
    entity.booleanProperty = false;
    const requestBody = {
      Int32Property: entity.int32Property,
      BooleanProperty: false
    };

    mockUpdateRequest(
      {
        body: requestBody,
        path: testEntityResourcePath(
          entity.keyPropertyGuid,
          entity.keyPropertyString,
          entity.keyDateProperty
        )
      },
      testEntityApi
    );

    const actual = await new UpdateRequestBuilder(
      testEntityApi,
      entity
    ).execute(defaultDestination);
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });
});
