import { ComplexTypeField, ConstructorOrField, DeSerializers, DefaultDeSerializers, DeserializedType, Entity, FieldOptions, OrderableEdmTypeField, PropertyMetadata } from '@sap-cloud-sdk/odata-v2';
/**
 * TestLvl2NestedComplexType
 */
export interface TestLvl2NestedComplexType<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
    /**
     * String Property.
     * @nullable
     */
    stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'>;
}
/**
 * TestLvl2NestedComplexTypeField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestLvl2NestedComplexTypeField<EntityT extends Entity, DeSerializersT extends DeSerializers = DefaultDeSerializers, NullableT extends boolean = false, SelectableT extends boolean = false> extends ComplexTypeField<EntityT, DeSerializersT, TestLvl2NestedComplexType, NullableT, SelectableT> {
    private _fieldBuilder;
    /**
     * Representation of the {@link TestLvl2NestedComplexType.stringProperty} property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    stringProperty: OrderableEdmTypeField<EntityT, DeSerializersT, 'Edm.String', true, false>;
    /**
     * Creates an instance of TestLvl2NestedComplexTypeField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>, deSerializers: DeSerializersT, fieldOptions?: FieldOptions<NullableT, SelectableT>);
}
export declare namespace TestLvl2NestedComplexType {
    /**
     * Metadata information on all properties of the `TestLvl2NestedComplexType` complex type.
     */
    const _propertyMetadata: PropertyMetadata<TestLvl2NestedComplexType>[];
}
//# sourceMappingURL=TestLvl2NestedComplexType.d.ts.map