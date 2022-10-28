import { ComplexTypeField, ConstructorOrField, DeSerializers, DefaultDeSerializers, DeserializedType, Entity, FieldOptions, OrderableEdmTypeField, PropertyMetadata } from '@sap-cloud-sdk/odata-v4';
/**
 * TestComplexBaseType
 */
export interface TestComplexBaseType<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
    /**
     * Base String Property.
     * @nullable
     */
    baseStringProperty?: DeserializedType<DeSerializersT, 'Edm.String'>;
}
/**
 * TestComplexBaseTypeField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestComplexBaseTypeField<EntityT extends Entity, DeSerializersT extends DeSerializers = DefaultDeSerializers, NullableT extends boolean = false, SelectableT extends boolean = false> extends ComplexTypeField<EntityT, DeSerializersT, TestComplexBaseType, NullableT, SelectableT> {
    private _fieldBuilder;
    /**
     * Representation of the {@link TestComplexBaseType.baseStringProperty} property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    baseStringProperty: OrderableEdmTypeField<EntityT, DeSerializersT, 'Edm.String', true, false>;
    /**
     * Creates an instance of TestComplexBaseTypeField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>, deSerializers: DeSerializersT, fieldOptions?: FieldOptions<NullableT, SelectableT>);
}
export declare namespace TestComplexBaseType {
    /**
     * Metadata information on all properties of the `TestComplexBaseType` complex type.
     */
    const _propertyMetadata: PropertyMetadata<TestComplexBaseType>[];
}
//# sourceMappingURL=TestComplexBaseType.d.ts.map