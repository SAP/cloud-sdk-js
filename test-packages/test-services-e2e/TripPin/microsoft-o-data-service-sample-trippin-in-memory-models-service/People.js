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
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.People = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var PeopleRequestBuilder_1 = require('./PeopleRequestBuilder');
var Location_1 = require('./Location');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "People" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
var People = /** @class */ (function (_super) {
  __extends(People, _super);
  function People() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `People`.
   * @returns A builder that constructs instances of entity type `People`.
   */
  People.builder = function () {
    return core_1.EntityV4.entityBuilder(People);
  };
  /**
   * Returns a request builder to construct requests for operations on the `People` entity type.
   * @returns A `People` request builder.
   */
  People.requestBuilder = function () {
    return new PeopleRequestBuilder_1.PeopleRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `People`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `People`.
   */
  People.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(fieldName, People);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  People.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for People.
   */
  People._entityName = 'People';
  /**
   * Default url path for the according service.
   */
  People._defaultServicePath =
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  return People;
})(core_1.EntityV4);
exports.People = People;
var Photos_1 = require('./Photos');
(function (People) {
  /**
   * Static representation of the [[userName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.USER_NAME = new core_1.StringField('UserName', People, 'Edm.String');
  /**
   * Static representation of the [[firstName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.FIRST_NAME = new core_1.StringField('FirstName', People, 'Edm.String');
  /**
   * Static representation of the [[lastName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.LAST_NAME = new core_1.StringField('LastName', People, 'Edm.String');
  /**
   * Static representation of the [[emails]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.EMAILS = new core_1.CollectionField('Emails', People, 'Edm.String');
  /**
   * Static representation of the [[addressInfo]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.ADDRESS_INFO = new core_1.CollectionField(
    'AddressInfo',
    People,
    Location_1.Location
  );
  /**
   * Static representation of the [[gender]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.GENDER = new core_1.EnumField('Gender', People);
  /**
   * Static representation of the [[concurrency]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.CONCURRENCY = new core_1.BigNumberField(
    'Concurrency',
    People,
    'Edm.Int64'
  );
  /**
   * Static representation of the one-to-many navigation property [[friends]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.FRIENDS = new core_1.OneToManyLink('Friends', People, People);
  /**
   * Static representation of the one-to-one navigation property [[photo]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.PHOTO = new core_1.OneToOneLink('Photo', People, Photos_1.Photos);
  /**
   * All fields of the People entity.
   */
  People._allFields = [
    People.USER_NAME,
    People.FIRST_NAME,
    People.LAST_NAME,
    People.EMAILS,
    People.ADDRESS_INFO,
    People.GENDER,
    People.CONCURRENCY,
    People.FRIENDS,
    People.PHOTO
  ];
  /**
   * All fields selector.
   */
  People.ALL_FIELDS = new core_1.AllFields('*', People);
  /**
   * All key fields of the People entity.
   */
  People._keyFields = [People.USER_NAME];
  /**
   * Mapping of all key field names to the respective static field property People.
   */
  People._keys = People._keyFields.reduce(function (acc, field) {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((People = exports.People || (exports.People = {})));
exports.People = People;
//# sourceMappingURL=People.js.map
