'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity50ColRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const TestEntity50Col_1 = require('./TestEntity50Col');
/**
 * Request builder class for operations supported on the [[TestEntity50Col]] entity.
 */
class TestEntity50ColRequestBuilder extends odata_v4_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntity50Col` entity based on its keys.
   * @param keyTestEntity50Col Key property. See [[TestEntity50Col.keyTestEntity50Col]].
   * @returns A request builder for creating requests to retrieve one `TestEntity50Col` entity based on its keys.
   */
  getByKey(keyTestEntity50Col) {
    return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
      KeyTestEntity50Col: keyTestEntity50Col
    });
  }
  /**
   * Returns a request builder for querying all `TestEntity50Col` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity50Col` entities.
   */
  getAll() {
    return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
  }
  /**
   * Returns a request builder for creating a `TestEntity50Col` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity50Col`.
   */
  create(entity) {
    return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntity50Col`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity50Col`.
   */
  update(entity) {
    return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
  }
  delete(keyTestEntity50ColOrEntity) {
    return new odata_v4_1.DeleteRequestBuilder(
      this.entityApi,
      keyTestEntity50ColOrEntity instanceof TestEntity50Col_1.TestEntity50Col
        ? keyTestEntity50ColOrEntity
        : { KeyTestEntity50Col: keyTestEntity50ColOrEntity }
    );
  }
}
exports.TestEntity50ColRequestBuilder = TestEntity50ColRequestBuilder;
//# sourceMappingURL=TestEntity50ColRequestBuilder.js.map
