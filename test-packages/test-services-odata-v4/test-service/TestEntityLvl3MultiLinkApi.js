'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityLvl3MultiLinkApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityLvl3MultiLink_1 = require('./TestEntityLvl3MultiLink');
const TestEntityLvl3MultiLinkRequestBuilder_1 = require('./TestEntityLvl3MultiLinkRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
class TestEntityLvl3MultiLinkApi {
  constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
    this.entityConstructor = TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {};
    return this;
  }
  requestBuilder() {
    return new TestEntityLvl3MultiLinkRequestBuilder_1.TestEntityLvl3MultiLinkRequestBuilder(
      this
    );
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
        TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink,
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
         * Static representation of the [[stringProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY: fieldBuilder.buildEdmTypeField(
          'StringProperty',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the [[guidProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY: fieldBuilder.buildEdmTypeField(
          'GuidProperty',
          'Edm.Guid',
          true
        ),
        /**
         * Static representation of the [[keyProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY: fieldBuilder.buildEdmTypeField(
          'KeyProperty',
          'Edm.String',
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v4_1.AllFields(
          '*',
          TestEntityLvl3MultiLink_1.TestEntityLvl3MultiLink
        )
      };
    }
    return this._schema;
  }
}
exports.TestEntityLvl3MultiLinkApi = TestEntityLvl3MultiLinkApi;
//# sourceMappingURL=TestEntityLvl3MultiLinkApi.js.map
