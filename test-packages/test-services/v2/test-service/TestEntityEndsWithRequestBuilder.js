'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityEndsWithRequestBuilder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_common_1 = require('@sap-cloud-sdk/odata-common/internal');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const TestEntityEndsWith_1 = require('./TestEntityEndsWith');
/**
 * Request builder class for operations supported on the [[TestEntityEndsWith]] entity.
 */
class TestEntityEndsWithRequestBuilder extends odata_common_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityEndsWith` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityEndsWith.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityEndsWith` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v2_1.GetByKeyRequestBuilder(
      TestEntityEndsWith_1.TestEntityEndsWith,
      { KeyProperty: keyProperty }
    );
  }
  /**
   * Returns a request builder for querying all `TestEntityEndsWith` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWith` entities.
   */
  getAll() {
    return new odata_v2_1.GetAllRequestBuilder(
      TestEntityEndsWith_1.TestEntityEndsWith
    );
  }
  /**
   * Returns a request builder for creating a `TestEntityEndsWith` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWith`.
   */
  create(entity) {
    return new odata_v2_1.CreateRequestBuilder(
      TestEntityEndsWith_1.TestEntityEndsWith,
      entity
    );
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWith`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWith`.
   */
  update(entity) {
    return new odata_v2_1.UpdateRequestBuilder(
      TestEntityEndsWith_1.TestEntityEndsWith,
      entity
    );
  }
  delete(keyPropertyOrEntity) {
    return new odata_v2_1.DeleteRequestBuilder(
      TestEntityEndsWith_1.TestEntityEndsWith,
      keyPropertyOrEntity instanceof TestEntityEndsWith_1.TestEntityEndsWith
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityEndsWithRequestBuilder = TestEntityEndsWithRequestBuilder;
//# sourceMappingURL=TestEntityEndsWithRequestBuilder.js.map
