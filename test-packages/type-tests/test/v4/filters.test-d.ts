import { and, any, OneToManyLink } from '@sap-cloud-sdk/odata-v4';
import {
  TestEntity,
  TestEnumType,
  testService
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import { expectError, expectType } from 'tsd';
import { Filter, FilterList } from '@sap-cloud-sdk/odata-common';
import { TestEntityMultiLinkApi } from '@sap-cloud-sdk/test-services-odata-v4/test-service/TestEntityMultiLinkApi';
import { AnyDeSerializerV4, DefaultDeSerializersV4 } from '../duplicated-types';

const { testEntityApi, testEntitySingleLinkApi, testEntityMultiLinkApi } =
  testService();

const schema = testEntityApi.schema;
const singleLinkSchema = testEntitySingleLinkApi.schema;
const multiLinkSchema = testEntityMultiLinkApi.schema;

expectType<
  FilterList<TestEntity<DefaultDeSerializersV4>, DefaultDeSerializersV4>
>(
  and(
    schema.TO_MULTI_LINK.filter(
      any(multiLinkSchema.STRING_PROPERTY.equals('test'))
    )
  )
);

expectType<
  FilterList<TestEntity<DefaultDeSerializersV4>, DefaultDeSerializersV4>
>(
  and(
    schema?.TO_SINGLE_LINK.filter(
      singleLinkSchema.STRING_PROPERTY.equals('test')
    )
  )
);

expectType<
  Filter<TestEntity<AnyDeSerializerV4>, DefaultDeSerializersV4, string>
>(schema.ENUM_PROPERTY.equals('Member1'));

expectType<
  Filter<TestEntity<AnyDeSerializerV4>, DefaultDeSerializersV4, string>
>(schema.ENUM_PROPERTY.equals(TestEnumType.Member1));

expectType<FilterList<TestEntity<AnyDeSerializerV4>, DefaultDeSerializersV4>>(
  and(
    schema.ENUM_PROPERTY.equals('Member1'),
    schema.STRING_PROPERTY.equals('test')
  )
);

expectError<any>(schema.ENUM_PROPERTY.equals('string'));

expectError<any>(schema.ENUM_PROPERTY.equals(1));

expectType<
  OneToManyLink<
    TestEntity<DefaultDeSerializersV4>,
    DefaultDeSerializersV4,
    TestEntityMultiLinkApi<DefaultDeSerializersV4>
  >
>(
  schema.TO_MULTI_LINK.filter(
    any(multiLinkSchema.STRING_PROPERTY.equals('test'))
  )
);

schema.TO_SINGLE_LINK.filter(singleLinkSchema.STRING_PROPERTY.equals('test'));
