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
exports.Testentity_1RequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var Testentity_1_1 = require('./Testentity_1');
/**
 * Request builder class for operations supported on the [[Testentity_1]] entity.
 */
var Testentity_1RequestBuilder = /** @class */ (function (_super) {
  __extends(Testentity_1RequestBuilder, _super);
  function Testentity_1RequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `Testentity_1` entity based on its keys.
   * @param keyPropertyGuid Key property. See [[Testentity_1.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[Testentity_1.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `Testentity_1` entity based on its keys.
   */
  Testentity_1RequestBuilder.prototype.getByKey = function (
    keyPropertyGuid,
    keyPropertyString
  ) {
    return new core_1.GetByKeyRequestBuilderV2(Testentity_1_1.Testentity_1, {
      KeyPropertyGuid: keyPropertyGuid,
      KeyPropertyString: keyPropertyString
    });
  };
  /**
   * Returns a request builder for querying all `Testentity_1` entities.
   * @returns A request builder for creating requests to retrieve all `Testentity_1` entities.
   */
  Testentity_1RequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV2(Testentity_1_1.Testentity_1);
  };
  /**
   * Returns a request builder for creating a `Testentity_1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Testentity_1`.
   */
  Testentity_1RequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV2(
      Testentity_1_1.Testentity_1,
      entity
    );
  };
  /**
   * Returns a request builder for updating an entity of type `Testentity_1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Testentity_1`.
   */
  Testentity_1RequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV2(
      Testentity_1_1.Testentity_1,
      entity
    );
  };
  Testentity_1RequestBuilder.prototype.delete = function (
    keyPropertyGuidOrEntity,
    keyPropertyString
  ) {
    return new core_1.DeleteRequestBuilderV2(
      Testentity_1_1.Testentity_1,
      keyPropertyGuidOrEntity instanceof Testentity_1_1.Testentity_1
        ? keyPropertyGuidOrEntity
        : {
            KeyPropertyGuid: keyPropertyGuidOrEntity,
            KeyPropertyString: keyPropertyString
          }
    );
  };
  return Testentity_1RequestBuilder;
})(core_1.RequestBuilder);
exports.Testentity_1RequestBuilder = Testentity_1RequestBuilder;
//# sourceMappingURL=Testentity_1RequestBuilder.js.map
