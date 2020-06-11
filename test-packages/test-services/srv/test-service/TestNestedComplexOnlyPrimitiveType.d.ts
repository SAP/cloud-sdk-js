import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType } from '@sap-cloud-sdk/core';
/**
 * TestNestedComplexOnlyPrimitiveType
 */
export interface TestNestedComplexOnlyPrimitiveType {
    /**
     * String Property.
     * @nullable
     */
    stringProperty?: string;
}
/**
 * @deprecated Since v1.6.0. Use [[TestNestedComplexOnlyPrimitiveType.build]] instead.
 */
export declare function createTestNestedComplexOnlyPrimitiveType(json: any): TestNestedComplexOnlyPrimitiveType;
/**
 * TestNestedComplexOnlyPrimitiveTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestNestedComplexOnlyPrimitiveTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
    /**
     * Representation of the [[TestNestedComplexOnlyPrimitiveType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    stringProperty: ComplexTypeStringPropertyField<EntityT>;
}
export declare namespace TestNestedComplexOnlyPrimitiveType {
    function build(json: {
        [keys: string]: FieldType;
    }): TestNestedComplexOnlyPrimitiveType;
}
//# sourceMappingURL=TestNestedComplexOnlyPrimitiveType.d.ts.map