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
exports.TestEntityWithSharedEntityType2RequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntityWithSharedEntityType2_1 = require('./TestEntityWithSharedEntityType2');
/**
 * Request builder class for operations supported on the [[TestEntityWithSharedEntityType2]] entity.
 */
var TestEntityWithSharedEntityType2RequestBuilder = /** @class */ (function (
  _super
) {
  __extends(TestEntityWithSharedEntityType2RequestBuilder, _super);
  function TestEntityWithSharedEntityType2RequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntityWithSharedEntityType2` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityWithSharedEntityType2.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityWithSharedEntityType2` entity based on its keys.
   */
  TestEntityWithSharedEntityType2RequestBuilder.prototype.getByKey = function (
    keyProperty
  ) {
    return new core_1.GetByKeyRequestBuilderV4(
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2,
      { KeyProperty: keyProperty }
    );
  };
  /**
   * Returns a request builder for querying all `TestEntityWithSharedEntityType2` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithSharedEntityType2` entities.
   */
  TestEntityWithSharedEntityType2RequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV4(
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2
    );
  };
  /**
   * Returns a request builder for creating a `TestEntityWithSharedEntityType2` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithSharedEntityType2`.
   */
  TestEntityWithSharedEntityType2RequestBuilder.prototype.create = function (
    entity
  ) {
    return new core_1.CreateRequestBuilderV4(
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntityWithSharedEntityType2`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityWithSharedEntityType2`.
   */
  TestEntityWithSharedEntityType2RequestBuilder.prototype.update = function (
    entity
  ) {
    return new core_1.UpdateRequestBuilderV4(
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2,
      entity
    );
  };
  TestEntityWithSharedEntityType2RequestBuilder.prototype.delete = function (
    keyPropertyOrEntity
  ) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2,
      keyPropertyOrEntity instanceof
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  };
  return TestEntityWithSharedEntityType2RequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntityWithSharedEntityType2RequestBuilder =
  TestEntityWithSharedEntityType2RequestBuilder;
//# sourceMappingURL=TestEntityWithSharedEntityType2RequestBuilder.js.map
