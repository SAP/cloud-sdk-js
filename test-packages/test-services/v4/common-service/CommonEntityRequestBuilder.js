'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CommonEntityRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const CommonEntity_1 = require('./CommonEntity');
/**
 * Request builder class for operations supported on the [[CommonEntity]] entity.
 */
class CommonEntityRequestBuilder extends internal_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `CommonEntity` entity based on its keys.
   * @param keyPropertyGuid Key property. See [[CommonEntity.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[CommonEntity.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `CommonEntity` entity based on its keys.
   */
  getByKey(keyPropertyGuid, keyPropertyString) {
    return new odata_v4_1.GetByKeyRequestBuilder(CommonEntity_1.CommonEntity, {
      KeyPropertyGuid: keyPropertyGuid,
      KeyPropertyString: keyPropertyString
    });
  }
  /**
   * Returns a request builder for querying all `CommonEntity` entities.
   * @returns A request builder for creating requests to retrieve all `CommonEntity` entities.
   */
  getAll() {
    return new odata_v4_1.GetAllRequestBuilder(CommonEntity_1.CommonEntity);
  }
  /**
   * Returns a request builder for creating a `CommonEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CommonEntity`.
   */
  create(entity) {
    return new odata_v4_1.CreateRequestBuilder(
      CommonEntity_1.CommonEntity,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `CommonEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CommonEntity`.
   */
  update(entity) {
    return new odata_v4_1.UpdateRequestBuilder(
      CommonEntity_1.CommonEntity,
      entity
    );
  }
  delete(keyPropertyGuidOrEntity, keyPropertyString) {
    return new odata_v4_1.DeleteRequestBuilder(
      CommonEntity_1.CommonEntity,
      keyPropertyGuidOrEntity instanceof CommonEntity_1.CommonEntity
        ? keyPropertyGuidOrEntity
        : {
            KeyPropertyGuid: keyPropertyGuidOrEntity,
            KeyPropertyString: keyPropertyString
          }
    );
  }
}
exports.CommonEntityRequestBuilder = CommonEntityRequestBuilder;
//# sourceMappingURL=CommonEntityRequestBuilder.js.map
