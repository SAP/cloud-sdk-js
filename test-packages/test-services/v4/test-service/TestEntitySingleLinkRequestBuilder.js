'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntitySingleLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const TestEntitySingleLink_1 = require('./TestEntitySingleLink');
/**
 * Request builder class for operations supported on the [[TestEntitySingleLink]] entity.
 */
class TestEntitySingleLinkRequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntitySingleLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntitySingleLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntitySingleLink` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new core_1.GetByKeyRequestBuilderV4(
      TestEntitySingleLink_1.TestEntitySingleLink,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntitySingleLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntitySingleLink` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV4(
      TestEntitySingleLink_1.TestEntitySingleLink
    );
  }
  /**
   * Returns a request builder for creating a `TestEntitySingleLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntitySingleLink`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV4(
      TestEntitySingleLink_1.TestEntitySingleLink,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntitySingleLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntitySingleLink`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV4(
      TestEntitySingleLink_1.TestEntitySingleLink,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntitySingleLink_1.TestEntitySingleLink,
      keyPropertyOrEntity instanceof TestEntitySingleLink_1.TestEntitySingleLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntitySingleLinkRequestBuilder = TestEntitySingleLinkRequestBuilder;
//# sourceMappingURL=TestEntitySingleLinkRequestBuilder.js.map
