'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityOtherMultiLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const TestEntityOtherMultiLink_1 = require('./TestEntityOtherMultiLink');
/**
 * Request builder class for operations supported on the [[TestEntityOtherMultiLink]] entity.
 */
class TestEntityOtherMultiLinkRequestBuilder extends odata_common_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityOtherMultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityOtherMultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityOtherMultiLink` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v4_1.GetByKeyRequestBuilder(
      TestEntityOtherMultiLink_1.TestEntityOtherMultiLink,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntityOtherMultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityOtherMultiLink` entities.
   */
  getAll() {
    return new odata_v4_1.GetAllRequestBuilder(
      TestEntityOtherMultiLink_1.TestEntityOtherMultiLink
    );
  }
  /**
   * Returns a request builder for creating a `TestEntityOtherMultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityOtherMultiLink`.
   */
  create(entity) {
    return new odata_v4_1.CreateRequestBuilder(
      TestEntityOtherMultiLink_1.TestEntityOtherMultiLink,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityOtherMultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityOtherMultiLink`.
   */
  update(entity) {
    return new odata_v4_1.UpdateRequestBuilder(
      TestEntityOtherMultiLink_1.TestEntityOtherMultiLink,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new odata_v4_1.DeleteRequestBuilder(
      TestEntityOtherMultiLink_1.TestEntityOtherMultiLink,
      keyPropertyOrEntity instanceof
      TestEntityOtherMultiLink_1.TestEntityOtherMultiLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityOtherMultiLinkRequestBuilder =
  TestEntityOtherMultiLinkRequestBuilder;
//# sourceMappingURL=TestEntityOtherMultiLinkRequestBuilder.js.map
