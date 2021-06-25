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
exports.AirlinesRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var Airlines_1 = require('./Airlines');
/**
 * Request builder class for operations supported on the [[Airlines]] entity.
 */
var AirlinesRequestBuilder = /** @class */ (function (_super) {
  __extends(AirlinesRequestBuilder, _super);
  function AirlinesRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `Airlines` entity based on its keys.
   * @param airlineCode Key property. See [[Airlines.airlineCode]].
   * @returns A request builder for creating requests to retrieve one `Airlines` entity based on its keys.
   */
  AirlinesRequestBuilder.prototype.getByKey = function (airlineCode) {
    return new core_1.GetByKeyRequestBuilderV4(Airlines_1.Airlines, {
      AirlineCode: airlineCode
    });
  };
  /**
   * Returns a request builder for querying all `Airlines` entities.
   * @returns A request builder for creating requests to retrieve all `Airlines` entities.
   */
  AirlinesRequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV4(Airlines_1.Airlines);
  };
  /**
   * Returns a request builder for creating a `Airlines` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Airlines`.
   */
  AirlinesRequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV4(Airlines_1.Airlines, entity);
  };
  /**
   * Returns a request builder for updating an entity of type `Airlines`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Airlines`.
   */
  AirlinesRequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV4(Airlines_1.Airlines, entity);
  };
  AirlinesRequestBuilder.prototype.delete = function (airlineCodeOrEntity) {
    return new core_1.DeleteRequestBuilderV4(
      Airlines_1.Airlines,
      airlineCodeOrEntity instanceof Airlines_1.Airlines
        ? airlineCodeOrEntity
        : { AirlineCode: airlineCodeOrEntity }
    );
  };
  return AirlinesRequestBuilder;
})(core_1.RequestBuilder);
exports.AirlinesRequestBuilder = AirlinesRequestBuilder;
//# sourceMappingURL=AirlinesRequestBuilder.js.map
