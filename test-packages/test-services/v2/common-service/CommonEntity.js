'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CommonEntity = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const CommonEntityRequestBuilder_1 = require('./CommonEntityRequestBuilder');
const CommonComplexType_1 = require('./CommonComplexType');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "A_CommonEntity" of service "API_COMMON_SRV".
 */
class CommonEntity extends odata_v2_1.Entity {
  /**
   * Returns an entity builder to construct instances of `CommonEntity`.
   * @returns A builder that constructs instances of entity type `CommonEntity`.
   */
  static builder() {
    return odata_v2_1.Entity.entityBuilder(CommonEntity);
  }
  /**
   * Returns a request builder to construct requests for operations on the `CommonEntity` entity type.
   * @returns A `CommonEntity` request builder.
   */
  static requestBuilder() {
    return new CommonEntityRequestBuilder_1.CommonEntityRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CommonEntity`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CommonEntity`.
   */
  static customField(fieldName) {
    return odata_v2_1.Entity.customFieldSelector(fieldName, CommonEntity);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.CommonEntity = CommonEntity;
/**
 * Technical entity name for CommonEntity.
 */
CommonEntity._entityName = 'A_CommonEntity';
/**
 * Default url path for the according service.
 */
CommonEntity._defaultServicePath = '/sap/opu/odata/sap/API_COMMON_ENTITY_SRV/';
(function (CommonEntity) {
  const _fieldBuilder = new internal_1.FieldBuilder(CommonEntity);
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  CommonEntity.KEY_PROPERTY_GUID = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyGuid',
    'Edm.Guid',
    false
  );
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  CommonEntity.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  CommonEntity.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  CommonEntity.INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  CommonEntity.COMPLEX_TYPE_PROPERTY = _fieldBuilder.buildComplexTypeField(
    'ComplexTypeProperty',
    CommonComplexType_1.CommonComplexTypeField,
    true
  );
  /**
   * All fields of the CommonEntity entity.
   */
  CommonEntity._allFields = [
    CommonEntity.KEY_PROPERTY_GUID,
    CommonEntity.KEY_PROPERTY_STRING,
    CommonEntity.STRING_PROPERTY,
    CommonEntity.INT_16_PROPERTY,
    CommonEntity.COMPLEX_TYPE_PROPERTY
  ];
  /**
   * All fields selector.
   */
  CommonEntity.ALL_FIELDS = new internal_1.AllFields('*', CommonEntity);
  /**
   * All key fields of the CommonEntity entity.
   */
  CommonEntity._keyFields = [
    CommonEntity.KEY_PROPERTY_GUID,
    CommonEntity.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property CommonEntity.
   */
  CommonEntity._keys = CommonEntity._keyFields.reduce((acc, field) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((CommonEntity = exports.CommonEntity || (exports.CommonEntity = {})));
//# sourceMappingURL=CommonEntity.js.map
