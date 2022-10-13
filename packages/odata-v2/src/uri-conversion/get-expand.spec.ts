import {
  testEntityApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../../test/test-util';
import { getExpand } from './get-expand';

describe('get expand', () => {
  it('should return all expand query parameters except for a selection of all fields', () => {
    expect(
      getExpand([
        testEntityApi.schema.ALL_FIELDS,
        testEntityApi.schema.TO_SINGLE_LINK,
        testEntityApi.schema.TO_MULTI_LINK
      ]).expand
    ).toBe('to_SingleLink,to_MultiLink');
  });

  it('should return an expand query parameter for single link with sub-query', () => {
    expect(getExpand([testExpandSingleLink.expand]).expand).toBe(
      `${testExpandSingleLink.odataStr}`
    );
  });

  it('should return an expand query parameter for multi link with sub-query', () => {
    expect(getExpand([testExpandMultiLink.expand]).expand).toBe(
      `${testExpandMultiLink.odataStr}`
    );
  });

  it('should return expand query parameters for multi link with a nested expansion', () => {
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
      // Note: The type here is not correct, thus type assertion to "any".
      // Level 2 api does not have navigation properties.
      // This is okay for the purpose of this test.
      testEntityMultiLinkApi.schema.TO_MULTI_LINK as any
    )
  ),
  odataStr:
    'to_SingleLink,to_SingleLink/to_MultiLink,to_SingleLink/to_MultiLink/to_MultiLink'
};
