'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CaseTest = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const CaseTestRequestBuilder_1 = require('./CaseTestRequestBuilder');
const core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_CaseTest" of service "API_TEST_SRV".
 */
class CaseTest extends core_1.EntityV2 {
  /**
   * Returns an entity builder to construct instances of `CaseTest`.
   * @returns A builder that constructs instances of entity type `CaseTest`.
   */
  static builder() {
    return core_1.EntityV2.entityBuilder(CaseTest);
  }
  /**
   * Returns a request builder to construct requests for operations on the `CaseTest` entity type.
   * @returns A `CaseTest` request builder.
   */
  static requestBuilder() {
    return new CaseTestRequestBuilder_1.CaseTestRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CaseTest`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CaseTest`.
   */
  static customField(fieldName) {
    return core_1.EntityV2.customFieldSelector(fieldName, CaseTest);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.CaseTest = CaseTest;
/**
 * Technical entity name for CaseTest.
 */
CaseTest._entityName = 'A_CaseTest';
/**
 * Default url path for the according service.
 */
CaseTest._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
(function (CaseTest) {
  const _fieldBuilder = new core_1.FieldBuilder(CaseTest);
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  CaseTest.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * All fields of the CaseTest entity.
   */
  CaseTest._allFields = [CaseTest.KEY_PROPERTY_STRING];
  /**
   * All fields selector.
   */
  CaseTest.ALL_FIELDS = new core_1.AllFields('*', CaseTest);
  /**
   * All key fields of the CaseTest entity.
   */
  CaseTest._keyFields = [CaseTest.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property CaseTest.
   */
  CaseTest._keys = CaseTest._keyFields.reduce((acc, field) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((CaseTest = exports.CaseTest || (exports.CaseTest = {})));
//# sourceMappingURL=CaseTest.js.map
