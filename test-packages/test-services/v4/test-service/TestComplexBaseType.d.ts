import { ComplexTypeField, ComplexTypeStringPropertyField, ConstructorOrField, Entity, FieldType, PropertyMetadata } from '@sap-cloud-sdk/core/v4';
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
export declare class TestComplexBaseTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT, TestComplexBaseType> {
    /**
     * Representation of the [[TestComplexBaseType.baseStringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    baseStringProperty: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Creates an instance of TestComplexBaseTypeField.
     *
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>);
}
export declare namespace TestComplexBaseType {
    /**
     * Metadata information on all properties of the `TestComplexBaseType` complex type.
     */
    const _propertyMetadata: PropertyMetadata<TestComplexBaseType>[];
    /**
     * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/core` package instead.
     */
    function build(json: {
        [keys: string]: FieldType;
    }): TestComplexBaseType;
}
//# sourceMappingURL=TestComplexBaseType.d.ts.map