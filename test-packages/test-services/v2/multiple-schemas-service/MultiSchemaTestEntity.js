'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MultiSchemaTestEntity = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const MultiSchemaTestEntityRequestBuilder_1 = require('./MultiSchemaTestEntityRequestBuilder');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
/**
 * This class represents the entity "MultiSchemaTestEntity" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
class MultiSchemaTestEntity extends odata_v2_1.Entity {
  /**
   * Returns an entity builder to construct instances of `MultiSchemaTestEntity`.
   * @returns A builder that constructs instances of entity type `MultiSchemaTestEntity`.
   */
  static builder() {
    return odata_v2_1.Entity.entityBuilder(MultiSchemaTestEntity);
  }
  /**
   * Returns a request builder to construct requests for operations on the `MultiSchemaTestEntity` entity type.
   * @returns A `MultiSchemaTestEntity` request builder.
   */
  static requestBuilder() {
    return new MultiSchemaTestEntityRequestBuilder_1.MultiSchemaTestEntityRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `MultiSchemaTestEntity`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `MultiSchemaTestEntity`.
   */
  static customField(fieldName) {
    return odata_v2_1.Entity.customFieldSelector(
      fieldName,
      MultiSchemaTestEntity
    );
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.MultiSchemaTestEntity = MultiSchemaTestEntity;
/**
 * Technical entity name for MultiSchemaTestEntity.
 */
MultiSchemaTestEntity._entityName = 'MultiSchemaTestEntity';
/**
 * Default url path for the according service.
 */
MultiSchemaTestEntity._defaultServicePath = 'VALUE_IS_UNDEFINED';
(function (MultiSchemaTestEntity) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(MultiSchemaTestEntity);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  MultiSchemaTestEntity.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * All fields of the MultiSchemaTestEntity entity.
   */
  MultiSchemaTestEntity._allFields = [MultiSchemaTestEntity.KEY_PROPERTY];
  /**
   * All fields selector.
   */
  MultiSchemaTestEntity.ALL_FIELDS = new odata_common_1.AllFields(
    '*',
    MultiSchemaTestEntity
  );
  /**
   * All key fields of the MultiSchemaTestEntity entity.
   */
  MultiSchemaTestEntity._keyFields = [MultiSchemaTestEntity.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property MultiSchemaTestEntity.
   */
  MultiSchemaTestEntity._keys = MultiSchemaTestEntity._keyFields.reduce(
    (acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (MultiSchemaTestEntity =
    exports.MultiSchemaTestEntity || (exports.MultiSchemaTestEntity = {}))
);
//# sourceMappingURL=MultiSchemaTestEntity.js.map
