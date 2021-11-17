'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.People = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PeopleRequestBuilder_1 = require('./PeopleRequestBuilder');
const Location_1 = require('./Location');
const PersonGender_1 = require('./PersonGender');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const odata_common_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "People" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
class People extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `People`.
   * @returns A builder that constructs instances of entity type `People`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(People);
  }
  /**
   * Returns a request builder to construct requests for operations on the `People` entity type.
   * @returns A `People` request builder.
   */
  static requestBuilder() {
    return new PeopleRequestBuilder_1.PeopleRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `People`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `People`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(fieldName, People);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.People = People;
/**
 * Technical entity name for People.
 */
People._entityName = 'People';
/**
 * Default url path for the according service.
 */
People._defaultServicePath =
  'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
const Photos_1 = require('./Photos');
(function (People) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(People);
  /**
   * Static representation of the [[userName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.USER_NAME = _fieldBuilder.buildEdmTypeField(
    'UserName',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[firstName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.FIRST_NAME = _fieldBuilder.buildEdmTypeField(
    'FirstName',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[lastName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.LAST_NAME = _fieldBuilder.buildEdmTypeField(
    'LastName',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[emails]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.EMAILS = _fieldBuilder.buildCollectionField(
    'Emails',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[addressInfo]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.ADDRESS_INFO = _fieldBuilder.buildCollectionField(
    'AddressInfo',
    Location_1.Location,
    true
  );
  /**
   * Static representation of the [[gender]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.GENDER = _fieldBuilder.buildEnumField(
    'Gender',
    PersonGender_1.PersonGender,
    true
  );
  /**
   * Static representation of the [[concurrency]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.CONCURRENCY = _fieldBuilder.buildEdmTypeField(
    'Concurrency',
    'Edm.Int64',
    false
  );
  /**
   * Static representation of the one-to-many navigation property [[friends]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.FRIENDS = new odata_common_1.OneToManyLink('Friends', People, People);
  /**
   * Static representation of the one-to-one navigation property [[photo]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  People.PHOTO = new odata_common_1.OneToOneLink(
    'Photo',
    People,
    Photos_1.Photos
  );
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
  People.ALL_FIELDS = new odata_common_1.AllFields('*', People);
  /**
   * All key fields of the People entity.
   */
  People._keyFields = [People.USER_NAME];
  /**
   * Mapping of all key field names to the respective static field property People.
   */
  People._keys = People._keyFields.reduce((acc, field) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((People = exports.People || (exports.People = {})));
//# sourceMappingURL=People.js.map
