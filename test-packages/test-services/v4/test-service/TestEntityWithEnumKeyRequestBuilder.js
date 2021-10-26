'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityWithEnumKeyRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const TestEntityWithEnumKey_1 = require('./TestEntityWithEnumKey');
/**
 * Request builder class for operations supported on the [[TestEntityWithEnumKey]] entity.
 */
class TestEntityWithEnumKeyRequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityWithEnumKey` entity based on its keys.
   * @param keyPropertyEnum1 Key property. See [[TestEntityWithEnumKey.keyPropertyEnum1]].
   * @returns A request builder for creating requests to retrieve one `TestEntityWithEnumKey` entity based on its keys.
   */
  getByKey(keyPropertyEnum1) {
    return new core_1.GetByKeyRequestBuilderV4(
      TestEntityWithEnumKey_1.TestEntityWithEnumKey,
      { KeyPropertyEnum1: keyPropertyEnum1 }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntityWithEnumKey` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithEnumKey` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV4(
      TestEntityWithEnumKey_1.TestEntityWithEnumKey
    );
  }
  /**
   * Returns a request builder for creating a `TestEntityWithEnumKey` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithEnumKey`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV4(
      TestEntityWithEnumKey_1.TestEntityWithEnumKey,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityWithEnumKey`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityWithEnumKey`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV4(
      TestEntityWithEnumKey_1.TestEntityWithEnumKey,
      entity
    );
  }
  delete(keyPropertyEnum1OrEntity) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntityWithEnumKey_1.TestEntityWithEnumKey,
      keyPropertyEnum1OrEntity instanceof
      TestEntityWithEnumKey_1.TestEntityWithEnumKey
        ? keyPropertyEnum1OrEntity
        : { KeyPropertyEnum1: keyPropertyEnum1OrEntity }
    );
  }
}
exports.TestEntityWithEnumKeyRequestBuilder =
  TestEntityWithEnumKeyRequestBuilder;
//# sourceMappingURL=TestEntityWithEnumKeyRequestBuilder.js.map
