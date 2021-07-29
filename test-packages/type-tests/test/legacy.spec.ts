import { TestEntity } from '@sap-cloud-sdk/test-services/test-service-legacy';
import { TestEntity as TestEntityV4 } from '@sap-cloud-sdk/test-services/v4/test-service';
import { EnumField, FieldBuilder } from '@sap-cloud-sdk/core';

// $ExpectType GetAllRequestBuilder<TestEntity>
TestEntity.requestBuilder()
  .getAll()
  .select(
    TestEntity.STRING_PROPERTY,
    TestEntity.TO_MULTI_LINK,
    TestEntity.TO_SINGLE_LINK
  );

const enumField = new EnumField('fieldName', TestEntityV4);
// $$ExpectType Filter<TestEntityV4, string>
enumField.equals('enum');
// $ExpectError
enumField.equals(1);

const enumFieldAsEdmTypeField = new FieldBuilder(
  TestEntityV4
).buildEdmTypeField('EnumPropertyInt64', 'Edm.Enum', true);
// $$ExpectType Filter<TestEntityV4, string | null>
enumFieldAsEdmTypeField.equals('enum');
// $ExpectError
enumFieldAsEdmTypeField.equals(1);
