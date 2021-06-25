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
exports.TestEntity1RequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntity1_1 = require('./TestEntity1');
/**
 * Request builder class for operations supported on the [[TestEntity1]] entity.
 */
var TestEntity1RequestBuilder = /** @class */ (function (_super) {
  __extends(TestEntity1RequestBuilder, _super);
  function TestEntity1RequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntity1` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntity1.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity1` entity based on its keys.
   */
  TestEntity1RequestBuilder.prototype.getByKey = function (keyPropertyString) {
    return new core_1.GetByKeyRequestBuilderV4(TestEntity1_1.TestEntity1, {
      KeyPropertyString: keyPropertyString
    });
  };
  /**
   * Returns a request builder for querying all `TestEntity1` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity1` entities.
   */
  TestEntity1RequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV4(TestEntity1_1.TestEntity1);
  };
  /**
   * Returns a request builder for creating a `TestEntity1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity1`.
   */
  TestEntity1RequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV4(TestEntity1_1.TestEntity1, entity);
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntity1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity1`.
   */
  TestEntity1RequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV4(TestEntity1_1.TestEntity1, entity);
  };
  TestEntity1RequestBuilder.prototype.delete = function (
    keyPropertyStringOrEntity
  ) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntity1_1.TestEntity1,
      keyPropertyStringOrEntity instanceof TestEntity1_1.TestEntity1
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity }
    );
  };
  return TestEntity1RequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntity1RequestBuilder = TestEntity1RequestBuilder;
//# sourceMappingURL=TestEntity1RequestBuilder.js.map
