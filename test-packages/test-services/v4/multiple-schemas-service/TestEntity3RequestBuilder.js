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
exports.TestEntity3RequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var odata_common_1 = require('@sap-cloud-sdk/odata-common');
var odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
var TestEntity3_1 = require('./TestEntity3');
/**
 * Request builder class for operations supported on the [[TestEntity3]] entity.
 */
var TestEntity3RequestBuilder = /** @class */ (function (_super) {
  __extends(TestEntity3RequestBuilder, _super);
  function TestEntity3RequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntity3` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntity3.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity3` entity based on its keys.
   */
  TestEntity3RequestBuilder.prototype.getByKey = function (keyPropertyString) {
    return new odata_v4_1.GetByKeyRequestBuilder(TestEntity3_1.TestEntity3, {
      KeyPropertyString: keyPropertyString
    });
  };
  /**
   * Returns a request builder for querying all `TestEntity3` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity3` entities.
   */
  TestEntity3RequestBuilder.prototype.getAll = function () {
    return new odata_v4_1.GetAllRequestBuilder(TestEntity3_1.TestEntity3);
  };
  /**
   * Returns a request builder for creating a `TestEntity3` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity3`.
   */
  TestEntity3RequestBuilder.prototype.create = function (entity) {
    return new odata_v4_1.CreateRequestBuilder(
      TestEntity3_1.TestEntity3,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntity3`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity3`.
   */
  TestEntity3RequestBuilder.prototype.update = function (entity) {
    return new odata_v4_1.UpdateRequestBuilder(
      TestEntity3_1.TestEntity3,
      entity
    );
  };
  TestEntity3RequestBuilder.prototype.delete = function (
    keyPropertyStringOrEntity
  ) {
    return new odata_v4_1.DeleteRequestBuilder(
      TestEntity3_1.TestEntity3,
      keyPropertyStringOrEntity instanceof TestEntity3_1.TestEntity3
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity }
    );
  };
  return TestEntity3RequestBuilder;
})(odata_common_1.RequestBuilder);
exports.TestEntity3RequestBuilder = TestEntity3RequestBuilder;
//# sourceMappingURL=TestEntity3RequestBuilder.js.map
