import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType } from '@sap-cloud-sdk/core';
/**
 * TestNestedComplexType
 */
export interface TestNestedComplexType {
    /**
     * String Property.
     * @nullable
     */
    stringProperty?: string;
}
/**
 * @deprecated Since v1.6.0. Use [[TestNestedComplexType.build]] instead.
 */
export declare function createTestNestedComplexType(json: any): TestNestedComplexType;
/**
 * TestNestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestNestedComplexTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
    /**
     * Representation of the [[TestNestedComplexType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    stringProperty: ComplexTypeStringPropertyField<EntityT>;
}
export declare namespace TestNestedComplexType {
    function build(json: {
        [keys: string]: FieldType;
    }): TestNestedComplexType;
}
//# sourceMappingURL=TestNestedComplexType.d.ts.map