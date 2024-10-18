import {
  defaultDeSerializers,
  entitySerializer
} from '@sap-cloud-sdk/odata-common/internal';
import { testEntityApi } from '../../test/test-util';

describe('with default (de-)serializers', () => {
  const { serializeEntity } = entitySerializer(defaultDeSerializers);

  it('should serialize entity with complex type fields 1', () => {
    const stringProperty1 = 'test';
    const testEntity = testEntityApi
      .entityBuilder()
      .stringProperty(stringProperty1)
      .complexTypeProperty({
        stringProperty: stringProperty1
      })
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      StringProperty: stringProperty1,
      ComplexTypeProperty: {
        StringProperty: stringProperty1
      }
    });
  });

  it('should serialize entity with complex type fields 2', () => {
    const stringProperty1 = 'test';
    const testEntity = testEntityApi
      .entityBuilder()
      .stringProperty(stringProperty1)
      .complexTypeProperty({
        stringProperty: stringProperty1
      })
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      StringProperty: stringProperty1,
      ComplexTypeProperty: {
        StringProperty: stringProperty1
      }
    });
  });
});
