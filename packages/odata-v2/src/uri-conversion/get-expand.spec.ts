import {
  testEntityApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../../test/test-util';
import { getExpand } from './get-expand';

describe('get expand', () => {
  it('for first level expand without sub-query', () => {
    expect(
      getExpand([
        testEntityApi.schema.ALL_FIELDS,
        testEntityApi.schema.TO_SINGLE_LINK,
        testEntityApi.schema.TO_MULTI_LINK
      ]).expand
    ).toBe('to_SingleLink,to_MultiLink');
  });

  it('for single link with sub-query', () => {
    expect(getExpand([testExpandSingleLink.expand]).expand).toBe(
      `${testExpandSingleLink.odataStr}`
    );
  });

  it('for multi link with sub-query', () => {
    expect(getExpand([testExpandMultiLink.expand]).expand).toBe(
      `${testExpandMultiLink.odataStr}`
    );
  });

  it('for multi link with a nested expansion', () => {
    expect(getExpand([testNestedExpandLink.expand]).expand).toBe(
      `${testNestedExpandLink.odataStr}`
    );
  });
});

const testExpandSingleLink = {
  expand: testEntityApi.schema.TO_SINGLE_LINK.select(
    testEntitySingleLinkApi.schema.STRING_PROPERTY,
    testEntitySingleLinkApi.schema.BOOLEAN_PROPERTY
  ),
  odataStr: 'to_SingleLink'
};

const testExpandMultiLink = {
  expand: testEntityApi.schema.TO_MULTI_LINK.select(
    testEntityMultiLinkApi.schema.STRING_PROPERTY,
    testEntityMultiLinkApi.schema.BOOLEAN_PROPERTY
  ),
  odataStr: 'to_MultiLink'
};

const testNestedExpandLink = {
  expand: testEntityApi.schema.TO_SINGLE_LINK.select(
    testEntitySingleLinkApi.schema.TO_MULTI_LINK.select(
      testEntityMultiLinkApi.schema.TO_MULTI_LINK
    )
  ),
  odataStr:
    'to_SingleLink,to_SingleLink/to_MultiLink,to_SingleLink/to_MultiLink/to_MultiLink'
};
