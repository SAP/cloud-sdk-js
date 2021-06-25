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
exports.TestEntityEndsWithRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntityEndsWith_1 = require('./TestEntityEndsWith');
/**
 * Request builder class for operations supported on the [[TestEntityEndsWith]] entity.
 */
var TestEntityEndsWithRequestBuilder = /** @class */ (function (_super) {
  __extends(TestEntityEndsWithRequestBuilder, _super);
  function TestEntityEndsWithRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntityEndsWith` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityEndsWith.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityEndsWith` entity based on its keys.
   */
  TestEntityEndsWithRequestBuilder.prototype.getByKey = function (keyProperty) {
    return new core_1.GetByKeyRequestBuilderV2(
      TestEntityEndsWith_1.TestEntityEndsWith,
      { KeyProperty: keyProperty }
    );
  };
  /**
   * Returns a request builder for querying all `TestEntityEndsWith` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWith` entities.
   */
  TestEntityEndsWithRequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV2(
      TestEntityEndsWith_1.TestEntityEndsWith
    );
  };
  /**
   * Returns a request builder for creating a `TestEntityEndsWith` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWith`.
   */
  TestEntityEndsWithRequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV2(
      TestEntityEndsWith_1.TestEntityEndsWith,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWith`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWith`.
   */
  TestEntityEndsWithRequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV2(
      TestEntityEndsWith_1.TestEntityEndsWith,
      entity
    );
  };
  TestEntityEndsWithRequestBuilder.prototype.delete = function (
    keyPropertyOrEntity
  ) {
    return new core_1.DeleteRequestBuilderV2(
      TestEntityEndsWith_1.TestEntityEndsWith,
      keyPropertyOrEntity instanceof TestEntityEndsWith_1.TestEntityEndsWith
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  };
  return TestEntityEndsWithRequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntityEndsWithRequestBuilder = TestEntityEndsWithRequestBuilder;
//# sourceMappingURL=TestEntityEndsWithRequestBuilder.js.map
