import {
  createValueDeserializer,
  defaultDeSerializers,
  entitySerializer
} from '@sap-cloud-sdk/odata-common/internal';
import {
  testEntityApi,
  testEntityLvl2MultiLinkApi,
  testEntityLvl2SingleLinkApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../../test/test-util';

describe('entity-serializer', () => {
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

    it('should serialize multi linked entities with nested links', () => {
      const lvl2MultiLinkEntity = testEntityLvl2MultiLinkApi
        .entityBuilder()
        .booleanProperty(false)
        .build();

      const lvl2SingleLinkEntity = testEntityLvl2SingleLinkApi
        .entityBuilder()
        .booleanProperty(true)
        .build();

      const multiLinkEntity = testEntityMultiLinkApi
        .entityBuilder()
        .stringProperty('true')
        .toMultiLink([lvl2MultiLinkEntity])
        .toSingleLink(lvl2SingleLinkEntity)
        .build();

      const testEntity = testEntityApi
        .entityBuilder()
        .stringProperty('root')
        .int32Property(6474389)
        .timeProperty({ hours: 12, minutes: 35, seconds: 54 })
        .toMultiLink([multiLinkEntity])
        .build();

      expect(serializeEntity(testEntity, testEntityApi)).toEqual({
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
      const testEntity = testEntityApi
        .entityBuilder()
        .toSingleLink(
          testEntitySingleLinkApi
            .entityBuilder()
            .withCustomFields({ custom: 'custom' })
            .build()
        )
        .toMultiLink([
          testEntityMultiLinkApi
            .entityBuilder()
            .withCustomFields({ custom: 'custom' })
            .build()
        ])
        .build();

      expect(serializeEntity(testEntity, testEntityApi)).toEqual({
        to_SingleLink: { custom: 'custom' },
        to_MultiLink: [{ custom: 'custom' }]
      });
    });

    it('should serialize null value', () => {
      const testEntity = testEntityApi
        .entityBuilder()
        .stringProperty(null)
        .toSingleLink(null)
        .build();

      expect(serializeEntity(testEntity, testEntityApi)).toEqual({
        StringProperty: null,
        to_SingleLink: null
      });
    });
  });
});
