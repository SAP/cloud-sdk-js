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
exports.TestEntityLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestEntityLink_1 = require('./TestEntityLink');
/**
 * Request builder class for operations supported on the [[TestEntityLink]] entity.
 */
var TestEntityLinkRequestBuilder = /** @class */ (function (_super) {
  __extends(TestEntityLinkRequestBuilder, _super);
  function TestEntityLinkRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntityLink` entity based on its keys.
   * @param keyTestEntityLink Key property. See [[TestEntityLink.keyTestEntityLink]].
   * @param keyToTestEntity Key property. See [[TestEntityLink.keyToTestEntity]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLink` entity based on its keys.
   */
  TestEntityLinkRequestBuilder.prototype.getByKey = function (
    keyTestEntityLink,
    keyToTestEntity
  ) {
    return new core_1.GetByKeyRequestBuilderV4(
      TestEntityLink_1.TestEntityLink,
      {
        KeyTestEntityLink: keyTestEntityLink,
        KeyToTestEntity: keyToTestEntity
      }
    );
  };
  /**
   * Returns a request builder for querying all `TestEntityLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLink` entities.
   */
  TestEntityLinkRequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV4(TestEntityLink_1.TestEntityLink);
  };
  /**
   * Returns a request builder for creating a `TestEntityLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLink`.
   */
  TestEntityLinkRequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV4(
      TestEntityLink_1.TestEntityLink,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntityLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLink`.
   */
  TestEntityLinkRequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV4(
      TestEntityLink_1.TestEntityLink,
      entity
    );
  };
  TestEntityLinkRequestBuilder.prototype.delete = function (
    keyTestEntityLinkOrEntity,
    keyToTestEntity
  ) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntityLink_1.TestEntityLink,
      keyTestEntityLinkOrEntity instanceof TestEntityLink_1.TestEntityLink
        ? keyTestEntityLinkOrEntity
        : {
            KeyTestEntityLink: keyTestEntityLinkOrEntity,
            KeyToTestEntity: keyToTestEntity
          }
    );
  };
  return TestEntityLinkRequestBuilder;
})(core_1.RequestBuilder);
exports.TestEntityLinkRequestBuilder = TestEntityLinkRequestBuilder;
//# sourceMappingURL=TestEntityLinkRequestBuilder.js.map
