'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.AirportLocation =
  exports.AirportLocationField =
  exports.createAirportLocation =
    void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var City_1 = require('./City');
var odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
var odata_common_1 = require('@sap-cloud-sdk/odata-common');
/**
 * @deprecated Since v1.6.0. Use [[AirportLocation.build]] instead.
 */
function createAirportLocation(json) {
  return AirportLocation.build(json);
}
exports.createAirportLocation = createAirportLocation;
/**
 * AirportLocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
var AirportLocationField = /** @class */ (function (_super) {
  __extends(AirportLocationField, _super);
  /**
   * Creates an instance of AirportLocationField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  function AirportLocationField(fieldName, fieldOf, fieldOptions) {
    var _this =
      _super.call(this, fieldName, fieldOf, AirportLocation, fieldOptions) ||
      this;
    _this._fieldBuilder = new odata_common_1.FieldBuilder(_this);
    /**
     * Representation of the [[AirportLocation.loc]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.loc = _this._fieldBuilder.buildEdmTypeField('Loc', 'Edm.Any', false);
    /**
     * Representation of the [[AirportLocation.address]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.address = _this._fieldBuilder.buildEdmTypeField(
      'Address',
      'Edm.String',
      false
    );
    /**
     * Representation of the [[AirportLocation.city]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.city = _this._fieldBuilder.buildComplexTypeField(
      'City',
      City_1.CityField,
      false
    );
    return _this;
  }
  return AirportLocationField;
})(odata_common_1.ComplexTypeField);
exports.AirportLocationField = AirportLocationField;
var AirportLocation;
(function (AirportLocation) {
  /**
   * Metadata information on all properties of the `AirportLocation` complex type.
   */
  AirportLocation._propertyMetadata = [
    {
      originalName: 'Loc',
      name: 'loc',
      type: 'Edm.Any',
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
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/odata-v2` or `@sap-cloud-sdk/odata-v4` package instead.
   */
  function build(json) {
    return (0, odata_v4_1.deserializeComplexType)(json, AirportLocation);
  }
  AirportLocation.build = build;
})(
  (AirportLocation = exports.AirportLocation || (exports.AirportLocation = {}))
);
//# sourceMappingURL=AirportLocation.js.map
