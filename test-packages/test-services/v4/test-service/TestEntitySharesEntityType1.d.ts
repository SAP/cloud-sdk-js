import { TestEntitySharesEntityType1RequestBuilder } from './TestEntitySharesEntityType1RequestBuilder';
import { AllFields, CustomFieldV4, EntityBuilderType, EntityV4, Field, NumberField, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntitySharesEntityType1" of service "API_TEST_SRV".
 */
export declare class TestEntitySharesEntityType1 extends EntityV4 implements TestEntitySharesEntityType1Type {
    /**
     * Technical entity name for TestEntitySharesEntityType1.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Key Property String.
     */
    keyPropertyString: string;
    /**
     * Int 32 Property.
     * @nullable
     */
    int32Property?: number;
    /**
     * Returns an entity builder to construct instances of `TestEntitySharesEntityType1`.
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType1`.
     */
    static builder(): EntityBuilderType<TestEntitySharesEntityType1, TestEntitySharesEntityType1Type>;
    /**
     * Returns a request builder to construct requests for operations on the `TestEntitySharesEntityType1` entity type.
     * @returns A `TestEntitySharesEntityType1` request builder.
     */
    static requestBuilder(): TestEntitySharesEntityType1RequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySharesEntityType1`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType1`.
     */
    static customField(fieldName: string): CustomFieldV4<TestEntitySharesEntityType1>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface TestEntitySharesEntityType1Type {
    keyPropertyString: string;
    int32Property?: number | null;
}
export declare namespace TestEntitySharesEntityType1 {
    /**
     * Static representation of the [[keyPropertyString]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KEY_PROPERTY_STRING: StringField<TestEntitySharesEntityType1>;
    /**
     * Static representation of the [[int32Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_32_PROPERTY: NumberField<TestEntitySharesEntityType1>;
    /**
     * All fields of the TestEntitySharesEntityType1 entity.
     */
    const _allFields: Array<StringField<TestEntitySharesEntityType1> | NumberField<TestEntitySharesEntityType1>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<TestEntitySharesEntityType1>;
    /**
     * All key fields of the TestEntitySharesEntityType1 entity.
     */
    const _keyFields: Array<Field<TestEntitySharesEntityType1>>;
    /**
     * Mapping of all key field names to the respective static field property TestEntitySharesEntityType1.
     */
    const _keys: {
        [keys: string]: Field<TestEntitySharesEntityType1>;
    };
}
//# sourceMappingURL=TestEntitySharesEntityType1.d.ts.map