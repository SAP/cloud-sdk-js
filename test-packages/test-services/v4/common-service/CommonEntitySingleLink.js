'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CommonEntitySingleLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const CommonEntitySingleLinkRequestBuilder_1 = require('./CommonEntitySingleLinkRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "A_CommonEntitySingleLink" of service "API_COMMON_SRV".
 */
class CommonEntitySingleLink extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `CommonEntitySingleLink`.
   * @returns A builder that constructs instances of entity type `CommonEntitySingleLink`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(CommonEntitySingleLink);
  }
  /**
   * Returns a request builder to construct requests for operations on the `CommonEntitySingleLink` entity type.
   * @returns A `CommonEntitySingleLink` request builder.
   */
  static requestBuilder() {
    return new CommonEntitySingleLinkRequestBuilder_1.CommonEntitySingleLinkRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CommonEntitySingleLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CommonEntitySingleLink`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(
      fieldName,
      CommonEntitySingleLink
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
exports.CommonEntitySingleLink = CommonEntitySingleLink;
/**
 * Technical entity name for CommonEntitySingleLink.
 */
CommonEntitySingleLink._entityName = 'A_CommonEntitySingleLink';
/**
 * Default url path for the according service.
 */
CommonEntitySingleLink._defaultServicePath =
  '/sap/opu/odata/sap/API_COMMON_ENTITY_SRV/';
(function (CommonEntitySingleLink) {
  const _fieldBuilder = new internal_1.FieldBuilder(CommonEntitySingleLink);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  CommonEntitySingleLink.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  CommonEntitySingleLink.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * All fields of the CommonEntitySingleLink entity.
   */
  CommonEntitySingleLink._allFields = [
    CommonEntitySingleLink.KEY_PROPERTY,
    CommonEntitySingleLink.STRING_PROPERTY
  ];
  /**
   * All fields selector.
   */
  CommonEntitySingleLink.ALL_FIELDS = new internal_1.AllFields(
    '*',
    CommonEntitySingleLink
  );
  /**
   * All key fields of the CommonEntitySingleLink entity.
   */
  CommonEntitySingleLink._keyFields = [CommonEntitySingleLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property CommonEntitySingleLink.
   */
  CommonEntitySingleLink._keys = CommonEntitySingleLink._keyFields.reduce(
    (acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (CommonEntitySingleLink =
    exports.CommonEntitySingleLink || (exports.CommonEntitySingleLink = {}))
);
//# sourceMappingURL=CommonEntitySingleLink.js.map
