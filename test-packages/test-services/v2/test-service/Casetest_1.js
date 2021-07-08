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
exports.Casetest_1 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var Casetest_1RequestBuilder_1 = require('./Casetest_1RequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_CASETEST" of service "API_TEST_SRV".
 */
var Casetest_1 = /** @class */ (function (_super) {
  __extends(Casetest_1, _super);
  function Casetest_1() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `Casetest_1`.
   * @returns A builder that constructs instances of entity type `Casetest_1`.
   */
  Casetest_1.builder = function () {
    return core_1.EntityV2.entityBuilder(Casetest_1);
  };
  /**
   * Returns a request builder to construct requests for operations on the `Casetest_1` entity type.
   * @returns A `Casetest_1` request builder.
   */
  Casetest_1.requestBuilder = function () {
    return new Casetest_1RequestBuilder_1.Casetest_1RequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Casetest_1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Casetest_1`.
   */
  Casetest_1.customField = function (fieldName) {
    return core_1.EntityV2.customFieldSelector(fieldName, Casetest_1);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  Casetest_1.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for Casetest_1.
   */
  Casetest_1._entityName = 'A_CASETEST';
  /**
   * Default url path for the according service.
   */
  Casetest_1._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  return Casetest_1;
})(core_1.EntityV2);
exports.Casetest_1 = Casetest_1;
(function (Casetest_1) {
  var _fieldBuilder = new core_1.FieldBuilder(Casetest_1);
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Casetest_1.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * All fields of the Casetest_1 entity.
   */
  Casetest_1._allFields = [Casetest_1.KEY_PROPERTY_STRING];
  /**
   * All fields selector.
   */
  Casetest_1.ALL_FIELDS = new core_1.AllFields('*', Casetest_1);
  /**
   * All key fields of the Casetest_1 entity.
   */
  Casetest_1._keyFields = [Casetest_1.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property Casetest_1.
   */
  Casetest_1._keys = Casetest_1._keyFields.reduce(function (acc, field) {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((Casetest_1 = exports.Casetest_1 || (exports.Casetest_1 = {})));
exports.Casetest_1 = Casetest_1;
//# sourceMappingURL=Casetest_1.js.map
