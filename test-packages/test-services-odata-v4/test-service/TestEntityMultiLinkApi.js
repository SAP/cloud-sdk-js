'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityMultiLinkApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityMultiLink_1 = require('./TestEntityMultiLink');
const TestEntityMultiLinkRequestBuilder_1 = require('./TestEntityMultiLinkRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
class TestEntityMultiLinkApi {
  constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
    this.entityConstructor = TestEntityMultiLink_1.TestEntityMultiLink;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {
      TO_MULTI_LINK_1: new odata_v4_1.OneToManyLink(
        'to_MultiLink1',
        this,
        linkedApis[0]
      ),
      TO_SINGLE_LINK: new odata_v4_1.OneToOneLink(
        'to_SingleLink',
        this,
        linkedApis[1]
      )
    };
    return this;
  }
  requestBuilder() {
    return new TestEntityMultiLinkRequestBuilder_1.TestEntityMultiLinkRequestBuilder(
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
        TestEntityMultiLink_1.TestEntityMultiLink,
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
         * Static representation of the [[booleanProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField(
          'BooleanProperty',
          'Edm.Boolean',
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
         * Static representation of the [[int16Property]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_16_PROPERTY: fieldBuilder.buildEdmTypeField(
          'Int16Property',
          'Edm.Int16',
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
          TestEntityMultiLink_1.TestEntityMultiLink
        )
      };
    }
    return this._schema;
  }
}
exports.TestEntityMultiLinkApi = TestEntityMultiLinkApi;
//# sourceMappingURL=TestEntityMultiLinkApi.js.map
