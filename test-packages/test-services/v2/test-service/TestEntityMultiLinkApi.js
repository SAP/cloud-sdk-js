'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityMultiLinkApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityMultiLink_1 = require('./TestEntityMultiLink');
const TestEntityMultiLinkRequestBuilder_1 = require('./TestEntityMultiLinkRequestBuilder');
const TestEntityLvl2MultiLinkApi_1 = require('./TestEntityLvl2MultiLinkApi');
const TestEntityLvl2SingleLinkApi_1 = require('./TestEntityLvl2SingleLinkApi');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
class TestEntityMultiLinkApi {
  constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
    this.entityConstructor = TestEntityMultiLink_1.TestEntityMultiLink;
    this.deSerializers = (0, odata_v2_1.mergeDefaultDeSerializersWith)(
      deSerializers
    );
    const fieldBuilder = new internal_1.FieldBuilder(
      TestEntityMultiLink_1.TestEntityMultiLink,
      this.deSerializers
    );
    this.schema = {
      /**
       * Static representation of the [[keyProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      KEY_PROPERTY: fieldBuilder.buildEdmTypeField(
        'KeyProperty',
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
       * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_MULTI_LINK: new internal_1.Link(
        'to_MultiLink',
        this,
        new TestEntityLvl2MultiLinkApi_1.TestEntityLvl2MultiLinkApi(
          deSerializers
        )
      ),
      /**
       * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_SINGLE_LINK: new internal_1.OneToOneLink(
        'to_SingleLink',
        this,
        new TestEntityLvl2SingleLinkApi_1.TestEntityLvl2SingleLinkApi(
          deSerializers
        )
      ),
      /**
       *
       * All fields selector.
       */
      ALL_FIELDS: new internal_1.AllFields(
        '*',
        TestEntityMultiLink_1.TestEntityMultiLink
      )
    };
  }
  requestBuilder() {
    return new TestEntityMultiLinkRequestBuilder_1.TestEntityMultiLinkRequestBuilder(
      this
    );
  }
  entityBuilder() {
    return (0, internal_1.entityBuilder)(this);
  }
  customField(fieldName, isNullable = false) {
    return new odata_v2_1.CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    );
  }
}
exports.TestEntityMultiLinkApi = TestEntityMultiLinkApi;
//# sourceMappingURL=TestEntityMultiLinkApi.js.map
