import nock from 'nock';
import { v4 as uuid } from 'uuid';
import {
  defaultDestination,
  mockUpdateRequest
} from '../../../test/test-util/request-mocker';
import { testEntityResourcePath } from '../../../test/test-util/test-data';
import { TestEntity } from '../../../test/test-util/test-services/v4/test-service';
import { uriConverterV4 } from '../uri-conversion';
import { UpdateRequestBuilderV4 } from './update-request-builder';

const { convertToUriFormat } = uriConverterV4;

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

describe('UpdateRequestBuilderV4', () => {
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

    const actual = await new UpdateRequestBuilderV4(TestEntity, entity).execute(
      defaultDestination
    );
    expect(actual).toEqual(entity.setOrInitializeRemoteState());
  });
});
