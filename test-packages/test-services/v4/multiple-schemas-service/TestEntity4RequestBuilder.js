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
exports.TestEntity4RequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntity4_1 = require('./TestEntity4');
/**
 * Request builder class for operations supported on the [[TestEntity4]] entity.
 */
var TestEntity4RequestBuilder = /** @class */ (function (_super) {
  __extends(TestEntity4RequestBuilder, _super);
  function TestEntity4RequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntity4` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntity4.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity4` entity based on its keys.
   */
  TestEntity4RequestBuilder.prototype.getByKey = function (keyPropertyString) {
    return new core_1.GetByKeyRequestBuilderV4(TestEntity4_1.TestEntity4, {
      KeyPropertyString: keyPropertyString
    });
  };
  /**
   * Returns a request builder for querying all `TestEntity4` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity4` entities.
   */
  TestEntity4RequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV4(TestEntity4_1.TestEntity4);
  };
  /**
   * Returns a request builder for creating a `TestEntity4` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity4`.
   */
  TestEntity4RequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV4(TestEntity4_1.TestEntity4, entity);
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntity4`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity4`.
   */
  TestEntity4RequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV4(TestEntity4_1.TestEntity4, entity);
  };
  TestEntity4RequestBuilder.prototype.delete = function (
    keyPropertyStringOrEntity
  ) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntity4_1.TestEntity4,
      keyPropertyStringOrEntity instanceof TestEntity4_1.TestEntity4
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity }
    );
  };
  return TestEntity4RequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntity4RequestBuilder = TestEntity4RequestBuilder;
//# sourceMappingURL=TestEntity4RequestBuilder.js.map
