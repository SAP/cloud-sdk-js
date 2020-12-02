import { v4 as uuid } from 'uuid';
import { TestEntity } from '../../../test-util/test-services/v2/test-service';
import { oDataUriV2 } from '../../../../src/odata-v2/uri-conversion';

describe('extractEntityKeys', () => {
  it('should extract entity keys correctly', () => {
    const entity = TestEntity.builder()
      .keyPropertyGuid(uuid())
      .keyPropertyString('987654321')
      .stringProperty('any')
      .build();

    const actual = oDataUriV2.getEntityKeys(entity, TestEntity);

    expect(actual).toEqual({
      KeyPropertyGuid: entity.keyPropertyGuid,
      KeyPropertyString: entity.keyPropertyString
    });
  });
});
