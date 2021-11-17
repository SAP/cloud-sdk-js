'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityMultiLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_common_1 = require('@sap-cloud-sdk/odata-common/internal');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const TestEntityMultiLink_1 = require('./TestEntityMultiLink');
/**
 * Request builder class for operations supported on the [[TestEntityMultiLink]] entity.
 */
class TestEntityMultiLinkRequestBuilder extends odata_common_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityMultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityMultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityMultiLink` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v2_1.GetByKeyRequestBuilder(
      TestEntityMultiLink_1.TestEntityMultiLink,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntityMultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityMultiLink` entities.
   */
  getAll() {
    return new odata_v2_1.GetAllRequestBuilder(
      TestEntityMultiLink_1.TestEntityMultiLink
    );
  }
  /**
   * Returns a request builder for creating a `TestEntityMultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityMultiLink`.
   */
  create(entity) {
    return new odata_v2_1.CreateRequestBuilder(
      TestEntityMultiLink_1.TestEntityMultiLink,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityMultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityMultiLink`.
   */
  update(entity) {
    return new odata_v2_1.UpdateRequestBuilder(
      TestEntityMultiLink_1.TestEntityMultiLink,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new odata_v2_1.DeleteRequestBuilder(
      TestEntityMultiLink_1.TestEntityMultiLink,
      keyPropertyOrEntity instanceof TestEntityMultiLink_1.TestEntityMultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityMultiLinkRequestBuilder = TestEntityMultiLinkRequestBuilder;
//# sourceMappingURL=TestEntityMultiLinkRequestBuilder.js.map
