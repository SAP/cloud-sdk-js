'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Photos = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const PhotosRequestBuilder_1 = require('./PhotosRequestBuilder');
const core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "Photos" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
class Photos extends core_1.EntityV4 {
  /**
   * Returns an entity builder to construct instances of `Photos`.
   * @returns A builder that constructs instances of entity type `Photos`.
   */
  static builder() {
    return core_1.EntityV4.entityBuilder(Photos);
  }
  /**
   * Returns a request builder to construct requests for operations on the `Photos` entity type.
   * @returns A `Photos` request builder.
   */
  static requestBuilder() {
    return new PhotosRequestBuilder_1.PhotosRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Photos`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Photos`.
   */
  static customField(fieldName) {
    return core_1.EntityV4.customFieldSelector(fieldName, Photos);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.Photos = Photos;
/**
 * Technical entity name for Photos.
 */
Photos._entityName = 'Photos';
/**
 * Default url path for the according service.
 */
Photos._defaultServicePath =
  'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
(function (Photos) {
  const _fieldBuilder = new core_1.FieldBuilder(Photos);
  /**
   * Static representation of the [[id]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Photos.ID = _fieldBuilder.buildEdmTypeField('Id', 'Edm.Int64', false);
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Photos.NAME = _fieldBuilder.buildEdmTypeField('Name', 'Edm.String', true);
  /**
   * All fields of the Photos entity.
   */
  Photos._allFields = [Photos.ID, Photos.NAME];
  /**
   * All fields selector.
   */
  Photos.ALL_FIELDS = new core_1.AllFields('*', Photos);
  /**
   * All key fields of the Photos entity.
   */
  Photos._keyFields = [Photos.ID];
  /**
   * Mapping of all key field names to the respective static field property Photos.
   */
  Photos._keys = Photos._keyFields.reduce((acc, field) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((Photos = exports.Photos || (exports.Photos = {})));
//# sourceMappingURL=Photos.js.map
