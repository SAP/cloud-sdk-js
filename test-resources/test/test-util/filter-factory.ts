import { v4 as uuid } from 'uuid';
import { all, any, filterFunctions } from '@sap-cloud-sdk/odata-v4';
import { or } from '@sap-cloud-sdk/odata-common/internal';
import {
  TestEnumType,
  testService as testServiceV4
} from '@sap-cloud-sdk/test-services/v4/test-service';
import { testService } from '@sap-cloud-sdk/test-services/v2/test-service';
import {FilterLambdaExpression} from "@sap-cloud-sdk/odata-common/dist/filter";
import {EntityBase} from "@sap-cloud-sdk/odata-common/dist/entity-base";

const { testEntityApi } = testService();
const {
  testEntityApi: testEntityApiV4,
  testEntityMultiLinkApi: testEntityMultiLinkApiV4
} = testServiceV4();

export const testFilterString = {
  filter: testEntityApi.schema.STRING_PROPERTY.equals('test'),
  odataStr: "StringProperty eq 'test'"
};

export const testFilterStringEncoding = {
  filter: testEntityApi.schema.STRING_PROPERTY.equals("?'&$"),
  odataStr: "StringProperty eq '?''&$'"
};

export const testFilterStringV4 = {
  filter: testEntityApiV4.schema.STRING_PROPERTY.equals('test'),
  odataStr: "StringProperty eq 'test'"
};

export const testFilterInt16 = {
  filter: testEntityApi.schema.INT_16_PROPERTY.equals(42),
  odataStr: 'Int16Property eq 42'
};

export const testFilterBoolean = {
  filter: testEntityApi.schema.BOOLEAN_PROPERTY.equals(true),
  odataStr: 'BooleanProperty eq true'
};

const id = uuid();

export const testFilterGuid = {
  filter: testEntityApi.schema.GUID_PROPERTY.equals(id),
  odataStr: `GuidProperty eq guid'${id}'`
};

export const testFilterSingleLink = {
  filter: testEntityApi.schema.TO_SINGLE_LINK.filter(
    testEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi.schema.KEY_PROPERTY.equals(
      'test'
    ),
    testEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi.schema.BOOLEAN_PROPERTY.equals(
      false
    )
  ),
  odataStr:
    "to_SingleLink/KeyProperty eq 'test' and to_SingleLink/BooleanProperty eq false"
};

export const testFilterLambdaExpressionOnLink = {
  filter: testEntityApiV4.schema.TO_MULTI_LINK.filter(
    any(
      testEntityApiV4.schema.TO_MULTI_LINK._linkedEntityApi.schema.STRING_PROPERTY.equals(
        'test1'
      )
    ),
    all(
      testEntityApiV4.schema.TO_MULTI_LINK._linkedEntityApi.schema.STRING_PROPERTY.equals(
        'test2'
      )
    )
  )._filters,
  odataStr:
    "(to_MultiLink/any(a0:(a0/StringProperty eq 'test1')) and to_MultiLink/all(a0:(a0/StringProperty eq 'test2')))"
};

export const testFilterLambdaExpressionWithOr = {
  filter: or(
    testEntityApiV4.schema.STRING_PROPERTY.equals('str1'),
    testEntityApiV4.schema.TO_MULTI_LINK.filter(
      any(
        testEntityApiV4.schema.TO_MULTI_LINK._linkedEntityApi.schema.STRING_PROPERTY.equals(
          'str2'
        )
      )
    )
  ),
  odataStr:
    "(StringProperty eq 'str1' or (to_MultiLink/any(a0:(a0/StringProperty eq 'str2'))))"
};

export const testFilterLambdaExpressionFilterListOnLink = {
  filter: testEntityApiV4.schema.TO_MULTI_LINK.filter(
    any(
      or(
        testEntityMultiLinkApiV4.schema.STRING_PROPERTY.equals('test1'),
        testEntityMultiLinkApiV4.schema.INT_16_PROPERTY.equals(1)
      )
    )
  )._filters,
  odataStr:
    "(to_MultiLink/any(a0:((a0/StringProperty eq 'test1' or a0/Int16Property eq 1))))"
};

export const testFilterLambdaExpressionFilterLinkOnLink = {
  filter: testEntityApiV4.schema.TO_MULTI_LINK.filter(
    any(
      testEntityApiV4.schema.TO_MULTI_LINK._linkedEntityApi.schema.TO_SINGLE_LINK.filter(
        testEntityApiV4.schema.TO_MULTI_LINK._linkedEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi.schema.STRING_PROPERTY.equals(
          'test1'
        )
      )
    )
  )._filters,
  odataStr:
    "(to_MultiLink/any(a0:((a0/to_SingleLink/StringProperty eq 'test1'))))"
};

export const testNestedFilterLambdaExpressionOnLink = {
  filter: testEntityApiV4.schema.TO_MULTI_LINK.filter(
    any(
      testEntityApiV4.schema.TO_MULTI_LINK._linkedEntityApi.schema.TO_MULTI_LINK_1.filter(
        any(
          testEntityApiV4.schema.TO_MULTI_LINK._linkedEntityApi.schema.TO_MULTI_LINK_1._linkedEntityApi.schema.STRING_PROPERTY.equals(
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
  filter: testEntityApiV4.schema.TO_MULTI_LINK.filter(
      any(filterFunctions()
          .substring(
              testEntityMultiLinkApiV4.schema
                  .STRING_PROPERTY,
              1
          ).equals('test'))
  )._filters,
  odataStr: "(to_MultiLink/any(a0:(substring(a0/StringProperty,1) eq 'test')))"
};

export const testFilterEnum = {
  filter: testEntityApiV4.schema.ENUM_PROPERTY.equals(TestEnumType.Member1),
  odataStr: "EnumProperty eq 'Member1'"
};
