/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import moment = require('moment');
import { v4 as uuid } from 'uuid';
import { filterFunction, substring, substringOf } from '../../src';
import {
  TestEntity,
  TestEntitySingleLink
} from './test-services/v2/test-service';

import { TestEntity as TestEntityV4, TestEntityMultiLink as TestEntityMultiLinkV4 } from './test-services/v4/test-service';

export const testFilterString = {
  filter: TestEntity.STRING_PROPERTY.equals('test'),
  odataStr: "StringProperty eq 'test'"
};

export const testFilterStringV4 = {
  filter: TestEntityV4.STRING_PROPERTY.equals('test'),
  odataStr: "StringProperty eq 'test'"
};

export const testFilterInt16 = {
  filter: TestEntity.INT_16_PROPERTY.equals(42),
  odataStr: 'Int16Property eq 42'
};

export const testFilterBoolean = {
  filter: TestEntity.BOOLEAN_PROPERTY.equals(true),
  odataStr: 'BooleanProperty eq true'
};

export const testFilterComplexType = {
  filter: TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
  odataStr: "ComplexTypeProperty/StringProperty eq 'test'"
};

const id = uuid();

export const testFilterGuid = {
  filter: TestEntity.GUID_PROPERTY.equals(id),
  odataStr: `GuidProperty eq guid'${id}'`
};

export const testFilterSingleLink = {
  filter: TestEntity.TO_SINGLE_LINK.filter(
    TestEntitySingleLink.KEY_PROPERTY.equals('test'),
    TestEntitySingleLink.BOOLEAN_PROPERTY.equals(false)
  ),
  odataStr:
    "to_SingleLink/KeyProperty eq 'test' and to_SingleLink/BooleanProperty eq false"
};

export const testFilterCustomFieldString = {
  filter: TestEntity.customField('CustomFieldString')
    .edmString()
    .notEquals('customFieldTest'),
  odataStr: "CustomFieldString ne 'customFieldTest'"
};

export const testFilterCustomFieldDouble = {
  filter: TestEntity.customField('CustomFieldDouble')
    .edmDouble()
    .greaterOrEqual(13),
  odataStr: 'CustomFieldDouble ge 13D'
};

export const testFilterCustomFieldDateTime = {
  filter: TestEntity.customField('CustomFieldDateTime')
    .edmDateTime()
    .equals(moment.utc('2015-12-31', 'YYYY-MM-DD')),
  odataStr: "CustomFieldDateTime eq datetime'2015-12-31T00:00:00.000'"
};

export const testFilterCustomFieldTime = {
  filter: TestEntity.customField('CustomFieldTime')
    .edmTime()
    .equals({ hours: 1, minutes: 1, seconds: 1 }),
  odataStr: "CustomFieldTime eq time'PT01H01M01S'"
};

export const testFilterCustomFieldBoolean = {
  filter: TestEntity.customField('CustomFieldBoolean')
    .edmBoolean()
    .equals(true),
  odataStr: 'CustomFieldBoolean eq true'
};

export const testFilterFunctionSubstringOf = {
  filter: substringOf(TestEntity.STRING_PROPERTY, 'test').equals(true),
  odataStr: "substringof(StringProperty, 'test') eq true"
};

export const testFilterFunctionSubstring = {
  filter: substring(TestEntity.STRING_PROPERTY, 1).equals('test'),
  odataStr: "substring(StringProperty, 1) eq 'test'"
};

export const testFilterFunctionCustom = {
  filter: filterFunction(
    'concat',
    'string',
    filterFunction('concat', 'string', TestEntity.STRING_PROPERTY, ', '),
    TestEntity.STRING_PROPERTY
  ).equals('test, test'),
  odataStr:
    "concat(concat(StringProperty, ', '), StringProperty) eq 'test, test'"
};

export const testFilterFunctionNested = {
  filter: TestEntity.TO_SINGLE_LINK.filter(
    substringOf(
      TestEntitySingleLink.STRING_PROPERTY,
      TestEntitySingleLink.KEY_PROPERTY
    ).equals(false)
  ),
  odataStr:
    '(substringof(to_SingleLink/StringProperty, to_SingleLink/KeyProperty) eq false)'
};

export const testFilterLambdaExpression = {
  filter: TestEntityV4.TO_MULTI_LINK.any(
    TestEntityMultiLinkV4.STRING_PROPERTY.equals('test')
  ),
  odataStr:
    "to_MultiLink/any(a:a/StringProperty eq 'test')"
};
