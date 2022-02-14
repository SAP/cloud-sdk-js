import { or } from '@sap-cloud-sdk/odata-common/internal';
import {
  TestEnumType,
  testService
} from '@sap-cloud-sdk/test-services/v4/test-service';
import { all, any, filterFunctions } from '../../src';
import { testEntityApiCustom } from './test-data';

const { testEntityApi, testEntityMultiLinkApi } = testService();

export const testFilterString = {
  filter: testEntityApi.schema.STRING_PROPERTY.equals('test'),
  odataStr: "StringProperty eq 'test'"
};

export const testFilterLambdaExpressionOnLink = {
  filter: testEntityApi.schema.TO_MULTI_LINK.filter(
    any(
      testEntityApi.schema.TO_MULTI_LINK._linkedEntityApi.schema.STRING_PROPERTY.equals(
        'test1'
      )
    ),
    all(
      testEntityApi.schema.TO_MULTI_LINK._linkedEntityApi.schema.STRING_PROPERTY.equals(
        'test2'
      )
    )
  )._filters,
  odataStr:
    "(to_MultiLink/any(a0:(a0/StringProperty eq 'test1')) and to_MultiLink/all(a0:(a0/StringProperty eq 'test2')))"
};

export const testFilterLambdaExpressionWithOr = {
  filter: or(
    testEntityApi.schema.STRING_PROPERTY.equals('str1'),
    testEntityApi.schema.TO_MULTI_LINK.filter(
      any(
        testEntityApi.schema.TO_MULTI_LINK._linkedEntityApi.schema.STRING_PROPERTY.equals(
          'str2'
        )
      )
    )
  ),
  odataStr:
    "(StringProperty eq 'str1' or (to_MultiLink/any(a0:(a0/StringProperty eq 'str2'))))"
};

export const testFilterLambdaExpressionFilterListOnLink = {
  filter: testEntityApi.schema.TO_MULTI_LINK.filter(
    any(
      or(
        testEntityMultiLinkApi.schema.STRING_PROPERTY.equals('test1'),
        testEntityMultiLinkApi.schema.INT_16_PROPERTY.equals(1)
      )
    )
  )._filters,
  odataStr:
    "(to_MultiLink/any(a0:((a0/StringProperty eq 'test1' or a0/Int16Property eq 1))))"
};

export const testFilterLambdaExpressionFilterLinkOnLink = {
  filter: testEntityApi.schema.TO_MULTI_LINK.filter(
    any(
      testEntityApi.schema.TO_MULTI_LINK._linkedEntityApi.schema.TO_SINGLE_LINK.filter(
        testEntityApi.schema.TO_MULTI_LINK._linkedEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi.schema.STRING_PROPERTY.equals(
          'test1'
        )
      )
    )
  )._filters,
  odataStr:
    "(to_MultiLink/any(a0:((a0/to_SingleLink/StringProperty eq 'test1'))))"
};

export const testNestedFilterLambdaExpressionOnLink = {
  filter: testEntityApi.schema.TO_MULTI_LINK.filter(
    any(
      testEntityApi.schema.TO_MULTI_LINK._linkedEntityApi.schema.TO_MULTI_LINK_1.filter(
        any(
          testEntityApi.schema.TO_MULTI_LINK._linkedEntityApi.schema.TO_MULTI_LINK_1._linkedEntityApi.schema.STRING_PROPERTY.equals(
            'test'
          )
        )
      )
    )
  )._filters,
  odataStr:
    "(to_MultiLink/any(a0:((a0/to_MultiLink1/any(a1:(a1/StringProperty eq 'test'))))))"
};

export const testFilterLambdaExpressionFilterFunctionOnLink = {
  filter: testEntityApi.schema.TO_MULTI_LINK.filter(
    any(
      filterFunctions()
        .substring(testEntityMultiLinkApi.schema.STRING_PROPERTY, 1)
        .equals('test')
    )
  )._filters,
  odataStr: "(to_MultiLink/any(a0:(substring(a0/StringProperty,1) eq 'test')))"
};

export const testFilterEnum = {
  filter: testEntityApi.schema.ENUM_PROPERTY.equals(TestEnumType.Member1),
  odataStr: "EnumProperty eq 'Member1'"
};

export const testFilterLambdaExpressionCustom = {
  filter: testEntityApiCustom.schema.TO_MULTI_LINK.filter(
    any(
      testEntityApiCustom.schema.TO_MULTI_LINK._linkedEntityApi.schema.STRING_PROPERTY.equals(
        15
      )
    ),
    all(
      testEntityApiCustom.schema.TO_MULTI_LINK._linkedEntityApi.schema.STRING_PROPERTY.equals(
        20
      )
    )
  )._filters,
  odataStr:
    "(to_MultiLink/any(a0:(a0/StringProperty eq 'URI(15)')) and to_MultiLink/all(a0:(a0/StringProperty eq 'URI(20)')))"
};
