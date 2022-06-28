'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityCircularLinkSelfRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const TestEntityCircularLinkSelf_1 = require('./TestEntityCircularLinkSelf');
/**
 * Request builder class for operations supported on the [[TestEntityCircularLinkSelf]] entity.
 */
class TestEntityCircularLinkSelfRequestBuilder extends odata_v4_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityCircularLinkSelf` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityCircularLinkSelf.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityCircularLinkSelf` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
      KeyProperty: keyProperty
    });
  }
  /**
   * Returns a request builder for querying all `TestEntityCircularLinkSelf` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityCircularLinkSelf` entities.
   */
  getAll() {
    return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
  }
  /**
   * Returns a request builder for creating a `TestEntityCircularLinkSelf` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityCircularLinkSelf`.
   */
  create(entity) {
    return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityCircularLinkSelf`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityCircularLinkSelf`.
   */
  update(entity) {
    return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
  }
  delete(keyPropertyOrEntity) {
    return new odata_v4_1.DeleteRequestBuilder(
      this.entityApi,
      keyPropertyOrEntity instanceof
      TestEntityCircularLinkSelf_1.TestEntityCircularLinkSelf
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityCircularLinkSelfRequestBuilder =
  TestEntityCircularLinkSelfRequestBuilder;
//# sourceMappingURL=TestEntityCircularLinkSelfRequestBuilder.js.map
