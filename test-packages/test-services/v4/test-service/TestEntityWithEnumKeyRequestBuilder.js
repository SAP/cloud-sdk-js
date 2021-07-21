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
exports.TestEntityWithEnumKeyRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntityWithEnumKey_1 = require('./TestEntityWithEnumKey');
/**
 * Request builder class for operations supported on the [[TestEntityWithEnumKey]] entity.
 */
var TestEntityWithEnumKeyRequestBuilder = /** @class */ (function (_super) {
  __extends(TestEntityWithEnumKeyRequestBuilder, _super);
  function TestEntityWithEnumKeyRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntityWithEnumKey` entity based on its keys.
   * @param keyPropertyEnum1 Key property. See [[TestEntityWithEnumKey.keyPropertyEnum1]].
   * @returns A request builder for creating requests to retrieve one `TestEntityWithEnumKey` entity based on its keys.
   */
  TestEntityWithEnumKeyRequestBuilder.prototype.getByKey = function (
    keyPropertyEnum1
  ) {
    return new core_1.GetByKeyRequestBuilderV4(
      TestEntityWithEnumKey_1.TestEntityWithEnumKey,
      { KeyPropertyEnum1: keyPropertyEnum1 }
    );
  };
  /**
   * Returns a request builder for querying all `TestEntityWithEnumKey` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithEnumKey` entities.
   */
  TestEntityWithEnumKeyRequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV4(
      TestEntityWithEnumKey_1.TestEntityWithEnumKey
    );
  };
  /**
   * Returns a request builder for creating a `TestEntityWithEnumKey` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithEnumKey`.
   */
  TestEntityWithEnumKeyRequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV4(
      TestEntityWithEnumKey_1.TestEntityWithEnumKey,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntityWithEnumKey`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityWithEnumKey`.
   */
  TestEntityWithEnumKeyRequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV4(
      TestEntityWithEnumKey_1.TestEntityWithEnumKey,
      entity
    );
  };
  TestEntityWithEnumKeyRequestBuilder.prototype.delete = function (
    keyPropertyEnum1OrEntity
  ) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntityWithEnumKey_1.TestEntityWithEnumKey,
      keyPropertyEnum1OrEntity instanceof
      TestEntityWithEnumKey_1.TestEntityWithEnumKey
        ? keyPropertyEnum1OrEntity
        : { KeyPropertyEnum1: keyPropertyEnum1OrEntity }
    );
  };
  return TestEntityWithEnumKeyRequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntityWithEnumKeyRequestBuilder =
  TestEntityWithEnumKeyRequestBuilder;
//# sourceMappingURL=TestEntityWithEnumKeyRequestBuilder.js.map
