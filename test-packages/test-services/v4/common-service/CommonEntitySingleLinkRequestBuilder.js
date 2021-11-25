'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CommonEntitySingleLinkRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const CommonEntitySingleLink_1 = require('./CommonEntitySingleLink');
/**
 * Request builder class for operations supported on the [[CommonEntitySingleLink]] entity.
 */
class CommonEntitySingleLinkRequestBuilder extends internal_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `CommonEntitySingleLink` entity based on its keys.
   * @param keyProperty Key property. See [[CommonEntitySingleLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `CommonEntitySingleLink` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v4_1.GetByKeyRequestBuilder(
      CommonEntitySingleLink_1.CommonEntitySingleLink,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `CommonEntitySingleLink` entities.
   * @returns A request builder for creating requests to retrieve all `CommonEntitySingleLink` entities.
   */
  getAll() {
    return new odata_v4_1.GetAllRequestBuilder(
      CommonEntitySingleLink_1.CommonEntitySingleLink
    );
  }
  /**
   * Returns a request builder for creating a `CommonEntitySingleLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CommonEntitySingleLink`.
   */
  create(entity) {
    return new odata_v4_1.CreateRequestBuilder(
      CommonEntitySingleLink_1.CommonEntitySingleLink,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `CommonEntitySingleLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CommonEntitySingleLink`.
   */
  update(entity) {
    return new odata_v4_1.UpdateRequestBuilder(
      CommonEntitySingleLink_1.CommonEntitySingleLink,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new odata_v4_1.DeleteRequestBuilder(
      CommonEntitySingleLink_1.CommonEntitySingleLink,
      keyPropertyOrEntity instanceof
      CommonEntitySingleLink_1.CommonEntitySingleLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.CommonEntitySingleLinkRequestBuilder =
  CommonEntitySingleLinkRequestBuilder;
//# sourceMappingURL=CommonEntitySingleLinkRequestBuilder.js.map
