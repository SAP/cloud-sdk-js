import {
  TestEntity,
  TestEntityLvl2MultiLink,
  TestEntityLvl2SingleLink,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v2/test-service';
import { serializeEntity } from './entity-serializer';
import { tsToEdm } from './de-serializers';
describe('entity-serializer', () => {
  it('should serialize simple entity', () => {
    const testEntity = TestEntity.builder()
      .stringProperty('test')
      .int16Property(100)
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      StringProperty: testEntity.stringProperty,
      Int16Property: testEntity.int16Property
    });
  });

  it('should serialize entity with complex type fields', () => {
    const stringProperty1 = 'test';
    const stringProperty2 = 'nest';
    const testEntity = TestEntity.builder()
      .complexTypeProperty({
        stringProperty: stringProperty1,
        complexTypeProperty: {
          stringProperty: stringProperty2
        }
      })
      .int16Property(100)
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
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
    const testEntity = TestEntity.builder()
      .stringProperty('Peter')
      .singleProperty(14.5)
      .withCustomFields({
        CustomField1: 'abcd',
        CustomField2: 1234
      })
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      StringProperty: testEntity.stringProperty,
      SingleProperty: tsToEdm(testEntity.singleProperty, 'Edm.Single'),
      CustomField1: 'abcd',
      CustomField2: 1234
    });
  });

  it('should serialize empty entities', () => {
    const emptyEntity = TestEntity.builder().build();
    expect(serializeEntity(emptyEntity, TestEntity)).toEqual({});
  });

  it('should serialize one to one linked entities', () => {
    const singleLinkEntity = TestEntitySingleLink.builder()
      .stringProperty('prop')
      .build();

    const testEntity = TestEntity.builder()
      .stringProperty('testEntity')
      .booleanProperty(false)
      .toSingleLink(singleLinkEntity)
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      StringProperty: testEntity.stringProperty,
      BooleanProperty: testEntity.booleanProperty,
      to_SingleLink: {
        StringProperty: singleLinkEntity.stringProperty
      }
    });
  });

  it('should serialize multi linked entities with nested links', () => {
    const lvl2MultiLinkEntity = TestEntityLvl2MultiLink.builder()
      .booleanProperty(false)
      .build();

    const lvl2SingleLinkEntity = TestEntityLvl2SingleLink.builder()
      .booleanProperty(true)
      .build();

    const multiLinkEntity = TestEntityMultiLink.builder()
      .stringProperty('true')
      .toMultiLink([lvl2MultiLinkEntity])
      .toSingleLink(lvl2SingleLinkEntity)
      .build();

    const testEntity = TestEntity.builder()
      .stringProperty('root')
      .int32Property(6474389)
      .timeProperty({ hours: 12, minutes: 35, seconds: 54 })
      .toMultiLink([multiLinkEntity])
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      StringProperty: testEntity.stringProperty,
      Int32Property: tsToEdm(testEntity.int32Property, 'Edm.Int32'),
      TimeProperty: tsToEdm(testEntity.timeProperty, 'Edm.Time'),
      to_MultiLink: [
        {
          StringProperty: multiLinkEntity.stringProperty,
          to_MultiLink: [
            {
              BooleanProperty: lvl2MultiLinkEntity.booleanProperty
            }
          ],
          to_SingleLink: {
            BooleanProperty: lvl2SingleLinkEntity.booleanProperty
          }
        }
      ]
    });
  });

  it('should serialize linked entities with custom fields', () => {
    const testEntity = TestEntity.builder()
      .toSingleLink(
        TestEntitySingleLink.builder()
          .withCustomFields({ custom: 'custom' })
          .build()
      )
      .toMultiLink([
        TestEntityMultiLink.builder()
          .withCustomFields({ custom: 'custom' })
          .build()
      ])
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      to_SingleLink: { custom: 'custom' },
      to_MultiLink: [{ custom: 'custom' }]
    });
  });

  it('should serialize null value', () => {
    const testEntity = TestEntity.builder()
      .stringProperty(null)
      .toSingleLink(null)
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      StringProperty: null,
      to_SingleLink: null
    });
  });
});
