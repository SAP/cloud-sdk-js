import { ComplexTypeField, ConstructorOrField, DeSerializers, DefaultDeSerializers, DeserializedType, Entity, FieldOptions, OrderableEdmTypeField, PropertyMetadata } from '@sap-cloud-sdk/odata-v4';
/**
 * TestComplexType1
 */
export interface TestComplexType1<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
    /**
     * String Property.
     */
    stringProperty: DeserializedType<DeSerializersT, 'Edm.String'>;
}
/**
 * TestComplexType1Field
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestComplexType1Field<EntityT extends Entity, DeSerializersT extends DeSerializers = DefaultDeSerializers, NullableT extends boolean = false, SelectableT extends boolean = false> extends ComplexTypeField<EntityT, DeSerializersT, TestComplexType1, NullableT, SelectableT> {
    private _fieldBuilder;
    /**
     * Representation of the {@link TestComplexType1.stringProperty} property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    stringProperty: OrderableEdmTypeField<EntityT, DeSerializersT, 'Edm.String', false, false>;
    /**
     * Creates an instance of TestComplexType1Field.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>, deSerializers: DeSerializersT, fieldOptions?: FieldOptions<NullableT, SelectableT>);
}
export declare namespace TestComplexType1 {
    /**
     * Metadata information on all properties of the `TestComplexType1` complex type.
     */
    const _propertyMetadata: PropertyMetadata<TestComplexType1>[];
}
//# sourceMappingURL=TestComplexType1.d.ts.map