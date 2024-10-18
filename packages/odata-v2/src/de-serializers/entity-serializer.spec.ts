import {
  createValueDeserializer,
  defaultDeSerializers,
  entitySerializer
} from '@sap-cloud-sdk/odata-common/internal';
import { testEntityApi, testEntitySingleLinkApi } from '../../test/test-util';

describe('with default (de-)serializers', () => {
  const { serializeEntity } = entitySerializer(defaultDeSerializers);
  const tsToEdm = createValueDeserializer(defaultDeSerializers);
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

  it('should serialize entity with complex type fields', () => {
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
      .int16Property(100)
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      ComplexTypeProperty: {
        StringProperty: stringProperty1,
        ComplexTypeProperty: {
          StringProperty: stringProperty2
        }
      },
      Int16Property: testEntity.int16Property
    });
  });

  it('should serialize entity with custom fields', () => {
    const testEntity = testEntityApi
      .entityBuilder()
      .stringProperty('Peter')
      .singleProperty(14.5)
      .withCustomFields({
        CustomField1: 'abcd',
        CustomField2: 1234
      })
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      StringProperty: testEntity.stringProperty,
      SingleProperty: tsToEdm(testEntity.singleProperty, 'Edm.Single'),
      CustomField1: 'abcd',
      CustomField2: 1234
    });
  });

  it('should serialize empty entities', () => {
    const emptyEntity = testEntityApi.entityBuilder().build();
    expect(serializeEntity(emptyEntity, testEntityApi)).toEqual({});
  });

  it('should serialize one to one linked entities', () => {
    const singleLinkEntity = testEntitySingleLinkApi
      .entityBuilder()
      .stringProperty('prop')
      .build();

    const testEntity = testEntityApi
      .entityBuilder()
      .stringProperty('testEntity')
      .booleanProperty(false)
      .toSingleLink(singleLinkEntity)
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      StringProperty: testEntity.stringProperty,
      BooleanProperty: testEntity.booleanProperty,
      to_SingleLink: {
        StringProperty: singleLinkEntity.stringProperty
      }
    });
  });
});
