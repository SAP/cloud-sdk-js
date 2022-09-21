import {
  TestComplexType,
  TestComplexTypeField,
  TestEntity
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import {
  CollectionField,
  defaultDeSerializers,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v4';
import { FieldBuilder } from '@sap-cloud-sdk/odata-common';
import { expectType } from 'tsd';
import { AnyDeSerializerV4, DefaultDeSerializersV4 } from '../duplicated-types';

const entityFieldBuilder = new FieldBuilder(TestEntity, defaultDeSerializers);
expectType<FieldBuilder<typeof TestEntity, DefaultDeSerializersV4>>(
  entityFieldBuilder
);

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    'Edm.String',
    true,
    true
  >
>(entityFieldBuilder.buildEdmTypeField('fieldName', 'Edm.String', true));

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    'Edm.Int16',
    false,
    true
  >
>(entityFieldBuilder.buildEdmTypeField('fieldName', 'Edm.Int16', false));

const complexTypeField = entityFieldBuilder.buildComplexTypeField(
  'fieldName',
  TestComplexTypeField,
  true
);
expectType<
  TestComplexTypeField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    true,
    true
  >
>(complexTypeField);

expectType<
  CollectionField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    'Edm.Int32',
    false,
    true
  >
>(entityFieldBuilder.buildCollectionField('fieldName', 'Edm.Int32', false));

expectType<
  CollectionField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    TestComplexType<DefaultDeSerializersV4>,
    true,
    true
  >
>(entityFieldBuilder.buildCollectionField('fieldName', TestComplexType, true));

const complexTypeFieldBuilder = new FieldBuilder(
  complexTypeField,
  defaultDeSerializers
);
expectType<
  FieldBuilder<
    TestComplexTypeField<
      TestEntity<AnyDeSerializerV4>,
      DefaultDeSerializersV4,
      true,
      true
    >,
    DefaultDeSerializersV4
  >
>(complexTypeFieldBuilder);

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    'Edm.String',
    true,
    false
  >
>(complexTypeFieldBuilder.buildEdmTypeField('fieldName', 'Edm.String', true));

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    'Edm.Int16',
    false,
    false
  >
>(complexTypeFieldBuilder.buildEdmTypeField('fieldName', 'Edm.Int16', false));

expectType<
  TestComplexTypeField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    true,
    false
  >
>(
  complexTypeFieldBuilder.buildComplexTypeField(
    'fieldName',
    TestComplexTypeField,
    true
  )
);

expectType<
  CollectionField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    'Edm.Int32',
    false,
    false
  >
>(
  complexTypeFieldBuilder.buildCollectionField('fieldName', 'Edm.Int32', false)
);

expectType<
  CollectionField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    TestComplexType<DefaultDeSerializersV4>,
    true,
    false
  >
>(
  complexTypeFieldBuilder.buildCollectionField(
    'fieldName',
    TestComplexType,
    true
  )
);
