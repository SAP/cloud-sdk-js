import { City, CityField } from './City';
import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType } from '@sap-cloud-sdk/core/v4';
/**
 * AirportLocation
 */
export interface AirportLocation {
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
 * @deprecated Since v1.6.0. Use [[AirportLocation.build]] instead.
 */
export declare function createAirportLocation(json: any): AirportLocation;
/**
 * AirportLocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class AirportLocationField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
    /**
     * Representation of the [[AirportLocation.address]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    address: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Representation of the [[AirportLocation.city]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    city: CityField<EntityT>;
}
export declare namespace AirportLocation {
    function build(json: {
        [keys: string]: FieldType | City;
    }): AirportLocation;
}
//# sourceMappingURL=AirportLocation.d.ts.map