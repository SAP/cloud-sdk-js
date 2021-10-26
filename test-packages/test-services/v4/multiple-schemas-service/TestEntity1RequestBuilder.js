'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity1RequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const TestEntity1_1 = require('./TestEntity1');
/**
 * Request builder class for operations supported on the [[TestEntity1]] entity.
 */
class TestEntity1RequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntity1` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntity1.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity1` entity based on its keys.
   */
  getByKey(keyPropertyString) {
    return new core_1.GetByKeyRequestBuilderV4(TestEntity1_1.TestEntity1, {
      KeyPropertyString: keyPropertyString
    });
  }
  /**
   * Returns a request builder for querying all `TestEntity1` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity1` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV4(TestEntity1_1.TestEntity1);
  }
  /**
   * Returns a request builder for creating a `TestEntity1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity1`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV4(TestEntity1_1.TestEntity1, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntity1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity1`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV4(TestEntity1_1.TestEntity1, entity);
  }
  delete(keyPropertyStringOrEntity) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntity1_1.TestEntity1,
      keyPropertyStringOrEntity instanceof TestEntity1_1.TestEntity1
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity }
    );
  }
}
exports.TestEntity1RequestBuilder = TestEntity1RequestBuilder;
//# sourceMappingURL=TestEntity1RequestBuilder.js.map
