'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityCircularLinkParentRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const TestEntityCircularLinkParent_1 = require('./TestEntityCircularLinkParent');
/**
 * Request builder class for operations supported on the [[TestEntityCircularLinkParent]] entity.
 */
class TestEntityCircularLinkParentRequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityCircularLinkParent` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityCircularLinkParent.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityCircularLinkParent` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new core_1.GetByKeyRequestBuilderV4(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntityCircularLinkParent` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityCircularLinkParent` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV4(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent
    );
  }
  /**
   * Returns a request builder for creating a `TestEntityCircularLinkParent` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityCircularLinkParent`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV4(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityCircularLinkParent`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityCircularLinkParent`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV4(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new core_1.DeleteRequestBuilderV4(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent,
      keyPropertyOrEntity instanceof
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityCircularLinkParentRequestBuilder =
  TestEntityCircularLinkParentRequestBuilder;
//# sourceMappingURL=TestEntityCircularLinkParentRequestBuilder.js.map
