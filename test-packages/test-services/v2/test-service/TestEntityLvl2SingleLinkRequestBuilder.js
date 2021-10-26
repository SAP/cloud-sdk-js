'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityLvl2SingleLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const TestEntityLvl2SingleLink_1 = require('./TestEntityLvl2SingleLink');
/**
 * Request builder class for operations supported on the [[TestEntityLvl2SingleLink]] entity.
 */
class TestEntityLvl2SingleLinkRequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityLvl2SingleLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityLvl2SingleLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLvl2SingleLink` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new core_1.GetByKeyRequestBuilderV2(
      TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntityLvl2SingleLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLvl2SingleLink` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV2(
      TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink
    );
  }
  /**
   * Returns a request builder for creating a `TestEntityLvl2SingleLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLvl2SingleLink`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV2(
      TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityLvl2SingleLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLvl2SingleLink`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV2(
      TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new core_1.DeleteRequestBuilderV2(
      TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink,
      keyPropertyOrEntity instanceof
      TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityLvl2SingleLinkRequestBuilder =
  TestEntityLvl2SingleLinkRequestBuilder;
//# sourceMappingURL=TestEntityLvl2SingleLinkRequestBuilder.js.map
