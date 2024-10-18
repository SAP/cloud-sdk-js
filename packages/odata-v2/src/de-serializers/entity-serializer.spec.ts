import {
  createValueDeserializer,
  defaultDeSerializers,
  entitySerializer
} from '@sap-cloud-sdk/odata-common/internal';
import { testEntityApi } from '../../test/test-util';

describe('with default (de-)serializers', () => {
  const { serializeEntity } = entitySerializer(defaultDeSerializers);
  const tsToEdm = createValueDeserializer(defaultDeSerializers);

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
});
