'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CaseTestRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const CaseTest_1 = require('./CaseTest');
/**
 * Request builder class for operations supported on the [[CaseTest]] entity.
 */
class CaseTestRequestBuilder extends odata_common_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `CaseTest` entity based on its keys.
   * @param keyPropertyString Key property. See [[CaseTest.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `CaseTest` entity based on its keys.
   */
  getByKey(keyPropertyString) {
    return new odata_v2_1.GetByKeyRequestBuilder(CaseTest_1.CaseTest, {
      KeyPropertyString: keyPropertyString
    });
  }
  /**
   * Returns a request builder for querying all `CaseTest` entities.
   * @returns A request builder for creating requests to retrieve all `CaseTest` entities.
   */
  getAll() {
    return new odata_v2_1.GetAllRequestBuilder(CaseTest_1.CaseTest);
  }
  /**
   * Returns a request builder for creating a `CaseTest` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CaseTest`.
   */
  create(entity) {
    return new odata_v2_1.CreateRequestBuilder(CaseTest_1.CaseTest, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `CaseTest`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CaseTest`.
   */
  update(entity) {
    return new odata_v2_1.UpdateRequestBuilder(CaseTest_1.CaseTest, entity);
  }
  delete(keyPropertyStringOrEntity) {
    return new odata_v2_1.DeleteRequestBuilder(
      CaseTest_1.CaseTest,
      keyPropertyStringOrEntity instanceof CaseTest_1.CaseTest
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity }
    );
  }
}
exports.CaseTestRequestBuilder = CaseTestRequestBuilder;
//# sourceMappingURL=CaseTestRequestBuilder.js.map
