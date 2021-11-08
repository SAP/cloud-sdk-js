'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityWithSharedEntityType2RequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const TestEntityWithSharedEntityType2_1 = require('./TestEntityWithSharedEntityType2');
/**
 * Request builder class for operations supported on the [[TestEntityWithSharedEntityType2]] entity.
 */
class TestEntityWithSharedEntityType2RequestBuilder extends odata_common_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityWithSharedEntityType2` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityWithSharedEntityType2.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityWithSharedEntityType2` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v2_1.GetByKeyRequestBuilder(
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntityWithSharedEntityType2` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithSharedEntityType2` entities.
   */
  getAll() {
    return new odata_v2_1.GetAllRequestBuilder(
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2
    );
  }
  /**
   * Returns a request builder for creating a `TestEntityWithSharedEntityType2` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithSharedEntityType2`.
   */
  create(entity) {
    return new odata_v2_1.CreateRequestBuilder(
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityWithSharedEntityType2`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityWithSharedEntityType2`.
   */
  update(entity) {
    return new odata_v2_1.UpdateRequestBuilder(
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new odata_v2_1.DeleteRequestBuilder(
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2,
      keyPropertyOrEntity instanceof
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityWithSharedEntityType2RequestBuilder =
  TestEntityWithSharedEntityType2RequestBuilder;
//# sourceMappingURL=TestEntityWithSharedEntityType2RequestBuilder.js.map
