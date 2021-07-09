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
exports.City = exports.CityField = exports.createCity = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
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
var CityField = /** @class */ (function (_super) {
  __extends(CityField, _super);
  /**
   * Creates an instance of CityField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  function CityField(fieldName, fieldOf, fieldOptions) {
    var _this =
      _super.call(this, fieldName, fieldOf, City, fieldOptions) || this;
    _this._fieldBuilder = new core_1.FieldBuilder(_this);
    /**
     * Representation of the [[City.countryRegion]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.countryRegion = _this._fieldBuilder.buildEdmTypeField(
      'CountryRegion',
      'Edm.String',
      false
    );
    /**
     * Representation of the [[City.name]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.name = _this._fieldBuilder.buildEdmTypeField(
      'Name',
      'Edm.String',
      false
    );
    /**
     * Representation of the [[City.region]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.region = _this._fieldBuilder.buildEdmTypeField(
      'Region',
      'Edm.String',
      false
    );
    return _this;
  }
  return CityField;
})(core_1.ComplexTypeField);
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
    return core_1.deserializeComplexTypeV4(json, City);
  }
  City.build = build;
})((City = exports.City || (exports.City = {})));
//# sourceMappingURL=City.js.map
