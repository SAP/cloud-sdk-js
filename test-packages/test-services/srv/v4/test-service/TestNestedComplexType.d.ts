import { TestLvl2NestedComplexType, TestLvl2NestedComplexTypeField } from './TestLvl2NestedComplexType';
import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType } from '@sap-cloud-sdk/core/v4';
/**
 * TestNestedComplexType
 */
export interface TestNestedComplexType {
    /**
     * String Property.
     * @nullable
     */
    stringProperty?: string;
    /**
     * Complex Type Property.
     * @nullable
     */
    complexTypeProperty?: TestLvl2NestedComplexType;
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
    /**
     * Representation of the [[TestNestedComplexType.complexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    complexTypeProperty: TestLvl2NestedComplexTypeField<EntityT>;
}
export declare namespace TestNestedComplexType {
    function build(json: {
        [keys: string]: FieldType | TestLvl2NestedComplexType;
    }): TestNestedComplexType;
}
//# sourceMappingURL=TestNestedComplexType.d.ts.map