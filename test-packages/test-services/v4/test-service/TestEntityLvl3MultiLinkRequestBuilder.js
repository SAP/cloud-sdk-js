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
exports.TestEntityLvl3MultiLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var odata_common_1 = require('@sap-cloud-sdk/odata-common');
var odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
var TestEntityLvl3MultiLink_1 = require('./TestEntityLvl3MultiLink');
/**
 * Request builder class for operations supported on the [[TestEntityLvl3MultiLink]] entity.
 */
var TestEntityLvl3MultiLinkRequestBuilder = /** @class */ (function (_super) {
  __extends(TestEntityLvl3MultiLinkRequestBuilder, _super);
  function TestEntityLvl3MultiLinkRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `TestEntityLvl3MultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityLvl3MultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLvl3MultiLink` entity based on its keys.
   */
  TestEntityLvl3MultiLinkRequestBuilder.prototype.getByKey = function (
    keyProperty
  ) {
    return new odata_v4_1.GetByKeyRequestBuilder(
      TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink,
      { KeyProperty: keyProperty }
    );
  };
  /**
   * Returns a request builder for querying all `TestEntityLvl3MultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLvl3MultiLink` entities.
   */
  TestEntityLvl3MultiLinkRequestBuilder.prototype.getAll = function () {
    return new odata_v4_1.GetAllRequestBuilder(
      TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink
    );
  };
  /**
   * Returns a request builder for creating a `TestEntityLvl3MultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLvl3MultiLink`.
   */
  TestEntityLvl3MultiLinkRequestBuilder.prototype.create = function (entity) {
    return new odata_v4_1.CreateRequestBuilder(
      TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `TestEntityLvl3MultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLvl3MultiLink`.
   */
  TestEntityLvl3MultiLinkRequestBuilder.prototype.update = function (entity) {
    return new odata_v4_1.UpdateRequestBuilder(
      TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink,
      entity
    );
  };
  TestEntityLvl3MultiLinkRequestBuilder.prototype.delete = function (
    keyPropertyOrEntity
  ) {
    return new odata_v4_1.DeleteRequestBuilder(
      TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink,
      keyPropertyOrEntity instanceof
      TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  };
  return TestEntityLvl3MultiLinkRequestBuilder;
})(odata_common_1.RequestBuilder);
exports.TestEntityLvl3MultiLinkRequestBuilder =
  TestEntityLvl3MultiLinkRequestBuilder;
//# sourceMappingURL=TestEntityLvl3MultiLinkRequestBuilder.js.map
