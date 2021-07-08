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
exports.MultiSchemaTestEntity = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var MultiSchemaTestEntityRequestBuilder_1 = require('./MultiSchemaTestEntityRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "MultiSchemaTestEntity" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
var MultiSchemaTestEntity = /** @class */ (function (_super) {
  __extends(MultiSchemaTestEntity, _super);
  function MultiSchemaTestEntity() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `MultiSchemaTestEntity`.
   * @returns A builder that constructs instances of entity type `MultiSchemaTestEntity`.
   */
  MultiSchemaTestEntity.builder = function () {
    return core_1.EntityV2.entityBuilder(MultiSchemaTestEntity);
  };
  /**
   * Returns a request builder to construct requests for operations on the `MultiSchemaTestEntity` entity type.
   * @returns A `MultiSchemaTestEntity` request builder.
   */
  MultiSchemaTestEntity.requestBuilder = function () {
    return new MultiSchemaTestEntityRequestBuilder_1.MultiSchemaTestEntityRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `MultiSchemaTestEntity`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `MultiSchemaTestEntity`.
   */
  MultiSchemaTestEntity.customField = function (fieldName) {
    return core_1.EntityV2.customFieldSelector(
      fieldName,
      MultiSchemaTestEntity
    );
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  MultiSchemaTestEntity.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for MultiSchemaTestEntity.
   */
  MultiSchemaTestEntity._entityName = 'MultiSchemaTestEntity';
  /**
   * Default url path for the according service.
   */
  MultiSchemaTestEntity._defaultServicePath = 'VALUE_IS_UNDEFINED';
  return MultiSchemaTestEntity;
})(core_1.EntityV2);
exports.MultiSchemaTestEntity = MultiSchemaTestEntity;
(function (MultiSchemaTestEntity) {
  var _fieldBuilder = new core_1.FieldBuilder(MultiSchemaTestEntity);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  MultiSchemaTestEntity.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * All fields of the MultiSchemaTestEntity entity.
   */
  MultiSchemaTestEntity._allFields = [MultiSchemaTestEntity.KEY_PROPERTY];
  /**
   * All fields selector.
   */
  MultiSchemaTestEntity.ALL_FIELDS = new core_1.AllFields(
    '*',
    MultiSchemaTestEntity
  );
  /**
   * All key fields of the MultiSchemaTestEntity entity.
   */
  MultiSchemaTestEntity._keyFields = [MultiSchemaTestEntity.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property MultiSchemaTestEntity.
   */
  MultiSchemaTestEntity._keys = MultiSchemaTestEntity._keyFields.reduce(
    function (acc, field) {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (MultiSchemaTestEntity =
    exports.MultiSchemaTestEntity || (exports.MultiSchemaTestEntity = {}))
);
exports.MultiSchemaTestEntity = MultiSchemaTestEntity;
//# sourceMappingURL=MultiSchemaTestEntity.js.map
