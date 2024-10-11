import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { expectType } from 'tsd';
import type { TestEntity } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import type {
  Link,
  OneToOneLink,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-common';
import type { TestEntityMultiLinkApi } from '@sap-cloud-sdk/test-services-odata-v2/test-service/TestEntityMultiLinkApi';
import type { TestEntityOtherMultiLinkApi } from '@sap-cloud-sdk/test-services-odata-v2/test-service/TestEntityOtherMultiLinkApi';
import type { TestEntitySingleLinkApi } from '@sap-cloud-sdk/test-services-odata-v2/test-service/TestEntitySingleLinkApi';
import type {
  AnyDeserializerV2,
  DefaultDeSerializerV2
} from '../duplicated-types';

const { testEntityApi } = testService();
const testEntitySchema = testEntityApi.schema;

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeserializerV2>,
    DefaultDeSerializerV2,
    'Edm.Boolean',
    true,
    true
  >
>(testEntitySchema.BOOLEAN_PROPERTY);

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeserializerV2>,
    DefaultDeSerializerV2,
    'Edm.DateTimeOffset',
    true,
    true
  >
>(testEntitySchema.DATE_TIME_OFF_SET_PROPERTY);

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeserializerV2>,
    DefaultDeSerializerV2,
    'Edm.Int16',
    true,
    true
  >
>(testEntitySchema.INT_16_PROPERTY);

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeserializerV2>,
    DefaultDeSerializerV2,
    'Edm.Single',
    true,
    true
  >
>(testEntitySchema.SINGLE_PROPERTY);

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeserializerV2>,
    DefaultDeSerializerV2,
    'Edm.Guid',
    true,
    true
  >
>(testEntitySchema.GUID_PROPERTY);

expectType<
  Link<
    TestEntity<DefaultDeSerializerV2>,
    DefaultDeSerializerV2,
    TestEntityMultiLinkApi<DefaultDeSerializerV2>
  >
>(testEntitySchema.TO_MULTI_LINK);

expectType<
  Link<
    TestEntity<DefaultDeSerializerV2>,
    DefaultDeSerializerV2,
    TestEntityOtherMultiLinkApi<DefaultDeSerializerV2>
  >
>(testEntitySchema.TO_OTHER_MULTI_LINK);

expectType<
  OneToOneLink<
    TestEntity<DefaultDeSerializerV2>,
    DefaultDeSerializerV2,
    TestEntitySingleLinkApi<DefaultDeSerializerV2>
  >
>(testEntitySchema.TO_SINGLE_LINK);
