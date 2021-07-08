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
exports.CaseTest = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var CaseTestRequestBuilder_1 = require('./CaseTestRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_CaseTest" of service "API_TEST_SRV".
 */
var CaseTest = /** @class */ (function (_super) {
  __extends(CaseTest, _super);
  function CaseTest() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `CaseTest`.
   * @returns A builder that constructs instances of entity type `CaseTest`.
   */
  CaseTest.builder = function () {
    return core_1.EntityV2.entityBuilder(CaseTest);
  };
  /**
   * Returns a request builder to construct requests for operations on the `CaseTest` entity type.
   * @returns A `CaseTest` request builder.
   */
  CaseTest.requestBuilder = function () {
    return new CaseTestRequestBuilder_1.CaseTestRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CaseTest`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CaseTest`.
   */
  CaseTest.customField = function (fieldName) {
    return core_1.EntityV2.customFieldSelector(fieldName, CaseTest);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  CaseTest.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for CaseTest.
   */
  CaseTest._entityName = 'A_CaseTest';
  /**
   * Default url path for the according service.
   */
  CaseTest._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  return CaseTest;
})(core_1.EntityV2);
exports.CaseTest = CaseTest;
(function (CaseTest) {
  var _fieldBuilder = new core_1.FieldBuilder(CaseTest);
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  CaseTest.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * All fields of the CaseTest entity.
   */
  CaseTest._allFields = [CaseTest.KEY_PROPERTY_STRING];
  /**
   * All fields selector.
   */
  CaseTest.ALL_FIELDS = new core_1.AllFields('*', CaseTest);
  /**
   * All key fields of the CaseTest entity.
   */
  CaseTest._keyFields = [CaseTest.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property CaseTest.
   */
  CaseTest._keys = CaseTest._keyFields.reduce(function (acc, field) {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((CaseTest = exports.CaseTest || (exports.CaseTest = {})));
exports.CaseTest = CaseTest;
//# sourceMappingURL=CaseTest.js.map
