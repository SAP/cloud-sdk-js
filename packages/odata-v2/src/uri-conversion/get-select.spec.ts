import {
    testEntityApi,
    testEntityMultiLinkApi,
    testEntitySingleLinkApi
} from '../../test/test-util';
import { getSelect } from "./get-select";

describe('get select', () => {
    it('all fields', () => {
        expect(
            getSelect([
                testEntityApi.schema.ALL_FIELDS,
                testEntityApi.schema.TO_SINGLE_LINK,
                testEntityApi.schema.TO_MULTI_LINK
            ]).select
        ).toBe('*,to_SingleLink/*,to_MultiLink/*')
    });

    it('for single link with sub-query', () => {
        expect(
            getSelect([
                testSingleLink.expand
            ]).select
        ).toBe('to_SingleLink/StringProperty,to_SingleLink/BooleanProperty')
    });

    it('for multi link with sub-query', () => {
        expect(getSelect([testMultiLink.expand]).select).toBe(
            // subqueries after `select` doesn't work because the methods doesn't exist in class `Link`
            `${testMultiLink.odataStr}`
        );
    });

});

const encodedSpace = encodeURIComponent(' ');

const testSingleLink = {
    expand: testEntityApi.schema.TO_SINGLE_LINK.select(
        testEntitySingleLinkApi.schema.STRING_PROPERTY,
        testEntitySingleLinkApi.schema.BOOLEAN_PROPERTY
    ),
    odataStr: 'to_SingleLink($select=StringProperty,BooleanProperty)'
};

const testMultiLink = {
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
        // subqueries after `select` `to_MultiLink($select=StringProperty,BooleanProperty;$filter=(StringProperty%20eq%20'test');$skip=1;$top=1;$orderby=StringProperty${encodedSpace}asc)`are ignored
        odataStr: 'to_MultiLink/StringProperty,to_MultiLink/BooleanProperty'
        // 
};