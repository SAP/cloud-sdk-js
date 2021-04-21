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
exports.TestEntitySharesEntityType1RequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntitySharesEntityType1_1 = require('./TestEntitySharesEntityType1');
/**
 * Request builder class for operations supported on the [[TestEntitySharesEntityType1]] entity.
 */
var TestEntitySharesEntityType1RequestBuilder = /** @class */ (function (
  _super
) {
  __extends(TestEntitySharesEntityType1RequestBuilder, _super);
  function TestEntitySharesEntityType1RequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntitySharesEntityType1` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntitySharesEntityType1.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntitySharesEntityType1` entity based on its keys.
   */
  TestEntitySharesEntityType1RequestBuilder.prototype.getByKey = function (
    keyProperty
  ) {
    return new core_1.GetByKeyRequestBuilderV4(
      TestEntitySharesEntityType1_1.TestEntitySharesEntityType1,
      { KeyProperty: keyProperty }
    );
  };
  /**
   * Returns a request builder for querying all `TestEntitySharesEntityType1` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntitySharesEntityType1` entities.
   */
  TestEntitySharesEntityType1RequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV4(
      TestEntitySharesEntityType1_1.TestEntitySharesEntityType1
    );
  };
  /**
   * Returns a request builder for creating a `TestEntitySharesEntityType1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntitySharesEntityType1`.
   */
  TestEntitySharesEntityType1RequestBuilder.prototype.create = function (
    entity
  ) {
    return new core_1.CreateRequestBuilderV4(
      TestEntitySharesEntityType1_1.TestEntitySharesEntityType1,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntitySharesEntityType1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntitySharesEntityType1`.
   */
  TestEntitySharesEntityType1RequestBuilder.prototype.update = function (
    entity
  ) {
    return new core_1.UpdateRequestBuilderV4(
      TestEntitySharesEntityType1_1.TestEntitySharesEntityType1,
      entity
    );
  };
  TestEntitySharesEntityType1RequestBuilder.prototype.delete = function (
    keyPropertyOrEntity
  ) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntitySharesEntityType1_1.TestEntitySharesEntityType1,
      keyPropertyOrEntity instanceof
      TestEntitySharesEntityType1_1.TestEntitySharesEntityType1
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  };
  return TestEntitySharesEntityType1RequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntitySharesEntityType1RequestBuilder = TestEntitySharesEntityType1RequestBuilder;
//# sourceMappingURL=TestEntitySharesEntityType1RequestBuilder.js.map
