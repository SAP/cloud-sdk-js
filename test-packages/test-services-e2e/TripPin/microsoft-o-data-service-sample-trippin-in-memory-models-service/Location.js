'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Location = exports.LocationField = exports.createLocation = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const City_1 = require('./City');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
/**
 * @deprecated Since v1.6.0. Use [[Location.build]] instead.
 */
function createLocation(json) {
  return Location.build(json);
}
exports.createLocation = createLocation;
/**
 * LocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
class LocationField extends odata_common_1.ComplexTypeField {
  /**
   * Creates an instance of LocationField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, fieldOptions) {
    super(fieldName, fieldOf, Location, fieldOptions);
    this._fieldBuilder = new odata_common_1.FieldBuilder(this);
    /**
     * Representation of the [[Location.address]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.address = this._fieldBuilder.buildEdmTypeField(
      'Address',
      'Edm.String',
      false
    );
    /**
     * Representation of the [[Location.city]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.city = this._fieldBuilder.buildComplexTypeField(
      'City',
      City_1.CityField,
      false
    );
  }
}
exports.LocationField = LocationField;
var Location;
(function (Location) {
  /**
   * Metadata information on all properties of the `Location` complex type.
   */
  Location._propertyMetadata = [
    {
      originalName: 'Address',
      name: 'address',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'City',
      name: 'city',
      type: City_1.City,
      isCollection: false
    }
  ];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/odata-v2` or `@sap-cloud-sdk/odata-v4` package instead.
   */
  function build(json) {
    return (0, odata_v4_1.deserializeComplexType)(json, Location);
  }
  Location.build = build;
})((Location = exports.Location || (exports.Location = {})));
//# sourceMappingURL=Location.js.map
