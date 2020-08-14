import { City, CityField } from './City';
import { ComplexTypeField, ComplexTypeStringPropertyField, ConstructorOrField, Entity, FieldType, PropertyMetadata } from '@sap-cloud-sdk/core/v4';
/**
 * EventLocation
 */
export interface EventLocation {
    /**
     * Building Info.
     * @nullable
     */
    buildingInfo?: string;
    /**
     * Address.
     * @nullable
     */
    address?: string;
    /**
     * City.
     * @nullable
     */
    city?: City;
}
/**
 * @deprecated Since v1.6.0. Use [[EventLocation.build]] instead.
 */
export declare function createEventLocation(json: any): EventLocation;
/**
 * EventLocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class EventLocationField<EntityT extends Entity> extends ComplexTypeField<EntityT, EventLocation> {
    /**
     * Representation of the [[EventLocation.buildingInfo]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    buildingInfo: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Representation of the [[EventLocation.address]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    address: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Representation of the [[EventLocation.city]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    city: CityField<EntityT>;
    /**
     * Creates an instance of EventLocationField.
     *
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>);
}
export declare namespace EventLocation {
    /**
     * Metadata information on all properties of the `EventLocation` complex type.
     */
    const _propertyMetadata: PropertyMetadata<EventLocation>[];
    /**
     * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/core` package instead.
     */
    function build(json: {
        [keys: string]: FieldType | City;
    }): EventLocation;
}
//# sourceMappingURL=EventLocation.d.ts.map