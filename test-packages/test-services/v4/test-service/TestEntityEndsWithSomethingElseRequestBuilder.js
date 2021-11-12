'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityEndsWithSomethingElseRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const TestEntityEndsWithSomethingElse_1 = require('./TestEntityEndsWithSomethingElse');
/**
 * Request builder class for operations supported on the [[TestEntityEndsWithSomethingElse]] entity.
 */
class TestEntityEndsWithSomethingElseRequestBuilder extends odata_common_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityEndsWithSomethingElse` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityEndsWithSomethingElse.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityEndsWithSomethingElse` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v4_1.GetByKeyRequestBuilder(
      TestEntityEndsWithSomethingElse_1.TestEntityEndsWithSomethingElse,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntityEndsWithSomethingElse` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWithSomethingElse` entities.
   */
  getAll() {
    return new odata_v4_1.GetAllRequestBuilder(
      TestEntityEndsWithSomethingElse_1.TestEntityEndsWithSomethingElse
    );
  }
  /**
   * Returns a request builder for creating a `TestEntityEndsWithSomethingElse` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWithSomethingElse`.
   */
  create(entity) {
    return new odata_v4_1.CreateRequestBuilder(
      TestEntityEndsWithSomethingElse_1.TestEntityEndsWithSomethingElse,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWithSomethingElse`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWithSomethingElse`.
   */
  update(entity) {
    return new odata_v4_1.UpdateRequestBuilder(
      TestEntityEndsWithSomethingElse_1.TestEntityEndsWithSomethingElse,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new odata_v4_1.DeleteRequestBuilder(
      TestEntityEndsWithSomethingElse_1.TestEntityEndsWithSomethingElse,
      keyPropertyOrEntity instanceof
      TestEntityEndsWithSomethingElse_1.TestEntityEndsWithSomethingElse
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityEndsWithSomethingElseRequestBuilder =
  TestEntityEndsWithSomethingElseRequestBuilder;
//# sourceMappingURL=TestEntityEndsWithSomethingElseRequestBuilder.js.map
