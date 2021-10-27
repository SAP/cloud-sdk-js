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
exports.MultiSchemaTestEntityRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var odata_common_1 = require('@sap-cloud-sdk/odata-common');
var odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
var MultiSchemaTestEntity_1 = require('./MultiSchemaTestEntity');
/**
 * Request builder class for operations supported on the [[MultiSchemaTestEntity]] entity.
 */
var MultiSchemaTestEntityRequestBuilder = /** @class */ (function (_super) {
  __extends(MultiSchemaTestEntityRequestBuilder, _super);
  function MultiSchemaTestEntityRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `MultiSchemaTestEntity` entity based on its keys.
   * @param keyProperty Key property. See [[MultiSchemaTestEntity.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `MultiSchemaTestEntity` entity based on its keys.
   */
  MultiSchemaTestEntityRequestBuilder.prototype.getByKey = function (
    keyProperty
  ) {
    return new odata_v2_1.GetByKeyRequestBuilder(
      MultiSchemaTestEntity_1.MultiSchemaTestEntity,
      { KeyProperty: keyProperty }
    );
  };
  /**
   * Returns a request builder for querying all `MultiSchemaTestEntity` entities.
   * @returns A request builder for creating requests to retrieve all `MultiSchemaTestEntity` entities.
   */
  MultiSchemaTestEntityRequestBuilder.prototype.getAll = function () {
    return new odata_v2_1.GetAllRequestBuilder(
      MultiSchemaTestEntity_1.MultiSchemaTestEntity
    );
  };
  /**
   * Returns a request builder for creating a `MultiSchemaTestEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `MultiSchemaTestEntity`.
   */
  MultiSchemaTestEntityRequestBuilder.prototype.create = function (entity) {
    return new odata_v2_1.CreateRequestBuilder(
      MultiSchemaTestEntity_1.MultiSchemaTestEntity,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `MultiSchemaTestEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `MultiSchemaTestEntity`.
   */
  MultiSchemaTestEntityRequestBuilder.prototype.update = function (entity) {
    return new odata_v2_1.UpdateRequestBuilder(
      MultiSchemaTestEntity_1.MultiSchemaTestEntity,
      entity
    );
  };
  MultiSchemaTestEntityRequestBuilder.prototype.delete = function (
    keyPropertyOrEntity
  ) {
    return new odata_v2_1.DeleteRequestBuilder(
      MultiSchemaTestEntity_1.MultiSchemaTestEntity,
      keyPropertyOrEntity instanceof
      MultiSchemaTestEntity_1.MultiSchemaTestEntity
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  };
  return MultiSchemaTestEntityRequestBuilder;
})(odata_common_1.RequestBuilder);
exports.MultiSchemaTestEntityRequestBuilder =
  MultiSchemaTestEntityRequestBuilder;
//# sourceMappingURL=MultiSchemaTestEntityRequestBuilder.js.map
