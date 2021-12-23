'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityEndsWithSomethingElseRequestBuilder = void 0;
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
const TestEntityEndsWithSomethingElse_1 = require('./TestEntityEndsWithSomethingElse');
/**
 * Request builder class for operations supported on the [[TestEntityEndsWithSomethingElse]] entity.
 */
class TestEntityEndsWithSomethingElseRequestBuilder extends internal_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityEndsWithSomethingElse` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityEndsWithSomethingElse.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityEndsWithSomethingElse` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
      KeyProperty: keyProperty
    });
  }
  /**
   * Returns a request builder for querying all `TestEntityEndsWithSomethingElse` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWithSomethingElse` entities.
   */
  getAll() {
    return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
  }
  /**
   * Returns a request builder for creating a `TestEntityEndsWithSomethingElse` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWithSomethingElse`.
   */
  create(entity) {
    return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWithSomethingElse`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWithSomethingElse`.
   */
  update(entity) {
    return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
  }
  delete(keyPropertyOrEntity) {
    return new odata_v2_1.DeleteRequestBuilder(
      this.entityApi,
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
