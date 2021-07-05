import { and, or } from '@sap-cloud-sdk/core';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v2/test-service';

// $ExpectType Filter<TestEntity, string | null>
const stringProp = TestEntity.STRING_PROPERTY.equals('test');

// $ExpectType Filter<TestEntity, boolean | null>
const booleanProp = TestEntity.BOOLEAN_PROPERTY.equals(true);

// $ExpectType Filter<TestEntityMultiLink, number | null>
const multiLinkInt16Prop = TestEntityMultiLink.INT_16_PROPERTY.equals(15);

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
TestEntity.TO_MULTI_LINK.filter;

// $ExpectType FilterLink<TestEntity, TestEntitySingleLink>
TestEntity.TO_SINGLE_LINK.filter(
  TestEntitySingleLink.STRING_PROPERTY.equals('test')
);

// $ExpectType Filter<TestEntity, string>
TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test');

// $ExpectError
TestEntity.COMPLEX_TYPE_PROPERTY.equals('test');

// $ExpectError
TestEntity.KEY_PROPERTY_STRING.equals(null);

// $ExpectType Filter<TestEntity, string | null>
TestEntity.STRING_PROPERTY.equals(null);
