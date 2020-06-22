import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType } from '@sap-cloud-sdk/core/src/odata/v4';
/**
 * TestComplexBaseType
 */
export interface TestComplexBaseType {
    /**
     * Base String Property.
     * @nullable
     */
    baseStringProperty?: string;
}
/**
 * @deprecated Since v1.6.0. Use [[TestComplexBaseType.build]] instead.
 */
export declare function createTestComplexBaseType(json: any): TestComplexBaseType;
/**
 * TestComplexBaseTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestComplexBaseTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
    /**
     * Representation of the [[TestComplexBaseType.baseStringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    baseStringProperty: ComplexTypeStringPropertyField<EntityT>;
}
export declare namespace TestComplexBaseType {
    function build(json: {
        [keys: string]: FieldType;
    }): TestComplexBaseType;
}
//# sourceMappingURL=TestComplexBaseType.d.ts.map