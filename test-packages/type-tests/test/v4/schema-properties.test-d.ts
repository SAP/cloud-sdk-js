import { testService } from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import { expectType } from 'tsd';
import type { TestEntity } from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import type {
  OneToManyLink,
  OneToOneLink,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntityMultiLinkApi } from '@sap-cloud-sdk/test-services-odata-v4/test-service/TestEntityMultiLinkApi';
import type { TestEntitySingleLinkApi } from '@sap-cloud-sdk/test-services-odata-v4/test-service/TestEntitySingleLinkApi';
import type {
  AnyDeSerializerV4,
  DefaultDeSerializersV4
} from '../duplicated-types';

const { testEntityApi } = testService();
const testEntitySchema = testEntityApi.schema;

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    'Edm.Decimal',
    true,
    true
  >
>(testEntitySchema.DECIMAL_PROPERTY);

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    'Edm.Double',
    true,
    true
  >
>(testEntitySchema.DOUBLE_PROPERTY);

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    'Edm.Float',
    true,
    true
  >
>(testEntitySchema.FLOAT_PROPERTY);

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    'Edm.Guid',
    false,
    true
  >
>(testEntitySchema.KEY_PROPERTY_GUID);

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeSerializerV4>,
    DefaultDeSerializersV4,
    'Edm.SByte',
    true,
    true
  >
>(testEntitySchema.S_BYTE_PROPERTY);

expectType<
  OneToManyLink<
    TestEntity<DefaultDeSerializersV4>,
    DefaultDeSerializersV4,
    TestEntityMultiLinkApi<DefaultDeSerializersV4>
  >
>(testEntitySchema.TO_MULTI_LINK);

expectType<
  OneToManyLink<
    TestEntity<DefaultDeSerializersV4>,
    DefaultDeSerializersV4,
    TestEntityMultiLinkApi<DefaultDeSerializersV4>
  >
>(testEntitySchema.TO_OTHER_MULTI_LINK);

expectType<
  OneToOneLink<
    TestEntity<DefaultDeSerializersV4>,
    DefaultDeSerializersV4,
    TestEntitySingleLinkApi<DefaultDeSerializersV4>
  >
>(testEntitySchema.TO_SINGLE_LINK);
