import {
  defaultDeSerializers,
  entitySerializer
} from '@sap-cloud-sdk/odata-common/internal';
import { testEntityApi } from '../../test/test-util';

describe('with default (de-)serializers', () => {
  const { serializeEntity } = entitySerializer(defaultDeSerializers);
  it('should serialize simple entity', () => {
    const testEntity = testEntityApi
      .entityBuilder()
      .stringProperty('test')
      .int16Property(100)
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      StringProperty: testEntity.stringProperty,
      Int16Property: testEntity.int16Property
    });
  });
});
