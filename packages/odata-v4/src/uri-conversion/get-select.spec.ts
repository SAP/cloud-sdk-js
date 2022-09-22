import { asc } from '@sap-cloud-sdk/odata-common';
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
                // 2 properties below aren't accepted because the acceptable argument type `Selectable` doesn't contain the 2 types unlike v2 `getSelect`
                testEntityApi.schema.TO_SINGLE_LINK,
                testEntityApi.schema.TO_MULTI_LINK
            ]).select
        ).toBe('*')
    });
    it('single link', () => {
        expect(
            getSelect([
                //type `OneToOneLink` is not acceptable for type `Selectable`
                testSingleLink.select
            ]).select
        ).toBe('to_SingleLink/StringProperty,to_SingleLink/BooleanProperty')
    });

    it('for multi link with sub-query', () => {
        expect(
            getSelect([
                //type `OneToManyLink` is not acceptable for type `Selectable`
                testMultiLink.select
            ]).select
        ).toBe(
            `${testMultiLink.odataStr}`
        );
    });
});

const encodedSpace = encodeURIComponent(' ');

const testSingleLink = {
    select: testEntityApi.schema.TO_SINGLE_LINK.select(
        testEntitySingleLinkApi.schema.STRING_PROPERTY,
        testEntitySingleLinkApi.schema.BOOLEAN_PROPERTY
    ),
    odataStr: 'to_SingleLink($select=StringProperty,BooleanProperty)'
};

const testMultiLink = {
    select: testEntityApi.schema.TO_MULTI_LINK.select(
        testEntityMultiLinkApi.schema.STRING_PROPERTY,
        testEntityMultiLinkApi.schema.BOOLEAN_PROPERTY
    )
        .orderBy(asc(testEntityMultiLinkApi.schema.STRING_PROPERTY))
        .filter(testEntityMultiLinkApi.schema.STRING_PROPERTY.equals('test'))
        .top(1)
        .skip(1),
    odataStr: `to_MultiLink($select=StringProperty,BooleanProperty;$filter=(StringProperty%20eq%20'test');$skip=1;$top=1;$orderby=StringProperty${encodedSpace}asc)`
};
