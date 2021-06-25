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
exports.PeopleRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var People_1 = require('./People');
/**
 * Request builder class for operations supported on the [[People]] entity.
 */
var PeopleRequestBuilder = /** @class */ (function (_super) {
  __extends(PeopleRequestBuilder, _super);
  function PeopleRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `People` entity based on its keys.
   * @param userName Key property. See [[People.userName]].
   * @returns A request builder for creating requests to retrieve one `People` entity based on its keys.
   */
  PeopleRequestBuilder.prototype.getByKey = function (userName) {
    return new core_1.GetByKeyRequestBuilderV4(People_1.People, {
      UserName: userName
    });
  };
  /**
   * Returns a request builder for querying all `People` entities.
   * @returns A request builder for creating requests to retrieve all `People` entities.
   */
  PeopleRequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV4(People_1.People);
  };
  /**
   * Returns a request builder for creating a `People` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `People`.
   */
  PeopleRequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV4(People_1.People, entity);
  };
  /**
   * Returns a request builder for updating an entity of type `People`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `People`.
   */
  PeopleRequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV4(People_1.People, entity);
  };
  PeopleRequestBuilder.prototype.delete = function (userNameOrEntity) {
    return new core_1.DeleteRequestBuilderV4(
      People_1.People,
      userNameOrEntity instanceof People_1.People
        ? userNameOrEntity
        : { UserName: userNameOrEntity }
    );
  };
  return PeopleRequestBuilder;
})(core_1.RequestBuilder);
exports.PeopleRequestBuilder = PeopleRequestBuilder;
//# sourceMappingURL=PeopleRequestBuilder.js.map
