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
exports.AirportsRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var odata_common_1 = require('@sap-cloud-sdk/odata-common');
var odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
var Airports_1 = require('./Airports');
/**
 * Request builder class for operations supported on the [[Airports]] entity.
 */
var AirportsRequestBuilder = /** @class */ (function (_super) {
  __extends(AirportsRequestBuilder, _super);
  function AirportsRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `Airports` entity based on its keys.
   * @param icaoCode Key property. See [[Airports.icaoCode]].
   * @returns A request builder for creating requests to retrieve one `Airports` entity based on its keys.
   */
  AirportsRequestBuilder.prototype.getByKey = function (icaoCode) {
    return new odata_v4_1.GetByKeyRequestBuilder(Airports_1.Airports, {
      IcaoCode: icaoCode
    });
  };
  /**
   * Returns a request builder for querying all `Airports` entities.
   * @returns A request builder for creating requests to retrieve all `Airports` entities.
   */
  AirportsRequestBuilder.prototype.getAll = function () {
    return new odata_v4_1.GetAllRequestBuilder(Airports_1.Airports);
  };
  /**
   * Returns a request builder for creating a `Airports` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Airports`.
   */
  AirportsRequestBuilder.prototype.create = function (entity) {
    return new odata_v4_1.CreateRequestBuilder(Airports_1.Airports, entity);
  };
  /**
   * Returns a request builder for updating an entity of type `Airports`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Airports`.
   */
  AirportsRequestBuilder.prototype.update = function (entity) {
    return new odata_v4_1.UpdateRequestBuilder(Airports_1.Airports, entity);
  };
  AirportsRequestBuilder.prototype.delete = function (icaoCodeOrEntity) {
    return new odata_v4_1.DeleteRequestBuilder(
      Airports_1.Airports,
      icaoCodeOrEntity instanceof Airports_1.Airports
        ? icaoCodeOrEntity
        : { IcaoCode: icaoCodeOrEntity }
    );
  };
  return AirportsRequestBuilder;
})(odata_common_1.RequestBuilder);
exports.AirportsRequestBuilder = AirportsRequestBuilder;
//# sourceMappingURL=AirportsRequestBuilder.js.map
