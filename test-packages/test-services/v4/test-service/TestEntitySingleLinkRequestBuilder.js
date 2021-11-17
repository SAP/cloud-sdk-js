'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntitySingleLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_common_1 = require('@sap-cloud-sdk/odata-common/internal');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const TestEntitySingleLink_1 = require('./TestEntitySingleLink');
/**
 * Request builder class for operations supported on the [[TestEntitySingleLink]] entity.
 */
class TestEntitySingleLinkRequestBuilder extends odata_common_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntitySingleLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntitySingleLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntitySingleLink` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v4_1.GetByKeyRequestBuilder(
      TestEntitySingleLink_1.TestEntitySingleLink,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntitySingleLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntitySingleLink` entities.
   */
  getAll() {
    return new odata_v4_1.GetAllRequestBuilder(
      TestEntitySingleLink_1.TestEntitySingleLink
    );
  }
  /**
   * Returns a request builder for creating a `TestEntitySingleLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntitySingleLink`.
   */
  create(entity) {
    return new odata_v4_1.CreateRequestBuilder(
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
    return new odata_v4_1.UpdateRequestBuilder(
      TestEntitySingleLink_1.TestEntitySingleLink,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new odata_v4_1.DeleteRequestBuilder(
      TestEntitySingleLink_1.TestEntitySingleLink,
      keyPropertyOrEntity instanceof TestEntitySingleLink_1.TestEntitySingleLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntitySingleLinkRequestBuilder = TestEntitySingleLinkRequestBuilder;
//# sourceMappingURL=TestEntitySingleLinkRequestBuilder.js.map
