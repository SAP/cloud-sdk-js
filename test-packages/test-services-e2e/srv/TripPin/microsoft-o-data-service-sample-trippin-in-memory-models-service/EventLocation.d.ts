import { City, CityField } from './City';
import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType } from '@sap-cloud-sdk/core/v4';
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
export declare class EventLocationField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
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
}
export declare namespace EventLocation {
    function build(json: {
        [keys: string]: FieldType | City;
    }): EventLocation;
}
//# sourceMappingURL=EventLocation.d.ts.map