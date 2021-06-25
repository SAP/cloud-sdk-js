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
exports.TestEntityMultiLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntityMultiLink_1 = require('./TestEntityMultiLink');
/**
 * Request builder class for operations supported on the [[TestEntityMultiLink]] entity.
 */
var TestEntityMultiLinkRequestBuilder = /** @class */ (function (_super) {
  __extends(TestEntityMultiLinkRequestBuilder, _super);
  function TestEntityMultiLinkRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntityMultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityMultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityMultiLink` entity based on its keys.
   */
  TestEntityMultiLinkRequestBuilder.prototype.getByKey = function (
    keyProperty
  ) {
    return new core_1.GetByKeyRequestBuilderV2(
      TestEntityMultiLink_1.TestEntityMultiLink,
      { KeyProperty: keyProperty }
    );
  };
  /**
   * Returns a request builder for querying all `TestEntityMultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityMultiLink` entities.
   */
  TestEntityMultiLinkRequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV2(
      TestEntityMultiLink_1.TestEntityMultiLink
    );
  };
  /**
   * Returns a request builder for creating a `TestEntityMultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityMultiLink`.
   */
  TestEntityMultiLinkRequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV2(
      TestEntityMultiLink_1.TestEntityMultiLink,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntityMultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityMultiLink`.
   */
  TestEntityMultiLinkRequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV2(
      TestEntityMultiLink_1.TestEntityMultiLink,
      entity
    );
  };
  TestEntityMultiLinkRequestBuilder.prototype.delete = function (
    keyPropertyOrEntity
  ) {
    return new core_1.DeleteRequestBuilderV2(
      TestEntityMultiLink_1.TestEntityMultiLink,
      keyPropertyOrEntity instanceof TestEntityMultiLink_1.TestEntityMultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  };
  return TestEntityMultiLinkRequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntityMultiLinkRequestBuilder = TestEntityMultiLinkRequestBuilder;
//# sourceMappingURL=TestEntityMultiLinkRequestBuilder.js.map
