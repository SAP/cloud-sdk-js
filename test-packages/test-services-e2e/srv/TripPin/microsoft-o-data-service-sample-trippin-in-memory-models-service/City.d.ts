import { ComplexTypeField, ComplexTypeStringPropertyField, ConstructorOrField, Entity, FieldType, PropertyMetadata } from '@sap-cloud-sdk/core/v4';
/**
 * City
 */
export interface City {
    /**
     * Name.
     * @nullable
     */
    name?: string;
    /**
     * Country Region.
     * @nullable
     */
    countryRegion?: string;
    /**
     * Region.
     * @nullable
     */
    region?: string;
}
/**
 * @deprecated Since v1.6.0. Use [[City.build]] instead.
 */
export declare function createCity(json: any): City;
/**
 * CityField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class CityField<EntityT extends Entity> extends ComplexTypeField<EntityT, City> {
    /**
     * Representation of the [[City.name]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    name: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Representation of the [[City.countryRegion]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    countryRegion: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Representation of the [[City.region]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    region: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Creates an instance of CityField.
     *
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT, City>);
}
export declare namespace City {
    /**
     * Metadata information on all properties of the `City` complex type.
     */
    const _propertyMetadata: PropertyMetadata[];
    /**
     * Type reference to the according complex type.
     */
    const _complexType: City;
    /**
     * @deprecated Since v1.25.0. Use [[deserializeComplexType]] instead.
     */
    function build(json: {
        [keys: string]: FieldType;
    }): City;
}
//# sourceMappingURL=City.d.ts.map