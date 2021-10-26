'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity3RequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const TestEntity3_1 = require('./TestEntity3');
/**
 * Request builder class for operations supported on the [[TestEntity3]] entity.
 */
class TestEntity3RequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntity3` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntity3.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity3` entity based on its keys.
   */
  getByKey(keyPropertyString) {
    return new core_1.GetByKeyRequestBuilderV4(TestEntity3_1.TestEntity3, {
      KeyPropertyString: keyPropertyString
    });
  }
  /**
   * Returns a request builder for querying all `TestEntity3` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity3` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV4(TestEntity3_1.TestEntity3);
  }
  /**
   * Returns a request builder for creating a `TestEntity3` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity3`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV4(TestEntity3_1.TestEntity3, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntity3`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity3`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV4(TestEntity3_1.TestEntity3, entity);
  }
  delete(keyPropertyStringOrEntity) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntity3_1.TestEntity3,
      keyPropertyStringOrEntity instanceof TestEntity3_1.TestEntity3
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity }
    );
  }
}
exports.TestEntity3RequestBuilder = TestEntity3RequestBuilder;
//# sourceMappingURL=TestEntity3RequestBuilder.js.map
