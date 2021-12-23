import {
  TestComplexType,
  TestComplexTypeField,
  TestEntity
} from '@sap-cloud-sdk/test-services/v4/test-service';
import { defaultDeSerializers } from '@sap-cloud-sdk/odata-v4/internal';
import { FieldBuilder } from '@sap-cloud-sdk/odata-common/internal';

// $ExpectType FieldBuilder<typeof TestEntity, DefaultDeSerializers>
const entityFieldBuilder = new FieldBuilder(TestEntity, defaultDeSerializers);

// $ExpectType EdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DefaultDeSerializers, "Edm.String", true, true>
entityFieldBuilder.buildEdmTypeField('fieldName', 'Edm.String', true);

// $ExpectType OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DefaultDeSerializers, "Edm.Int16", false, true>
entityFieldBuilder.buildEdmTypeField('fieldName', 'Edm.Int16', false);

// $ExpectType TestComplexTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DefaultDeSerializers, true, true>
const complexTypeField = entityFieldBuilder.buildComplexTypeField(
  'fieldName',
  TestComplexTypeField,
  true
);

// $ExpectType CollectionField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DefaultDeSerializers, "Edm.Int32", false, true>
entityFieldBuilder.buildCollectionField('fieldName', 'Edm.Int32', false);

// $ExpectType CollectionField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DefaultDeSerializers, TestComplexType<DefaultDeSerializers>, true, true>
entityFieldBuilder.buildCollectionField('fieldName', TestComplexType, true);

// $ExpectType FieldBuilder<TestComplexTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DefaultDeSerializers, true, true>, DefaultDeSerializers>
const complexTypeFieldBuilder = new FieldBuilder(
  complexTypeField,
  defaultDeSerializers
);

// $ExpectType EdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DefaultDeSerializers, "Edm.String", true, false>
complexTypeFieldBuilder.buildEdmTypeField('fieldName', 'Edm.String', true);

// $ExpectType OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DefaultDeSerializers, "Edm.Int16", false, false>
complexTypeFieldBuilder.buildEdmTypeField('fieldName', 'Edm.Int16', false);

// $ExpectType TestComplexTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DefaultDeSerializers, true, false>
complexTypeFieldBuilder.buildComplexTypeField(
  'fieldName',
  TestComplexTypeField,
  true
);

// $ExpectType CollectionField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DefaultDeSerializers, "Edm.Int32", false, false>
complexTypeFieldBuilder.buildCollectionField('fieldName', 'Edm.Int32', false);

// $ExpectType CollectionField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DefaultDeSerializers, TestComplexType<DefaultDeSerializers>, true, false>
complexTypeFieldBuilder.buildCollectionField(
  'fieldName',
  TestComplexType,
  true
);
