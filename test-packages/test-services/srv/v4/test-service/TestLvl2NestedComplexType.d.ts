import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType } from '@sap-cloud-sdk/core/src/odata/v4';
/**
 * TestLvl2NestedComplexType
 */
export interface TestLvl2NestedComplexType {
    /**
     * String Property.
     * @nullable
     */
    stringProperty?: string;
}
/**
 * @deprecated Since v1.6.0. Use [[TestLvl2NestedComplexType.build]] instead.
 */
export declare function createTestLvl2NestedComplexType(json: any): TestLvl2NestedComplexType;
/**
 * TestLvl2NestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestLvl2NestedComplexTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
    /**
     * Representation of the [[TestLvl2NestedComplexType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    stringProperty: ComplexTypeStringPropertyField<EntityT>;
}
export declare namespace TestLvl2NestedComplexType {
    function build(json: {
        [keys: string]: FieldType;
    }): TestLvl2NestedComplexType;
}
//# sourceMappingURL=TestLvl2NestedComplexType.d.ts.map