/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { and, length, or, substring } from '@sap-cloud-sdk/core';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/test-service';

// $ExpectType Filter<TestEntity, string, ODataV2>
const stringProp = TestEntity.STRING_PROPERTY.equals('test');

// $ExpectType Filter<TestEntity, boolean, ODataV2>
const booleanProp = TestEntity.BOOLEAN_PROPERTY.equals(true);

// $ExpectType Filter<TestEntityMultiLink, number, ODataV2>
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

// $ExpectType FilterLink<TestEntity, TestEntitySingleLink, ODataV2>
TestEntity.TO_SINGLE_LINK.filter(
  TestEntitySingleLink.STRING_PROPERTY.equals('test')
);

// $ExpectType Filter<TestEntity, string, ODataV2>
TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test');

// $ExpectError
TestEntity.COMPLEX_TYPE_PROPERTY.equals('test');

// $ExpectType StringFilterFunction<TestEntity>
const substringFn = substring(
  TestEntity.STRING_PROPERTY,
  TestEntity.INT_16_PROPERTY
);

// $ExpectType Filter<TestEntity, string, ODataV2>
const substringFnFilter = substringFn.equals('test');

// $ExpectType GetAllRequestBuilder<TestEntity>
TestEntity.requestBuilder().getAll().filter(substringFnFilter);

TestEntitySingleLink.requestBuilder().getAll().filter(substringFnFilter); // $ExpectError

// $ExpectError
substring(TestEntitySingleLink.STRING_PROPERTY, TestEntity.STRING_PROPERTY);

// $ExpectType Filter<TestEntity, number, ODataV2>
length(TestEntity.STRING_PROPERTY).greaterThan(1);
