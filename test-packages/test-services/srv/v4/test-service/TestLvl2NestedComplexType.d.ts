import { ComplexTypeField, ComplexTypeStringPropertyField, ConstructorOrField, Entity, FieldType, PropertyMetadata } from '@sap-cloud-sdk/core/v4';
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
export declare class TestLvl2NestedComplexTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT, TestLvl2NestedComplexType> {
    /**
     * Representation of the [[TestLvl2NestedComplexType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    stringProperty: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Creates an instance of TestLvl2NestedComplexTypeField.
     *
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT, TestLvl2NestedComplexType>);
}
export declare namespace TestLvl2NestedComplexType {
    /**
     * Metadata information on all properties of the `TestLvl2NestedComplexType` complex type.
     */
    const _propertyMetadata: PropertyMetadata[];
    /**
     * Type reference to the according complex type.
     */
    const _complexType: TestLvl2NestedComplexType;
    /**
     * @deprecated Since v1.25.0. Use [[deserializeComplexType]] instead.
     */
    function build(json: {
        [keys: string]: FieldType;
    }): TestLvl2NestedComplexType;
}
//# sourceMappingURL=TestLvl2NestedComplexType.d.ts.map