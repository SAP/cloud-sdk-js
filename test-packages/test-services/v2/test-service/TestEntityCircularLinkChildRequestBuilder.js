'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityCircularLinkChildRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const TestEntityCircularLinkChild_1 = require('./TestEntityCircularLinkChild');
/**
 * Request builder class for operations supported on the [[TestEntityCircularLinkChild]] entity.
 */
class TestEntityCircularLinkChildRequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityCircularLinkChild` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityCircularLinkChild.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityCircularLinkChild` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new core_1.GetByKeyRequestBuilderV2(
      TestEntityCircularLinkChild_1.TestEntityCircularLinkChild,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntityCircularLinkChild` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityCircularLinkChild` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV2(
      TestEntityCircularLinkChild_1.TestEntityCircularLinkChild
    );
  }
  /**
   * Returns a request builder for creating a `TestEntityCircularLinkChild` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityCircularLinkChild`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV2(
      TestEntityCircularLinkChild_1.TestEntityCircularLinkChild,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityCircularLinkChild`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityCircularLinkChild`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV2(
      TestEntityCircularLinkChild_1.TestEntityCircularLinkChild,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new core_1.DeleteRequestBuilderV2(
      TestEntityCircularLinkChild_1.TestEntityCircularLinkChild,
      keyPropertyOrEntity instanceof
      TestEntityCircularLinkChild_1.TestEntityCircularLinkChild
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityCircularLinkChildRequestBuilder =
  TestEntityCircularLinkChildRequestBuilder;
//# sourceMappingURL=TestEntityCircularLinkChildRequestBuilder.js.map
