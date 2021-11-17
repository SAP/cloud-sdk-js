'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Airlines = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const AirlinesRequestBuilder_1 = require('./AirlinesRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const odata_common_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "Airlines" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
class Airlines extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `Airlines`.
   * @returns A builder that constructs instances of entity type `Airlines`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(Airlines);
  }
  /**
   * Returns a request builder to construct requests for operations on the `Airlines` entity type.
   * @returns A `Airlines` request builder.
   */
  static requestBuilder() {
    return new AirlinesRequestBuilder_1.AirlinesRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Airlines`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Airlines`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(fieldName, Airlines);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.Airlines = Airlines;
/**
 * Technical entity name for Airlines.
 */
Airlines._entityName = 'Airlines';
/**
 * Default url path for the according service.
 */
Airlines._defaultServicePath =
  'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
(function (Airlines) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(Airlines);
  /**
   * Static representation of the [[airlineCode]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Airlines.AIRLINE_CODE = _fieldBuilder.buildEdmTypeField(
    'AirlineCode',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Airlines.NAME = _fieldBuilder.buildEdmTypeField('Name', 'Edm.String', false);
  /**
   * All fields of the Airlines entity.
   */
  Airlines._allFields = [Airlines.AIRLINE_CODE, Airlines.NAME];
  /**
   * All fields selector.
   */
  Airlines.ALL_FIELDS = new odata_common_1.AllFields('*', Airlines);
  /**
   * All key fields of the Airlines entity.
   */
  Airlines._keyFields = [Airlines.AIRLINE_CODE];
  /**
   * Mapping of all key field names to the respective static field property Airlines.
   */
  Airlines._keys = Airlines._keyFields.reduce((acc, field) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((Airlines = exports.Airlines || (exports.Airlines = {})));
//# sourceMappingURL=Airlines.js.map
