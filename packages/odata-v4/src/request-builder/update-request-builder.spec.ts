import nock from 'nock';
import { v4 as uuid } from 'uuid';
import { TestEntity } from '@sap-cloud-sdk/test-services/v4/test-service';
import {
  defaultDestination,
  mockUpdateRequest
} from '../../../../test-resources/test/test-util/request-mocker';
import { testEntityResourcePath } from '../../../../test-resources/test/test-util/test-data';
import { uriConverter } from '../uri-conversion/uri-value-converter';
import { UpdateRequestBuilder } from './update-request-builder';

const { convertToUriFormat } = uriConverter;

function createTestEntity() {
  const keyPropGuid = uuid();
  const keyPropString = 'stringId';
  const int32Prop = 125;

  return TestEntity.builder()
    .keyPropertyGuid(keyPropGuid)
    .keyPropertyString(keyPropString)
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
          convertToUriFormat
        )
      },
      TestEntity
    );

    const actual = await new UpdateRequestBuilder(TestEntity, entity).execute(
      defaultDestination
    );
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });
});
