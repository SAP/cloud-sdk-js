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
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Airlines = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var AirlinesRequestBuilder_1 = require('./AirlinesRequestBuilder');
var odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
var odata_common_1 = require('@sap-cloud-sdk/odata-common');
/**
 * This class represents the entity "Airlines" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
var Airlines = /** @class */ (function (_super) {
  __extends(Airlines, _super);
  function Airlines() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `Airlines`.
   * @returns A builder that constructs instances of entity type `Airlines`.
   */
  Airlines.builder = function () {
    return odata_v4_1.Entity.entityBuilder(Airlines);
  };
  /**
   * Returns a request builder to construct requests for operations on the `Airlines` entity type.
   * @returns A `Airlines` request builder.
   */
  Airlines.requestBuilder = function () {
    return new AirlinesRequestBuilder_1.AirlinesRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Airlines`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Airlines`.
   */
  Airlines.customField = function (fieldName) {
    return odata_v4_1.Entity.customFieldSelector(fieldName, Airlines);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  Airlines.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for Airlines.
   */
  Airlines._entityName = 'Airlines';
  /**
   * Default url path for the according service.
   */
  Airlines._defaultServicePath =
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  return Airlines;
})(odata_v4_1.Entity);
exports.Airlines = Airlines;
(function (Airlines) {
  var _fieldBuilder = new odata_common_1.FieldBuilder(Airlines);
  /**
   * Static representation of the [[airlineCode]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Airlines.AIRLINE_CODE = _fieldBuilder.buildEdmTypeField(
    'AirlineCode',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Airlines.NAME = _fieldBuilder.buildEdmTypeField('Name', 'Edm.String', false);
  /**
   * All fields of the Airlines entity.
   */
  Airlines._allFields = [Airlines.AIRLINE_CODE, Airlines.NAME];
  /**
   * All fields selector.
   */
  Airlines.ALL_FIELDS = new odata_common_1.AllFields('*', Airlines);
  /**
   * All key fields of the Airlines entity.
   */
  Airlines._keyFields = [Airlines.AIRLINE_CODE];
  /**
   * Mapping of all key field names to the respective static field property Airlines.
   */
  Airlines._keys = Airlines._keyFields.reduce(function (acc, field) {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((Airlines = exports.Airlines || (exports.Airlines = {})));
exports.Airlines = Airlines;
//# sourceMappingURL=Airlines.js.map
