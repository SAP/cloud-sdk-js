'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.City = exports.CityField = exports.createCity = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
/**
 * @deprecated Since v1.6.0. Use [[City.build]] instead.
 */
function createCity(json) {
  return City.build(json);
}
exports.createCity = createCity;
/**
 * CityField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
class CityField extends core_1.ComplexTypeField {
  /**
   * Creates an instance of CityField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, fieldOptions) {
    super(fieldName, fieldOf, City, fieldOptions);
    this._fieldBuilder = new core_1.FieldBuilder(this);
    /**
     * Representation of the [[City.countryRegion]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.countryRegion = this._fieldBuilder.buildEdmTypeField(
      'CountryRegion',
      'Edm.String',
      false
    );
    /**
     * Representation of the [[City.name]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.name = this._fieldBuilder.buildEdmTypeField(
      'Name',
      'Edm.String',
      false
    );
    /**
     * Representation of the [[City.region]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.region = this._fieldBuilder.buildEdmTypeField(
      'Region',
      'Edm.String',
      false
    );
  }
}
exports.CityField = CityField;
var City;
(function (City) {
  /**
   * Metadata information on all properties of the `City` complex type.
   */
  City._propertyMetadata = [
    {
      originalName: 'CountryRegion',
      name: 'countryRegion',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'Name',
      name: 'name',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'Region',
      name: 'region',
      type: 'Edm.String',
      isCollection: false
    }
  ];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  function build(json) {
    return (0, core_1.deserializeComplexTypeV4)(json, City);
  }
  City.build = build;
})((City = exports.City || (exports.City = {})));
//# sourceMappingURL=City.js.map
