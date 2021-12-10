import {
  TestEntity,
  TestEntityApi,
  TestEntityMultiLink,
  TestEntityMultiLinkApi,
  TestEntitySingleLink,
  TestEntitySingleLinkApi
} from '@sap-cloud-sdk/test-services/v2/test-service';
import { and, or } from '@sap-cloud-sdk/odata-common/internal';

const testEntitySchema = new TestEntityApi().schema;
const testEntityMultiLinkSchema = new TestEntityMultiLinkApi().schema;
const testEntitySingleLinkSchema = new TestEntitySingleLinkApi().schema;

// $ExpectType Filter<TestEntity, string | null>
const stringProp = testEntitySchema.STRING_PROPERTY.equals('test');

// $ExpectType Filter<TestEntity, boolean | null>
const booleanProp = testEntitySchema.BOOLEAN_PROPERTY.equals(true);

// $ExpectType Filter<TestEntityMultiLink, number | null>
const multiLinkInt16Prop = testEntityMultiLinkSchema.INT_16_PROPERTY.equals(15);

// $ExpectType FilterList<TestEntity>
const filterAnd = and(stringProp, booleanProp);

// $ExpectType FilterList<TestEntity>
const filterOr = or(stringProp, booleanProp);

// $ExpectType FilterList<TestEntity>
and(filterAnd, filterOr);

// $ExpectType FilterList<TestEntityMultiLink>
and(multiLinkInt16Prop);

// $ExpectError
and(stringProp, booleanProp, multiLinkInt16Prop);

// $ExpectError
testEntitySchema.TO_MULTI_LINK.filter;

// $ExpectType FilterLink<TestEntity, TestEntitySingleLink>
testEntitySchema.TO_SINGLE_LINK.filter(
  testEntitySingleLinkSchema.STRING_PROPERTY.equals('test')
);

// $ExpectType Filter<TestEntity, string>
testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test');

// $ExpectError
testEntitySchema.COMPLEX_TYPE_PROPERTY.equals('test');

// $ExpectError
testEntitySchema.KEY_PROPERTY_STRING.equals(null);

// $ExpectType Filter<TestEntity, string | null>
testEntitySchema.STRING_PROPERTY.equals(null);
