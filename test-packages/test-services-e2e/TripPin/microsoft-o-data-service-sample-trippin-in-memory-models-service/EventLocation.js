'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EventLocation = exports.EventLocationField = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const City_1 = require('./City');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * EventLocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
class EventLocationField extends internal_1.ComplexTypeField {
  /**
   * Creates an instance of EventLocationField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, fieldOptions) {
    super(fieldName, fieldOf, EventLocation, fieldOptions);
    this._fieldBuilder = new internal_1.FieldBuilder(this);
    /**
     * Representation of the [[EventLocation.buildingInfo]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.buildingInfo = this._fieldBuilder.buildEdmTypeField(
      'BuildingInfo',
      'Edm.String',
      true
    );
    /**
     * Representation of the [[EventLocation.address]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.address = this._fieldBuilder.buildEdmTypeField(
      'Address',
      'Edm.String',
      false
    );
    /**
     * Representation of the [[EventLocation.city]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.city = this._fieldBuilder.buildComplexTypeField(
      'City',
      City_1.CityField,
      false
    );
  }
}
exports.EventLocationField = EventLocationField;
var EventLocation;
(function (EventLocation) {
  /**
   * Metadata information on all properties of the `EventLocation` complex type.
   */
  EventLocation._propertyMetadata = [
    {
      originalName: 'BuildingInfo',
      name: 'buildingInfo',
      type: 'Edm.String',
      isCollection: false
    },
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
})((EventLocation = exports.EventLocation || (exports.EventLocation = {})));
//# sourceMappingURL=EventLocation.js.map
