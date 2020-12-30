import { ComplexTypeField, ComplexTypeStringPropertyField, ConstructorOrField, EntityV4, FieldType, PropertyMetadata } from '@sap-cloud-sdk/core';
/**
 * TestComplexType2
 */
export interface TestComplexType2 {
    /**
     * String Property.
     */
    stringProperty: string;
}
/**
 * @deprecated Since v1.6.0. Use [[TestComplexType2.build]] instead.
 */
export declare function createTestComplexType2(json: any): TestComplexType2;
/**
 * TestComplexType2Field
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestComplexType2Field<EntityT extends EntityV4> extends ComplexTypeField<EntityT, TestComplexType2> {
    /**
     * Representation of the [[TestComplexType2.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    stringProperty: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Creates an instance of TestComplexType2Field.
     *
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>);
}
export declare namespace TestComplexType2 {
    /**
     * Metadata information on all properties of the `TestComplexType2` complex type.
     */
    const _propertyMetadata: PropertyMetadata<TestComplexType2>[];
    /**
     * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
     */
    function build(json: {
        [keys: string]: FieldType;
    }): TestComplexType2;
}
//# sourceMappingURL=TestComplexType2.d.ts.map