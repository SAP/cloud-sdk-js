import { TestEntitySharesEntityType2RequestBuilder } from './TestEntitySharesEntityType2RequestBuilder';
import { AllFields, CustomFieldV2, EntityBuilderType, EntityV2, Field, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntitySharesEntityType2" of service "API_TEST_SRV".
 */
export declare class TestEntitySharesEntityType2 extends EntityV2 implements TestEntitySharesEntityType2Type {
    /**
     * Technical entity name for TestEntitySharesEntityType2.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Key Property.
     * Maximum length: 10.
     */
    keyProperty: string;
    /**
     * Returns an entity builder to construct instances of `TestEntitySharesEntityType2`.
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType2`.
     */
    static builder(): EntityBuilderType<TestEntitySharesEntityType2, TestEntitySharesEntityType2Type>;
    /**
     * Returns a request builder to construct requests for operations on the `TestEntitySharesEntityType2` entity type.
     * @returns A `TestEntitySharesEntityType2` request builder.
     */
    static requestBuilder(): TestEntitySharesEntityType2RequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySharesEntityType2`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType2`.
     */
    static customField(fieldName: string): CustomFieldV2<TestEntitySharesEntityType2>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface TestEntitySharesEntityType2Type {
    keyProperty: string;
}
export declare namespace TestEntitySharesEntityType2 {
    /**
     * Static representation of the [[keyProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KEY_PROPERTY: StringField<TestEntitySharesEntityType2>;
    /**
     * All fields of the TestEntitySharesEntityType2 entity.
     */
    const _allFields: Array<StringField<TestEntitySharesEntityType2>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<TestEntitySharesEntityType2>;
    /**
     * All key fields of the TestEntitySharesEntityType2 entity.
     */
    const _keyFields: Array<Field<TestEntitySharesEntityType2>>;
    /**
     * Mapping of all key field names to the respective static field property TestEntitySharesEntityType2.
     */
    const _keys: {
        [keys: string]: Field<TestEntitySharesEntityType2>;
    };
}
//# sourceMappingURL=TestEntitySharesEntityType2.d.ts.map