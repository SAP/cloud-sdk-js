'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MultiSchemaTestEntityRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const MultiSchemaTestEntity_1 = require('./MultiSchemaTestEntity');
/**
 * Request builder class for operations supported on the [[MultiSchemaTestEntity]] entity.
 */
class MultiSchemaTestEntityRequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `MultiSchemaTestEntity` entity based on its keys.
   * @param keyProperty Key property. See [[MultiSchemaTestEntity.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `MultiSchemaTestEntity` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new core_1.GetByKeyRequestBuilderV2(
      MultiSchemaTestEntity_1.MultiSchemaTestEntity,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `MultiSchemaTestEntity` entities.
   * @returns A request builder for creating requests to retrieve all `MultiSchemaTestEntity` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV2(
      MultiSchemaTestEntity_1.MultiSchemaTestEntity
    );
  }
  /**
   * Returns a request builder for creating a `MultiSchemaTestEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `MultiSchemaTestEntity`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV2(
      MultiSchemaTestEntity_1.MultiSchemaTestEntity,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `MultiSchemaTestEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `MultiSchemaTestEntity`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV2(
      MultiSchemaTestEntity_1.MultiSchemaTestEntity,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new core_1.DeleteRequestBuilderV2(
      MultiSchemaTestEntity_1.MultiSchemaTestEntity,
      keyPropertyOrEntity instanceof
      MultiSchemaTestEntity_1.MultiSchemaTestEntity
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.MultiSchemaTestEntityRequestBuilder =
  MultiSchemaTestEntityRequestBuilder;
//# sourceMappingURL=MultiSchemaTestEntityRequestBuilder.js.map
