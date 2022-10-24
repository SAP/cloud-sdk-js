import { CityField } from './City';
import { ComplexTypeField, ConstructorOrField, DeSerializers, DefaultDeSerializers, DeserializedType, Entity, FieldOptions, OrderableEdmTypeField, PropertyMetadata } from '@sap-cloud-sdk/odata-v4';
/**
 * Location
 */
export interface Location<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
    /**
     * Address.
     */
    address: DeserializedType<DeSerializersT, 'Edm.String'>;
    /**
     * City.
     */
    city: DeserializedType<DeSerializersT, 'Microsoft.OData.SampleService.Models.TripPin.City'>;
}
/**
 * LocationField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class LocationField<EntityT extends Entity, DeSerializersT extends DeSerializers = DefaultDeSerializers, NullableT extends boolean = false, SelectableT extends boolean = false> extends ComplexTypeField<EntityT, DeSerializersT, Location, NullableT, SelectableT> {
    private _fieldBuilder;
    /**
     * Representation of the {@link Location.address} property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    address: OrderableEdmTypeField<EntityT, DeSerializersT, 'Edm.String', false, false>;
    /**
     * Representation of the {@link Location.city} property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    city: CityField<EntityT, DeSerializersT, false, false>;
    /**
     * Creates an instance of LocationField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>, deSerializers: DeSerializersT, fieldOptions?: FieldOptions<NullableT, SelectableT>);
}
export declare namespace Location {
    /**
     * Metadata information on all properties of the `Location` complex type.
     */
    const _propertyMetadata: PropertyMetadata<Location>[];
}
//# sourceMappingURL=Location.d.ts.map