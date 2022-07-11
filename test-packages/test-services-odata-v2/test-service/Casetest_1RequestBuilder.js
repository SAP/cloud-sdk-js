'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Casetest_1RequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const Casetest_1_1 = require('./Casetest_1');
/**
 * Request builder class for operations supported on the [[Casetest_1]] entity.
 */
class Casetest_1RequestBuilder extends odata_v2_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `Casetest_1` entity based on its keys.
   * @param keyPropertyString Key property. See [[Casetest_1.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `Casetest_1` entity based on its keys.
   */
  getByKey(keyPropertyString) {
    return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
      KeyPropertyString: keyPropertyString
    });
  }
  /**
   * Returns a request builder for querying all `Casetest_1` entities.
   * @returns A request builder for creating requests to retrieve all `Casetest_1` entities.
   */
  getAll() {
    return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
  }
  /**
   * Returns a request builder for creating a `Casetest_1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Casetest_1`.
   */
  create(entity) {
    return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `Casetest_1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Casetest_1`.
   */
  update(entity) {
    return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
  }
  delete(keyPropertyStringOrEntity) {
    return new odata_v2_1.DeleteRequestBuilder(
      this.entityApi,
      keyPropertyStringOrEntity instanceof Casetest_1_1.Casetest_1
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity }
    );
  }
}
exports.Casetest_1RequestBuilder = Casetest_1RequestBuilder;
//# sourceMappingURL=Casetest_1RequestBuilder.js.map
