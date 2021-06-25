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
exports.TestEntityLvl2SingleLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntityLvl2SingleLink_1 = require('./TestEntityLvl2SingleLink');
/**
 * Request builder class for operations supported on the [[TestEntityLvl2SingleLink]] entity.
 */
var TestEntityLvl2SingleLinkRequestBuilder = /** @class */ (function (_super) {
  __extends(TestEntityLvl2SingleLinkRequestBuilder, _super);
  function TestEntityLvl2SingleLinkRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntityLvl2SingleLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityLvl2SingleLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLvl2SingleLink` entity based on its keys.
   */
  TestEntityLvl2SingleLinkRequestBuilder.prototype.getByKey = function (
    keyProperty
  ) {
    return new core_1.GetByKeyRequestBuilderV4(
      TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink,
      { KeyProperty: keyProperty }
    );
  };
  /**
   * Returns a request builder for querying all `TestEntityLvl2SingleLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLvl2SingleLink` entities.
   */
  TestEntityLvl2SingleLinkRequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV4(
      TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink
    );
  };
  /**
   * Returns a request builder for creating a `TestEntityLvl2SingleLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLvl2SingleLink`.
   */
  TestEntityLvl2SingleLinkRequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV4(
      TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntityLvl2SingleLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLvl2SingleLink`.
   */
  TestEntityLvl2SingleLinkRequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV4(
      TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink,
      entity
    );
  };
  TestEntityLvl2SingleLinkRequestBuilder.prototype.delete = function (
    keyPropertyOrEntity
  ) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink,
      keyPropertyOrEntity instanceof
      TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  };
  return TestEntityLvl2SingleLinkRequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntityLvl2SingleLinkRequestBuilder =
  TestEntityLvl2SingleLinkRequestBuilder;
//# sourceMappingURL=TestEntityLvl2SingleLinkRequestBuilder.js.map
