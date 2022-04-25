'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity_1 = require('./TestEntity');
const TestEntityRequestBuilder_1 = require('./TestEntityRequestBuilder');
const TestComplexType_1 = require('./TestComplexType');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
class TestEntityApi {
  constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
    this.entityConstructor = TestEntity_1.TestEntity;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {
      TO_MULTI_LINK: new odata_v2_1.Link('to_MultiLink', this, linkedApis[0]),
      TO_OTHER_MULTI_LINK: new odata_v2_1.Link(
        'to_OtherMultiLink',
        this,
        linkedApis[1]
      ),
      TO_SINGLE_LINK: new odata_v2_1.OneToOneLink(
        'to_SingleLink',
        this,
        linkedApis[2]
      )
    };
    return this;
  }
  requestBuilder() {
    return new TestEntityRequestBuilder_1.TestEntityRequestBuilder(this);
  }
  entityBuilder() {
    return (0, odata_v2_1.entityBuilder)(this);
  }
  customField(fieldName, isNullable = false) {
    return new odata_v2_1.CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    );
  }
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new odata_v2_1.FieldBuilder(
        TestEntity_1.TestEntity,
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
         * Static representation of the [[keyPropertyGuid]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY_GUID: fieldBuilder.buildEdmTypeField(
          'KeyPropertyGuid',
          'Edm.Guid',
          false
        ),
        /**
         * Static representation of the [[keyPropertyString]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY_STRING: fieldBuilder.buildEdmTypeField(
          'KeyPropertyString',
          'Edm.String',
          false
        ),
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
         * Static representation of the [[int32Property]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_32_PROPERTY: fieldBuilder.buildEdmTypeField(
          'Int32Property',
          'Edm.Int32',
          true
        ),
        /**
         * Static representation of the [[int64Property]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY: fieldBuilder.buildEdmTypeField(
          'Int64Property',
          'Edm.Int64',
          true
        ),
        /**
         * Static representation of the [[decimalProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DecimalProperty',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the [[singleProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SINGLE_PROPERTY: fieldBuilder.buildEdmTypeField(
          'SingleProperty',
          'Edm.Single',
          true
        ),
        /**
         * Static representation of the [[doubleProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DoubleProperty',
          'Edm.Double',
          true
        ),
        /**
         * Static representation of the [[floatProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FLOAT_PROPERTY: fieldBuilder.buildEdmTypeField(
          'FloatProperty',
          'Edm.Float',
          true
        ),
        /**
         * Static representation of the [[timeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_PROPERTY: fieldBuilder.buildEdmTypeField(
          'TimeProperty',
          'Edm.Time',
          true
        ),
        /**
         * Static representation of the [[dateTimeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_TIME_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DateTimeProperty',
          'Edm.DateTime',
          true
        ),
        /**
         * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_TIME_OFF_SET_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DateTimeOffSetProperty',
          'Edm.DateTimeOffset',
          true
        ),
        /**
         * Static representation of the [[byteProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BYTE_PROPERTY: fieldBuilder.buildEdmTypeField(
          'ByteProperty',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the [[sByteProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        S_BYTE_PROPERTY: fieldBuilder.buildEdmTypeField(
          'SByteProperty',
          'Edm.SByte',
          true
        ),
        /**
         * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SOMETHING_THE_SDK_DOES_NOT_SUPPORT: fieldBuilder.buildEdmTypeField(
          'SomethingTheSDKDoesNotSupport',
          'Edm.Any',
          true
        ),
        /**
         * Static representation of the [[complexTypeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPLEX_TYPE_PROPERTY: fieldBuilder.buildComplexTypeField(
          'ComplexTypeProperty',
          TestComplexType_1.TestComplexTypeField,
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v2_1.AllFields('*', TestEntity_1.TestEntity)
      };
    }
    return this._schema;
  }
}
exports.TestEntityApi = TestEntityApi;
//# sourceMappingURL=TestEntityApi.js.map
