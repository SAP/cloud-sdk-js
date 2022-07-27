'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityWithSharedEntityType1RequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const TestEntityWithSharedEntityType1_1 = require('./TestEntityWithSharedEntityType1');
/**
 * Request builder class for operations supported on the {@link TestEntityWithSharedEntityType1} entity.
 */
class TestEntityWithSharedEntityType1RequestBuilder extends odata_v2_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityWithSharedEntityType1` entity based on its keys.
   * @param keyProperty Key property. See {@link TestEntityWithSharedEntityType1.keyProperty}.
   * @returns A request builder for creating requests to retrieve one `TestEntityWithSharedEntityType1` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
      KeyProperty: keyProperty
    });
  }
  /**
   * Returns a request builder for querying all `TestEntityWithSharedEntityType1` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithSharedEntityType1` entities.
   */
  getAll() {
    return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
  }
  /**
   * Returns a request builder for creating a `TestEntityWithSharedEntityType1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithSharedEntityType1`.
   */
  create(entity) {
    return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityWithSharedEntityType1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityWithSharedEntityType1`.
   */
  update(entity) {
    return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
  }
  delete(keyPropertyOrEntity) {
    return new odata_v2_1.DeleteRequestBuilder(
      this.entityApi,
      keyPropertyOrEntity instanceof
      TestEntityWithSharedEntityType1_1.TestEntityWithSharedEntityType1
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityWithSharedEntityType1RequestBuilder =
  TestEntityWithSharedEntityType1RequestBuilder;
//# sourceMappingURL=TestEntityWithSharedEntityType1RequestBuilder.js.map
