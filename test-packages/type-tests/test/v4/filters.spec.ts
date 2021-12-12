import {
  TestEntityApi,
  TestEntityMultiLinkApi,
  TestEnumType
} from '@sap-cloud-sdk/test-services/v4/test-service';
import { and } from '@sap-cloud-sdk/odata-common/internal';
import { any } from '@sap-cloud-sdk/odata-v4';

const schema = new TestEntityApi().schema;
const multiLinkSchema = new TestEntityMultiLinkApi().schema;

// $ExpectType FilterList<TestEntity>
and(
  schema.TO_MULTI_LINK.filter(
    any(multiLinkSchema.STRING_PROPERTY.equals('test'))
  )
);

// $ExpectType Filter<TestEntity, string>
schema.ENUM_PROPERTY.equals('Member1');

// $ExpectType Filter<TestEntity, string>
schema.ENUM_PROPERTY.equals(TestEnumType.Member1);

// $ExpectError
schema.ENUM_PROPERTY.equals('string');

// $ExpectError
schema.ENUM_PROPERTY.equals(1);
