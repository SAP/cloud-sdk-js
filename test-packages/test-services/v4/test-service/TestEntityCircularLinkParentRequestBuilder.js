'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityCircularLinkParentRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const TestEntityCircularLinkParent_1 = require('./TestEntityCircularLinkParent');
/**
 * Request builder class for operations supported on the [[TestEntityCircularLinkParent]] entity.
 */
class TestEntityCircularLinkParentRequestBuilder extends internal_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityCircularLinkParent` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityCircularLinkParent.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityCircularLinkParent` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v4_1.GetByKeyRequestBuilder(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntityCircularLinkParent` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityCircularLinkParent` entities.
   */
  getAll() {
    return new odata_v4_1.GetAllRequestBuilder(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent
    );
  }
  /**
   * Returns a request builder for creating a `TestEntityCircularLinkParent` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityCircularLinkParent`.
   */
  create(entity) {
    return new odata_v4_1.CreateRequestBuilder(
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
    return new odata_v4_1.UpdateRequestBuilder(
      TestEntityCircularLinkParent_1.TestEntityCircularLinkParent,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new odata_v4_1.DeleteRequestBuilder(
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
