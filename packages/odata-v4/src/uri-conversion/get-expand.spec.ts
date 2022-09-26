import { asc } from '@sap-cloud-sdk/odata-common';
import {
  testEntityApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../../test/test-util';
import { getExpand } from './get-expand';

describe('get expand', () => {
  it('for first level expand without sub-query', () => {
    expect(
      getExpand(
        [
          testEntityApi.schema.ALL_FIELDS,
          testEntityApi.schema.TO_SINGLE_LINK,
          testEntityApi.schema.TO_MULTI_LINK
        ],
        testEntityApi
      ).expand
    ).toBe('*,to_SingleLink,to_MultiLink');
  });

  it('for single link with sub-query', () => {
    expect(getExpand([testExpandSingleLink.expand], testEntityApi).expand).toBe(
      `${testExpandSingleLink.odataStr}`
    );
  });

  it('for multi link with sub-query', () => {
    expect(getExpand([testExpandMultiLink.expand], testEntityApi).expand).toBe(
      `${testExpandMultiLink.odataStr}`
    );
  });

  it('for multi link with nested sub-query', () => {
    expect(getExpand([testNestedExpandLink.expand], testEntityApi).expand).toBe(
      `${testNestedExpandLink.odataStr}`
    );
  });
});

const encodedSpace = encodeURIComponent(' ');

const testExpandSingleLink = {
  expand: testEntityApi.schema.TO_SINGLE_LINK.select(
    testEntitySingleLinkApi.schema.STRING_PROPERTY,
    testEntitySingleLinkApi.schema.BOOLEAN_PROPERTY
  ),
  odataStr: 'to_SingleLink($select=StringProperty,BooleanProperty)'
};

const testExpandMultiLink = {
  expand: testEntityApi.schema.TO_MULTI_LINK.select(
    testEntityMultiLinkApi.schema.STRING_PROPERTY,
    testEntityMultiLinkApi.schema.BOOLEAN_PROPERTY
  )
    .orderBy(asc(testEntityMultiLinkApi.schema.STRING_PROPERTY))
    .filter(testEntityMultiLinkApi.schema.STRING_PROPERTY.equals('test'))
    .top(1)
    .skip(1),
  odataStr: `to_MultiLink($select=StringProperty,BooleanProperty;$filter=(StringProperty%20eq%20'test');$skip=1;$top=1;$orderby=StringProperty${encodedSpace}asc)`
};

const testNestedExpandLink = {
  expand: testEntityApi.schema.TO_SINGLE_LINK.expand(
    testEntitySingleLinkApi.schema.TO_SINGLE_LINK.expand(
      testEntityMultiLinkApi.schema.TO_MULTI_LINK_1
    )
  ),
  odataStr: 'to_SingleLink($expand=to_SingleLink($expand=to_MultiLink1))'
}