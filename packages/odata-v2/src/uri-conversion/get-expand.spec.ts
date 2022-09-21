import { asc } from '@sap-cloud-sdk/odata-common';
import {
    testEntityApi,
    testEntityMultiLinkApi,
    testEntitySingleLinkApi
} from '../../test/test-util';
import {
    testEntityApi as testEntityApiV4,
    testEntityMultiLinkApi as testEntityMultiLinkApiV4
} from '../../../odata-v4/test/test-util';
import { getExpand } from './get-expand';

describe('get expand', () => {
    it('for first level expand without sub-query', () => {
        // 'ALL_FIELDS' is ignored because the function doesn't cover the case unlike the getExpand in v4.
        expect(
            getExpand([
                testEntityApi.schema.ALL_FIELDS,
                testEntityApi.schema.TO_SINGLE_LINK,
                testEntityApi.schema.TO_MULTI_LINK
            ]).expand
        ).toBe('to_SingleLink,to_MultiLink');
    });
    // OneToOneLink
    // sub-queries are igonred because the function doesn't catch them unlike the getExpand in v4.
    it('for single link with sub-query', () => {
        expect(getExpand([testExpandSingleLink.expand]).expand).toBe(
            `${testExpandSingleLink.odataStr}`
        );
    });
    // Link because OneToManyLink is for v4, not v2
    it('for multi link with sub-query', () => {
        expect(getExpand([testExpandMultiLink.expand]).expand).toBe(
            `${testExpandMultiLink.odataStr}`
        );
    });
});

const encodedSpace = encodeURIComponent(' ');

const testExpandSingleLink = {
    expand: testEntityApi.schema.TO_SINGLE_LINK.select(
        testEntitySingleLinkApi.schema.STRING_PROPERTY,
        testEntitySingleLinkApi.schema.BOOLEAN_PROPERTY
    ),
    odataStr: 'to_SingleLink'
    // sub queries '($select=StringProperty,BooleanProperty)' are ignored
};

const testExpandMultiLink = {
    expand: testEntityApi.schema.TO_MULTI_LINK.select(
        testEntityMultiLinkApi.schema.STRING_PROPERTY,
        testEntityMultiLinkApi.schema.BOOLEAN_PROPERTY
    ),
    odataStr: `to_MultiLink($select=StringProperty,BooleanProperty;$filter=(StringProperty%20eq%20'test');$skip=1;$top=1;$orderby=StringProperty${encodedSpace}asc)`

};

// there are only clone, expand and select methods as query opitions. no orderBy and other queries are there
testEntityApi.schema.TO_MULTI_LINK
    .select(
        testEntityMultiLinkApi.schema.STRING_PROPERTY,
        testEntityMultiLinkApi.schema.BOOLEAN_PROPERTY
    );  
// orderBy, select, skip and top are there
testEntityApiV4.schema.TO_MULTI_LINK
    .select(
        testEntityMultiLinkApiV4.schema.STRING_PROPERTY,
        testEntityMultiLinkApiV4.schema.BOOLEAN_PROPERTY
    )
    .orderBy(asc(testEntityMultiLinkApiV4.schema.STRING_PROPERTY));
