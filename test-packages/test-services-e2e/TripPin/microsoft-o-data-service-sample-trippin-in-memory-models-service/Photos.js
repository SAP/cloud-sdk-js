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
exports.Photos = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var PhotosRequestBuilder_1 = require('./PhotosRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "Photos" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
var Photos = /** @class */ (function (_super) {
  __extends(Photos, _super);
  function Photos() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `Photos`.
   * @returns A builder that constructs instances of entity type `Photos`.
   */
  Photos.builder = function () {
    return core_1.EntityV4.entityBuilder(Photos);
  };
  /**
   * Returns a request builder to construct requests for operations on the `Photos` entity type.
   * @returns A `Photos` request builder.
   */
  Photos.requestBuilder = function () {
    return new PhotosRequestBuilder_1.PhotosRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Photos`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Photos`.
   */
  Photos.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(fieldName, Photos);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  Photos.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for Photos.
   */
  Photos._entityName = 'Photos';
  /**
   * Default url path for the according service.
   */
  Photos._defaultServicePath =
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  return Photos;
})(core_1.EntityV4);
exports.Photos = Photos;
(function (Photos) {
  var _fieldBuilder = new core_1.FieldBuilder(Photos);
  /**
   * Static representation of the [[id]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Photos.ID = _fieldBuilder.buildEdmTypeField('Id', 'Edm.Int64', false);
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Photos.NAME = _fieldBuilder.buildEdmTypeField('Name', 'Edm.String', true);
  /**
   * All fields of the Photos entity.
   */
  Photos._allFields = [Photos.ID, Photos.NAME];
  /**
   * All fields selector.
   */
  Photos.ALL_FIELDS = new core_1.AllFields('*', Photos);
  /**
   * All key fields of the Photos entity.
   */
  Photos._keyFields = [Photos.ID];
  /**
   * Mapping of all key field names to the respective static field property Photos.
   */
  Photos._keys = Photos._keyFields.reduce(function (acc, field) {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((Photos = exports.Photos || (exports.Photos = {})));
exports.Photos = Photos;
//# sourceMappingURL=Photos.js.map
