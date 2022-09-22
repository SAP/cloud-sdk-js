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
        expect(
            getExpand([
                testEntityApi.schema.ALL_FIELDS,
                testEntityApi.schema.TO_SINGLE_LINK,
                testEntityApi.schema.TO_MULTI_LINK
            ]).expand
        )
            // `ALL_FIELDS` is ignored because the function doesn't cover the case, unlike the getExpand in v4.
            // v2 `getExpand` only cares about an argument relating with class 'Link'.
            // Class `AllFields` doesn't have any relationship with the 'Link' hence it's ignored.
            // Unlikely, v4 `getExpand` returns '*' for 'ALL_FIELDS' because it cares about the `ALL_FIELDS` as well.      
            .toBe('to_SingleLink,to_MultiLink');
    });

    it('for single link with sub-query', () => {
        expect(getExpand([testExpandSingleLink.expand]).expand).toBe(
            //subqueries are ignored because the function doesn't catch them, unlike the getExpand in v4.
            `${testExpandSingleLink.odataStr}`
        );
    });

    it('for multi link with sub-query', () => {
        expect(getExpand([testExpandMultiLink.expand]).expand).toBe(
            // v2 uses type `Link` for 1:N relation ship. `Link` doesn't have `orderBy` method.
            // Unlikely, OneToManyLink has OrderBy and other methods because the class has the methods.
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
    // sub queries `($select=StringProperty,BooleanProperty)` are ignored. 
    odataStr: 'to_SingleLink'
};

const testExpandMultiLink = {
    expand: testEntityApi.schema.TO_MULTI_LINK.select(
        testEntityMultiLinkApi.schema.STRING_PROPERTY,
        testEntityMultiLinkApi.schema.BOOLEAN_PROPERTY
    )
        // methods below thorws an error because class `Link` used in v2 doesn't have the methods.
        // Unlikely v4 uses OneToManyLink has the methods hence methods below work in v4 but here v2.
        .orderBy(asc(testEntityMultiLinkApi.schema.STRING_PROPERTY))
        .filter(testEntityMultiLinkApi.schema.STRING_PROPERTY.equals('test'))
        .top(1)
        .skip(1),
    // sub queries `($select=StringProperty,BooleanProperty;$filter=(StringProperty%20eq%20'test');$skip=1;$top=1;$orderby=StringProperty${encodedSpace}asc` are ignored. 
    odataStr: `to_MultiLink`
};
