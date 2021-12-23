'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityEndsWithRequestBuilder = void 0;
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
const TestEntityEndsWith_1 = require('./TestEntityEndsWith');
/**
 * Request builder class for operations supported on the [[TestEntityEndsWith]] entity.
 */
class TestEntityEndsWithRequestBuilder extends internal_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntityEndsWith` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityEndsWith.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityEndsWith` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
      KeyProperty: keyProperty
    });
  }
  /**
   * Returns a request builder for querying all `TestEntityEndsWith` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWith` entities.
   */
  getAll() {
    return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
  }
  /**
   * Returns a request builder for creating a `TestEntityEndsWith` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWith`.
   */
  create(entity) {
    return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWith`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWith`.
   */
  update(entity) {
    return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
  }
  delete(keyPropertyOrEntity) {
    return new odata_v4_1.DeleteRequestBuilder(
      this.entityApi,
      keyPropertyOrEntity instanceof TestEntityEndsWith_1.TestEntityEndsWith
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntityEndsWithRequestBuilder = TestEntityEndsWithRequestBuilder;
//# sourceMappingURL=TestEntityEndsWithRequestBuilder.js.map
