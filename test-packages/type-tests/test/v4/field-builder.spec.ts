import { FieldBuilder } from '@sap-cloud-sdk/core';
import {
  TestComplexType,
  TestComplexTypeField,
  TestEntity
} from '@sap-cloud-sdk/test-services/v4/test-service';

// $ExpectType FieldBuilder<typeof TestEntity>
const entityFieldBuilder = new FieldBuilder(TestEntity);

// $ExpectType EdmTypeField<TestEntity, "Edm.String", true, true>
entityFieldBuilder.buildEdmTypeField('fieldName', 'Edm.String', true);

// $ExpectType OrderableEdmTypeField<TestEntity, "Edm.Int16", false, true>
entityFieldBuilder.buildEdmTypeField('fieldName', 'Edm.Int16', false);

// $ExpectType TestComplexTypeField<TestEntity, true, true>
const complexTypeField = entityFieldBuilder.buildComplexTypeField(
  'fieldName',
  TestComplexTypeField,
  true
);

// $ExpectType CollectionField<TestEntity, "Edm.Int32", false, true>
entityFieldBuilder.buildCollectionField('fieldName', 'Edm.Int32', false);

// $ExpectType CollectionField<TestEntity, TestComplexType, true, true>
entityFieldBuilder.buildCollectionField('fieldName', TestComplexType, true);

// $ExpectType FieldBuilder<TestComplexTypeField<TestEntity, true, true>>
const complexTypeFieldBuilder = new FieldBuilder(complexTypeField);

// $ExpectType EdmTypeField<TestEntity, "Edm.String", true, false>
complexTypeFieldBuilder.buildEdmTypeField('fieldName', 'Edm.String', true);

// $ExpectType OrderableEdmTypeField<TestEntity, "Edm.Int16", false, false>
complexTypeFieldBuilder.buildEdmTypeField('fieldName', 'Edm.Int16', false);

// $ExpectType TestComplexTypeField<TestEntity, true, false>
complexTypeFieldBuilder.buildComplexTypeField(
  'fieldName',
  TestComplexTypeField,
  true
);

// $ExpectType CollectionField<TestEntity, "Edm.Int32", false, false>
complexTypeFieldBuilder.buildCollectionField('fieldName', 'Edm.Int32', false);

// $ExpectType CollectionField<TestEntity, TestComplexType, true, false>
complexTypeFieldBuilder.buildCollectionField(
  'fieldName',
  TestComplexType,
  true
);
