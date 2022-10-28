import { TestLvl2NestedComplexTypeField } from './TestLvl2NestedComplexType';
import { ComplexTypeField, ConstructorOrField, DeSerializers, DefaultDeSerializers, DeserializedType, Entity, FieldOptions, OrderableEdmTypeField, PropertyMetadata } from '@sap-cloud-sdk/odata-v2';
/**
 * TestNestedComplexType
 */
export interface TestNestedComplexType<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
    /**
     * String Property.
     * @nullable
     */
    stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'>;
    /**
     * Complex Type Property.
     * @nullable
     */
    complexTypeProperty?: DeserializedType<DeSerializersT, 'API_TEST_SRV.A_TestLvl2NestedComplexType'>;
}
/**
 * TestNestedComplexTypeField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestNestedComplexTypeField<EntityT extends Entity, DeSerializersT extends DeSerializers = DefaultDeSerializers, NullableT extends boolean = false, SelectableT extends boolean = false> extends ComplexTypeField<EntityT, DeSerializersT, TestNestedComplexType, NullableT, SelectableT> {
    private _fieldBuilder;
    /**
     * Representation of the {@link TestNestedComplexType.stringProperty} property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    stringProperty: OrderableEdmTypeField<EntityT, DeSerializersT, 'Edm.String', true, false>;
    /**
     * Representation of the {@link TestNestedComplexType.complexTypeProperty} property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    complexTypeProperty: TestLvl2NestedComplexTypeField<EntityT, DeSerializersT, true, false>;
    /**
     * Creates an instance of TestNestedComplexTypeField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>, deSerializers: DeSerializersT, fieldOptions?: FieldOptions<NullableT, SelectableT>);
}
export declare namespace TestNestedComplexType {
    /**
     * Metadata information on all properties of the `TestNestedComplexType` complex type.
     */
    const _propertyMetadata: PropertyMetadata<TestNestedComplexType>[];
}
//# sourceMappingURL=TestNestedComplexType.d.ts.map