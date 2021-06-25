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
exports.Casetest_1RequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var Casetest_1_1 = require('./Casetest_1');
/**
 * Request builder class for operations supported on the [[Casetest_1]] entity.
 */
var Casetest_1RequestBuilder = /** @class */ (function (_super) {
  __extends(Casetest_1RequestBuilder, _super);
  function Casetest_1RequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `Casetest_1` entity based on its keys.
   * @param keyPropertyString Key property. See [[Casetest_1.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `Casetest_1` entity based on its keys.
   */
  Casetest_1RequestBuilder.prototype.getByKey = function (keyPropertyString) {
    return new core_1.GetByKeyRequestBuilderV2(Casetest_1_1.Casetest_1, {
      KeyPropertyString: keyPropertyString
    });
  };
  /**
   * Returns a request builder for querying all `Casetest_1` entities.
   * @returns A request builder for creating requests to retrieve all `Casetest_1` entities.
   */
  Casetest_1RequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV2(Casetest_1_1.Casetest_1);
  };
  /**
   * Returns a request builder for creating a `Casetest_1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Casetest_1`.
   */
  Casetest_1RequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV2(Casetest_1_1.Casetest_1, entity);
  };
  /**
   * Returns a request builder for updating an entity of type `Casetest_1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Casetest_1`.
   */
  Casetest_1RequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV2(Casetest_1_1.Casetest_1, entity);
  };
  Casetest_1RequestBuilder.prototype.delete = function (
    keyPropertyStringOrEntity
  ) {
    return new core_1.DeleteRequestBuilderV2(
      Casetest_1_1.Casetest_1,
      keyPropertyStringOrEntity instanceof Casetest_1_1.Casetest_1
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity }
    );
  };
  return Casetest_1RequestBuilder;
})(core_1.RequestBuilder);
exports.Casetest_1RequestBuilder = Casetest_1RequestBuilder;
//# sourceMappingURL=Casetest_1RequestBuilder.js.map
