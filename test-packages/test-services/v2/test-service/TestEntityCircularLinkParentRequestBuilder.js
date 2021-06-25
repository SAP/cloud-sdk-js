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
exports.TestEntityCircularLinkParentRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntityCircularLinkParent_1 = require('./TestEntityCircularLinkParent');
/**
 * Request builder class for operations supported on the [[TestEntityCircularLinkParent]] entity.
 */
var TestEntityCircularLinkParentRequestBuilder = /** @class */ (function (
  _super
) {
  __extends(TestEntityCircularLinkParentRequestBuilder, _super);
  function TestEntityCircularLinkParentRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntityCircularLinkParent` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityCircularLinkParent.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityCircularLinkParent` entity based on its keys.
   */
  TestEntityCircularLinkParentRequestBuilder.prototype.getByKey = function (
    keyProperty
  ) {
    return new core_1.GetByKeyRequestBuilderV2(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent,
      { KeyProperty: keyProperty }
    );
  };
  /**
   * Returns a request builder for querying all `TestEntityCircularLinkParent` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityCircularLinkParent` entities.
   */
  TestEntityCircularLinkParentRequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV2(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent
    );
  };
  /**
   * Returns a request builder for creating a `TestEntityCircularLinkParent` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityCircularLinkParent`.
   */
  TestEntityCircularLinkParentRequestBuilder.prototype.create = function (
    entity
  ) {
    return new core_1.CreateRequestBuilderV2(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntityCircularLinkParent`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityCircularLinkParent`.
   */
  TestEntityCircularLinkParentRequestBuilder.prototype.update = function (
    entity
  ) {
    return new core_1.UpdateRequestBuilderV2(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent,
      entity
    );
  };
  TestEntityCircularLinkParentRequestBuilder.prototype.delete = function (
    keyPropertyOrEntity
  ) {
    return new core_1.DeleteRequestBuilderV2(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent,
      keyPropertyOrEntity instanceof
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  };
  return TestEntityCircularLinkParentRequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntityCircularLinkParentRequestBuilder =
  TestEntityCircularLinkParentRequestBuilder;
//# sourceMappingURL=TestEntityCircularLinkParentRequestBuilder.js.map
