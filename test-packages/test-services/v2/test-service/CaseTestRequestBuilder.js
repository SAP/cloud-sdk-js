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
exports.CaseTestRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var CaseTest_1 = require('./CaseTest');
/**
 * Request builder class for operations supported on the [[CaseTest]] entity.
 */
var CaseTestRequestBuilder = /** @class */ (function (_super) {
  __extends(CaseTestRequestBuilder, _super);
  function CaseTestRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `CaseTest` entity based on its keys.
   * @param keyPropertyString Key property. See [[CaseTest.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `CaseTest` entity based on its keys.
   */
  CaseTestRequestBuilder.prototype.getByKey = function (keyPropertyString) {
    return new core_1.GetByKeyRequestBuilderV2(CaseTest_1.CaseTest, {
      KeyPropertyString: keyPropertyString
    });
  };
  /**
   * Returns a request builder for querying all `CaseTest` entities.
   * @returns A request builder for creating requests to retrieve all `CaseTest` entities.
   */
  CaseTestRequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV2(CaseTest_1.CaseTest);
  };
  /**
   * Returns a request builder for creating a `CaseTest` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CaseTest`.
   */
  CaseTestRequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV2(CaseTest_1.CaseTest, entity);
  };
  /**
   * Returns a request builder for updating an entity of type `CaseTest`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CaseTest`.
   */
  CaseTestRequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV2(CaseTest_1.CaseTest, entity);
  };
  CaseTestRequestBuilder.prototype.delete = function (
    keyPropertyStringOrEntity
  ) {
    return new core_1.DeleteRequestBuilderV2(
      CaseTest_1.CaseTest,
      keyPropertyStringOrEntity instanceof CaseTest_1.CaseTest
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity }
    );
  };
  return CaseTestRequestBuilder;
})(core_1.RequestBuilder);
exports.CaseTestRequestBuilder = CaseTestRequestBuilder;
//# sourceMappingURL=CaseTestRequestBuilder.js.map
