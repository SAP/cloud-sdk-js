import { v4 as uuid } from 'uuid';
import { or } from '../../src';
import {
  all,
  any,
  filterFunctions as filterFunctionsV4
} from '../../src/odata-v4';
import {
  TestEntity,
  TestEntitySingleLink
} from './test-services/v2/test-service';
import {
  TestEntity as TestEntityV4,
  TestEntityLvl2MultiLink,
  TestEntityLvl2SingleLink,
  TestEntityMultiLink as TestEntityMultiLinkV4,
  TestEnumType
} from './test-services/v4/test-service';

export const testFilterString = {
  filter: TestEntity.STRING_PROPERTY.equals('test'),
  odataStr: "StringProperty eq 'test'"
};

export const testFilterStringEncoding = {
  filter: TestEntity.STRING_PROPERTY.equals("?'&$"),
  odataStr: "StringProperty eq '?''&$'"
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

export const testFilterLambdaExpressionOnLink = {
  filter: TestEntityV4.TO_MULTI_LINK.filter(
    any(TestEntityMultiLinkV4.STRING_PROPERTY.equals('test1')),
    all(TestEntityMultiLinkV4.STRING_PROPERTY.equals('test2'))
  )._filters,
  odataStr:
    "(to_MultiLink/any(a0:(a0/StringProperty eq 'test1')) and to_MultiLink/all(a0:(a0/StringProperty eq 'test2')))"
};

export const testFilterLambdaExpressionWithOr = {
  filter: or(
    TestEntityV4.STRING_PROPERTY.equals('str1'),
    TestEntityV4.TO_MULTI_LINK.filter(
      any(TestEntityMultiLinkV4.STRING_PROPERTY.equals('str2'))
    )
  ),
  odataStr:
    "(StringProperty eq 'str1' or (to_MultiLink/any(a0:(a0/StringProperty eq 'str2'))))"
};

export const testFilterLambdaExpressionFilterListOnLink = {
  filter: TestEntityV4.TO_MULTI_LINK.filter(
    any(
      or(
        TestEntityMultiLinkV4.STRING_PROPERTY.equals('test1'),
        TestEntityMultiLinkV4.INT_16_PROPERTY.equals(1)
      )
    )
  )._filters,
  odataStr:
    "(to_MultiLink/any(a0:((a0/StringProperty eq 'test1' or a0/Int16Property eq 1))))"
};

export const testFilterLambdaExpressionFilterLinkOnLink = {
  filter: TestEntityV4.TO_MULTI_LINK.filter(
    any(
      TestEntityMultiLinkV4.TO_SINGLE_LINK.filter(
        TestEntityLvl2SingleLink.STRING_PROPERTY.equals('test1')
      )
    )
  )._filters,
  odataStr:
    "(to_MultiLink/any(a0:((a0/to_SingleLink/StringProperty eq 'test1'))))"
};

export const testNestedFilterLambdaExpressionOnLink = {
  filter: TestEntityV4.TO_MULTI_LINK.filter(
    any(
      TestEntityMultiLinkV4.TO_MULTI_LINK_1.filter(
        any(TestEntityLvl2MultiLink.STRING_PROPERTY.equals('test'))
      )
    )
  )._filters,
  odataStr:
    "(to_MultiLink/any(a0:((a0/to_MultiLink1/any(a1:(a1/StringProperty eq 'test'))))))"
};

export const testFilterLambdaExpressionFilterFunctionOnLink = {
  filter: TestEntityV4.TO_MULTI_LINK.filter(
    any(
      filterFunctionsV4
        .substring(TestEntityMultiLinkV4.STRING_PROPERTY, 1)
        .equals('test')
    )
  )._filters,
  odataStr: "(to_MultiLink/any(a0:(substring(a0/StringProperty, 1) eq 'test')))"
};

export const testFilterEnum = {
  filter: TestEntityV4.ENUM_PROPERTY.equals(TestEnumType.Member1),
  odataStr: "EnumProperty eq 'Member1'"
};
