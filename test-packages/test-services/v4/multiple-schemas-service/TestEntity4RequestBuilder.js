'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity4RequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const TestEntity4_1 = require('./TestEntity4');
/**
 * Request builder class for operations supported on the [[TestEntity4]] entity.
 */
class TestEntity4RequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntity4` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntity4.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity4` entity based on its keys.
   */
  getByKey(keyPropertyString) {
    return new core_1.GetByKeyRequestBuilderV4(TestEntity4_1.TestEntity4, {
      KeyPropertyString: keyPropertyString
    });
  }
  /**
   * Returns a request builder for querying all `TestEntity4` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity4` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV4(TestEntity4_1.TestEntity4);
  }
  /**
   * Returns a request builder for creating a `TestEntity4` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity4`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV4(TestEntity4_1.TestEntity4, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntity4`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity4`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV4(TestEntity4_1.TestEntity4, entity);
  }
  delete(keyPropertyStringOrEntity) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntity4_1.TestEntity4,
      keyPropertyStringOrEntity instanceof TestEntity4_1.TestEntity4
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity }
    );
  }
}
exports.TestEntity4RequestBuilder = TestEntity4RequestBuilder;
//# sourceMappingURL=TestEntity4RequestBuilder.js.map
