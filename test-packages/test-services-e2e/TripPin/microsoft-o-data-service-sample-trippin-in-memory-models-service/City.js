"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = exports.CityField = void 0;
const internal_1 = require("@sap-cloud-sdk/odata-common/internal");
/**
 * CityField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
class CityField extends internal_1.ComplexTypeField {
    /**
     * Creates an instance of CityField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName, fieldOf, deSerializers, fieldOptions) {
        super(fieldName, fieldOf, deSerializers, City, fieldOptions);
        this._fieldBuilder = new internal_1.FieldBuilder(this, this.deSerializers);
        /**
         * Representation of the [[City.countryRegion]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.countryRegion = this._fieldBuilder.buildEdmTypeField('CountryRegion', 'Edm.String', false);
        /**
         * Representation of the [[City.name]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.name = this._fieldBuilder.buildEdmTypeField('Name', 'Edm.String', false);
        /**
         * Representation of the [[City.region]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.region = this._fieldBuilder.buildEdmTypeField('Region', 'Edm.String', false);
    }
}
exports.CityField = CityField;
var City;
(function (City) {
    /**
     * Metadata information on all properties of the `City` complex type.
     */
    City._propertyMetadata = [{
            originalName: 'CountryRegion',
            name: 'countryRegion',
            type: 'Edm.String',
            isCollection: false
        }, {
            originalName: 'Name',
            name: 'name',
            type: 'Edm.String',
            isCollection: false
        }, {
            originalName: 'Region',
            name: 'region',
            type: 'Edm.String',
            isCollection: false
        }];
})(City = exports.City || (exports.City = {}));
//# sourceMappingURL=City.js.map