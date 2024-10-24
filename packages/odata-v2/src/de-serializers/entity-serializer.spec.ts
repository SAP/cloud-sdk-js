import { entitySerializer } from '@sap-cloud-sdk/odata-common/internal';
import { testEntityApi } from '../../test/test-util';
import { defaultDeSerializers } from './default-de-serializers';

describe('with default (de-)serializers', () => {
  const { serializeEntity } = entitySerializer(defaultDeSerializers);

  it('should serialize entity with complex type fields 1', () => {
    const stringProperty1 = 'test';
    const stringProperty2 = 'nest';
    const testEntity = testEntityApi
      .entityBuilder()
      .complexTypeProperty({
        stringProperty: stringProperty1,
        complexTypeProperty: {
          stringProperty: stringProperty2
        }
      })
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      ComplexTypeProperty: {
        StringProperty: stringProperty1,
        ComplexTypeProperty: {
          StringProperty: stringProperty2
        }
      }
    });
  });

  it('should serialize entity with complex type fields 2', () => {
    const stringProperty1 = 'test';
    const stringProperty2 = 'nest';
    const testEntity = testEntityApi
      .entityBuilder()
      .complexTypeProperty({
        stringProperty: stringProperty1,
        complexTypeProperty: {
          stringProperty: stringProperty2
        }
      })
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      ComplexTypeProperty: {
        StringProperty: stringProperty1,
        ComplexTypeProperty: {
          StringProperty: stringProperty2
        }
      }
    });
  });
});
