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
exports.TestEntityRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntity_1 = require('./TestEntity');
/**
 * Request builder class for operations supported on the [[TestEntity]] entity.
 */
var TestEntityRequestBuilder = /** @class */ (function (_super) {
  __extends(TestEntityRequestBuilder, _super);
  function TestEntityRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntity` entity based on its keys.
   * @param keyPropertyGuid Key property. See [[TestEntity.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[TestEntity.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity` entity based on its keys.
   */
  TestEntityRequestBuilder.prototype.getByKey = function (
    keyPropertyGuid,
    keyPropertyString
  ) {
    return new core_1.GetByKeyRequestBuilderV2(TestEntity_1.TestEntity, {
      KeyPropertyGuid: keyPropertyGuid,
      KeyPropertyString: keyPropertyString
    });
  };
  /**
   * Returns a request builder for querying all `TestEntity` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity` entities.
   */
  TestEntityRequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV2(TestEntity_1.TestEntity);
  };
  /**
   * Returns a request builder for creating a `TestEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity`.
   */
  TestEntityRequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV2(TestEntity_1.TestEntity, entity);
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity`.
   */
  TestEntityRequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV2(TestEntity_1.TestEntity, entity);
  };
  TestEntityRequestBuilder.prototype.delete = function (
    keyPropertyGuidOrEntity,
    keyPropertyString
  ) {
    return new core_1.DeleteRequestBuilderV2(
      TestEntity_1.TestEntity,
      keyPropertyGuidOrEntity instanceof TestEntity_1.TestEntity
        ? keyPropertyGuidOrEntity
        : {
            KeyPropertyGuid: keyPropertyGuidOrEntity,
            KeyPropertyString: keyPropertyString
          }
    );
  };
  return TestEntityRequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntityRequestBuilder = TestEntityRequestBuilder;
//# sourceMappingURL=TestEntityRequestBuilder.js.map
