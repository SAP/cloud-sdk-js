import {
  TestEntity,
  TestEntityMultiLink,
  testService
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { and, or } from '@sap-cloud-sdk/odata-v2';
import { expectError, expectType } from 'tsd';
import { Filter, FilterLink, FilterList } from '@sap-cloud-sdk/odata-common';
import { TestEntitySingleLinkApi } from '@sap-cloud-sdk/test-services-odata-v2/test-service/TestEntitySingleLinkApi';
import { AnyDeserializerV2, DefaultDeSerializerV2 } from '../duplicated-types';

const { testEntityApi, testEntitySingleLinkApi, testEntityMultiLinkApi } =
  testService();
const testEntitySchema = testEntityApi.schema;
const testEntityMultiLinkSchema = testEntityMultiLinkApi.schema;
const testEntitySingleLinkSchema = testEntitySingleLinkApi.schema;

const stringProp = testEntitySchema.STRING_PROPERTY.equals('test');
expectType<
  Filter<TestEntity<AnyDeserializerV2>, DefaultDeSerializerV2, string | null>
>(stringProp);

const booleanProp = testEntitySchema.BOOLEAN_PROPERTY.equals(true);
expectType<
  Filter<TestEntity<AnyDeserializerV2>, DefaultDeSerializerV2, boolean | null>
>(booleanProp);

const multiLinkInt16Prop = testEntityMultiLinkSchema.INT_16_PROPERTY.equals(15);
expectType<
  Filter<
    TestEntityMultiLink<AnyDeserializerV2>,
    DefaultDeSerializerV2,
    number | null
  >
>(multiLinkInt16Prop);

const filterAnd = and(stringProp, booleanProp);
expectType<FilterList<TestEntity<AnyDeserializerV2>, DefaultDeSerializerV2>>(
  filterAnd
);

const filterOr = or(stringProp, booleanProp);
expectType<FilterList<TestEntity<AnyDeserializerV2>, DefaultDeSerializerV2>>(
  filterOr
);

expectType<FilterList<TestEntity<AnyDeserializerV2>, DefaultDeSerializerV2>>(
  and(filterAnd, filterOr)
);

expectType<
  FilterList<TestEntityMultiLink<AnyDeserializerV2>, DefaultDeSerializerV2>
>(and(multiLinkInt16Prop));

expectError<any>(and(stringProp, booleanProp, multiLinkInt16Prop));

expectError<any>(testEntitySchema.TO_MULTI_LINK.filter);

expectType<
  FilterLink<
    TestEntity<DefaultDeSerializerV2>,
    DefaultDeSerializerV2,
    TestEntitySingleLinkApi<DefaultDeSerializerV2>
  >
>(
  testEntitySchema.TO_SINGLE_LINK.filter(
    testEntitySingleLinkSchema.STRING_PROPERTY.equals('test')
  )
);

expectType<FilterList<TestEntity, DefaultDeSerializerV2>>(
  and(
    testEntitySchema.TO_SINGLE_LINK.filter(
      testEntitySingleLinkSchema.STRING_PROPERTY.equals('test')
    )
  )
);

expectType<
  Filter<TestEntity<AnyDeserializerV2>, DefaultDeSerializerV2, string>
>(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'));

expectError<any>(testEntitySchema.COMPLEX_TYPE_PROPERTY.equals('test'));

expectError<any>(testEntitySchema.KEY_PROPERTY_STRING.equals(null));

expectType<
  Filter<TestEntity<AnyDeserializerV2>, DefaultDeSerializerV2, string | null>
>(testEntitySchema.STRING_PROPERTY.equals(null));

expectType<
  Filter<TestEntity<AnyDeserializerV2>, DefaultDeSerializerV2, number | null>
>(testEntitySchema.INT_16_PROPERTY.lessThan(123));

expectType<
  Filter<TestEntity<AnyDeserializerV2>, DefaultDeSerializerV2, string | null>
>(testEntitySchema.STRING_PROPERTY.lessOrEqual('test'));

expectType<
  Filter<TestEntity<AnyDeserializerV2>, DefaultDeSerializerV2, boolean | null>
>(testEntitySchema.BOOLEAN_PROPERTY.greaterThan(true));

expectType<
  Filter<TestEntity<AnyDeserializerV2>, DefaultDeSerializerV2, string | null>
>(testEntitySchema.GUID_PROPERTY.greaterOrEqual('test-guid'));
