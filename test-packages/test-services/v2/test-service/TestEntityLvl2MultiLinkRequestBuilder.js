'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityLvl2MultiLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const TestEntityLvl2MultiLink_1 = require('./TestEntityLvl2MultiLink');
/**
 * Request builder class for operations supported on the [[TestEntityLvl2MultiLink]] entity.
 */
class TestEntityLvl2MultiLinkRequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityLvl2MultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityLvl2MultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLvl2MultiLink` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new core_1.GetByKeyRequestBuilderV2(
      TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntityLvl2MultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLvl2MultiLink` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV2(
      TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink
    );
  }
  /**
   * Returns a request builder for creating a `TestEntityLvl2MultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLvl2MultiLink`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV2(
      TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityLvl2MultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLvl2MultiLink`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV2(
      TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new core_1.DeleteRequestBuilderV2(
      TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink,
      keyPropertyOrEntity instanceof
      TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityLvl2MultiLinkRequestBuilder =
  TestEntityLvl2MultiLinkRequestBuilder;
//# sourceMappingURL=TestEntityLvl2MultiLinkRequestBuilder.js.map
