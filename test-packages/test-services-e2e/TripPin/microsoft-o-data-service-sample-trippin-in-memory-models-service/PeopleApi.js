'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PeopleApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const People_1 = require('./People');
const PeopleRequestBuilder_1 = require('./PeopleRequestBuilder');
const Location_1 = require('./Location');
const PersonGender_1 = require('./PersonGender');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
class PeopleApi {
  constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
    this.entityConstructor = People_1.People;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {
      FRIENDS: new odata_v4_1.OneToManyLink('Friends', this, linkedApis[0]),
      PHOTO: new odata_v4_1.OneToOneLink('Photo', this, linkedApis[1])
    };
    return this;
  }
  requestBuilder() {
    return new PeopleRequestBuilder_1.PeopleRequestBuilder(this);
  }
  entityBuilder() {
    return (0, odata_v4_1.entityBuilder)(this);
  }
  customField(fieldName, isNullable = false) {
    return new odata_v4_1.CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    );
  }
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new odata_v4_1.FieldBuilder(
        People_1.People,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }
  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the [[userName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        USER_NAME: fieldBuilder.buildEdmTypeField(
          'UserName',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the [[firstName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FIRST_NAME: fieldBuilder.buildEdmTypeField(
          'FirstName',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the [[lastName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAST_NAME: fieldBuilder.buildEdmTypeField(
          'LastName',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the [[emails]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EMAILS: fieldBuilder.buildCollectionField('Emails', 'Edm.String', true),
        /**
         * Static representation of the [[addressInfo]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDRESS_INFO: fieldBuilder.buildCollectionField(
          'AddressInfo',
          Location_1.Location,
          true
        ),
        /**
         * Static representation of the [[gender]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GENDER: fieldBuilder.buildEnumField(
          'Gender',
          PersonGender_1.PersonGender,
          true
        ),
        /**
         * Static representation of the [[concurrency]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONCURRENCY: fieldBuilder.buildEdmTypeField(
          'Concurrency',
          'Edm.Int64',
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v4_1.AllFields('*', People_1.People)
      };
    }
    return this._schema;
  }
}
exports.PeopleApi = PeopleApi;
//# sourceMappingURL=PeopleApi.js.map
