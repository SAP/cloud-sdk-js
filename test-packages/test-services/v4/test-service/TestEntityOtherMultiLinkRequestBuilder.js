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
exports.TestEntityOtherMultiLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntityOtherMultiLink_1 = require('./TestEntityOtherMultiLink');
/**
 * Request builder class for operations supported on the [[TestEntityOtherMultiLink]] entity.
 */
var TestEntityOtherMultiLinkRequestBuilder = /** @class */ (function (_super) {
  __extends(TestEntityOtherMultiLinkRequestBuilder, _super);
  function TestEntityOtherMultiLinkRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntityOtherMultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityOtherMultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityOtherMultiLink` entity based on its keys.
   */
  TestEntityOtherMultiLinkRequestBuilder.prototype.getByKey = function (
    keyProperty
  ) {
    return new core_1.GetByKeyRequestBuilderV4(
      TestEntityOtherMultiLink_1.TestEntityOtherMultiLink,
      { KeyProperty: keyProperty }
    );
  };
  /**
   * Returns a request builder for querying all `TestEntityOtherMultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityOtherMultiLink` entities.
   */
  TestEntityOtherMultiLinkRequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV4(
      TestEntityOtherMultiLink_1.TestEntityOtherMultiLink
    );
  };
  /**
   * Returns a request builder for creating a `TestEntityOtherMultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityOtherMultiLink`.
   */
  TestEntityOtherMultiLinkRequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV4(
      TestEntityOtherMultiLink_1.TestEntityOtherMultiLink,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntityOtherMultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityOtherMultiLink`.
   */
  TestEntityOtherMultiLinkRequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV4(
      TestEntityOtherMultiLink_1.TestEntityOtherMultiLink,
      entity
    );
  };
  TestEntityOtherMultiLinkRequestBuilder.prototype.delete = function (
    keyPropertyOrEntity
  ) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntityOtherMultiLink_1.TestEntityOtherMultiLink,
      keyPropertyOrEntity instanceof
      TestEntityOtherMultiLink_1.TestEntityOtherMultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  };
  return TestEntityOtherMultiLinkRequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntityOtherMultiLinkRequestBuilder =
  TestEntityOtherMultiLinkRequestBuilder;
//# sourceMappingURL=TestEntityOtherMultiLinkRequestBuilder.js.map
