import { TestEntity } from '@sap-cloud-sdk/test-services/test-service-legacy';
import {
  TestEntity as TestEntityV4,
  TestEnumType
} from '@sap-cloud-sdk/test-services/v4/test-service';
import { FieldBuilder, EnumField } from '@sap-cloud-sdk/core';

// $ExpectType GetAllRequestBuilder<TestEntity>
TestEntity.requestBuilder()
  .getAll()
  .select(
    TestEntity.STRING_PROPERTY,
    TestEntity.TO_MULTI_LINK,
    TestEntity.TO_SINGLE_LINK
  );

// $$ExpectType EnumField<TestEntityV4, string, false, false>
const enumField = new EnumField('fieldName', TestEntityV4);
// $$ExpectType Filter<TestEntityV4, string>
enumField.equals('enum');
// $$ExpectType Filter<TestEntityV4, string>
enumField.equals('Member1');
// $$ExpectType Filter<TestEntityV4, string>
enumField.equals(TestEnumType.Member1);
// $ExpectError
enumField.equals(1);

// $$ExpectType EdmTypeField<TestEntityV4, "Edm.Enum", true, true>
const enumFieldAsEdmTypeField = new FieldBuilder(
  TestEntityV4
).buildEdmTypeField('EnumPropertyInt64', 'Edm.Enum', true);
// $$ExpectType Filter<TestEntityV4, string | null>
enumFieldAsEdmTypeField.equals('enum');
// $ExpectError
enumFieldAsEdmTypeField.equals(1);
