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
exports.TestEntityWithSharedEntityType1RequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntityWithSharedEntityType1_1 = require('./TestEntityWithSharedEntityType1');
/**
 * Request builder class for operations supported on the [[TestEntityWithSharedEntityType1]] entity.
 */
var TestEntityWithSharedEntityType1RequestBuilder = /** @class */ (function (
  _super
) {
  __extends(TestEntityWithSharedEntityType1RequestBuilder, _super);
  function TestEntityWithSharedEntityType1RequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntityWithSharedEntityType1` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityWithSharedEntityType1.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityWithSharedEntityType1` entity based on its keys.
   */
  TestEntityWithSharedEntityType1RequestBuilder.prototype.getByKey = function (
    keyProperty
  ) {
    return new core_1.GetByKeyRequestBuilderV4(
      TestEntityWithSharedEntityType1_1.TestEntityWithSharedEntityType1,
      { KeyProperty: keyProperty }
    );
  };
  /**
   * Returns a request builder for querying all `TestEntityWithSharedEntityType1` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithSharedEntityType1` entities.
   */
  TestEntityWithSharedEntityType1RequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV4(
      TestEntityWithSharedEntityType1_1.TestEntityWithSharedEntityType1
    );
  };
  /**
   * Returns a request builder for creating a `TestEntityWithSharedEntityType1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithSharedEntityType1`.
   */
  TestEntityWithSharedEntityType1RequestBuilder.prototype.create = function (
    entity
  ) {
    return new core_1.CreateRequestBuilderV4(
      TestEntityWithSharedEntityType1_1.TestEntityWithSharedEntityType1,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntityWithSharedEntityType1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityWithSharedEntityType1`.
   */
  TestEntityWithSharedEntityType1RequestBuilder.prototype.update = function (
    entity
  ) {
    return new core_1.UpdateRequestBuilderV4(
      TestEntityWithSharedEntityType1_1.TestEntityWithSharedEntityType1,
      entity
    );
  };
  TestEntityWithSharedEntityType1RequestBuilder.prototype.delete = function (
    keyPropertyOrEntity
  ) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntityWithSharedEntityType1_1.TestEntityWithSharedEntityType1,
      keyPropertyOrEntity instanceof
      TestEntityWithSharedEntityType1_1.TestEntityWithSharedEntityType1
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  };
  return TestEntityWithSharedEntityType1RequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntityWithSharedEntityType1RequestBuilder =
  TestEntityWithSharedEntityType1RequestBuilder;
//# sourceMappingURL=TestEntityWithSharedEntityType1RequestBuilder.js.map
