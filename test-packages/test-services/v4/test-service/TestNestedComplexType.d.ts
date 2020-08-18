import { TestLvl2NestedComplexType, TestLvl2NestedComplexTypeField } from './TestLvl2NestedComplexType';
import { ComplexTypeField, ComplexTypeStringPropertyField, ConstructorOrField, Entity, FieldType, PropertyMetadata } from '@sap-cloud-sdk/core';
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
export declare class TestNestedComplexTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT, TestNestedComplexType> {
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
    /**
     * Creates an instance of TestNestedComplexTypeField.
     *
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>);
}
export declare namespace TestNestedComplexType {
    /**
     * Metadata information on all properties of the `TestNestedComplexType` complex type.
     */
    const _propertyMetadata: PropertyMetadata<TestNestedComplexType>[];
    /**
     * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/core` package instead.
     */
    function build(json: {
        [keys: string]: FieldType | TestLvl2NestedComplexType;
    }): TestNestedComplexType;
}
//# sourceMappingURL=TestNestedComplexType.d.ts.map