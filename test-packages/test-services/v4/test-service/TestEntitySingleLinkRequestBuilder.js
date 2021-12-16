'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntitySingleLinkRequestBuilder = void 0;
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const internal_1 = require('@sap-cloud-sdk/odata-v4/internal');
const TestEntitySingleLink_1 = require('./TestEntitySingleLink');
/**
 * Request builder class for operations supported on the [[TestEntitySingleLink]] entity.
 */
class TestEntitySingleLinkRequestBuilder extends internal_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `TestEntitySingleLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntitySingleLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntitySingleLink` entity based on its keys.
   */
  getByKey(keyProperty) {
    return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
      KeyProperty: keyProperty
    });
  }
  /**
   * Returns a request builder for querying all `TestEntitySingleLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntitySingleLink` entities.
   */
  getAll() {
    return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
  }
  /**
   * Returns a request builder for creating a `TestEntitySingleLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntitySingleLink`.
   */
  create(entity) {
    return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `TestEntitySingleLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntitySingleLink`.
   */
  update(entity) {
    return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
  }
  delete(keyPropertyOrEntity) {
    return new odata_v4_1.DeleteRequestBuilder(
      this.entityApi,
      keyPropertyOrEntity instanceof TestEntitySingleLink_1.TestEntitySingleLink
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity }
    );
  }
}
exports.TestEntitySingleLinkRequestBuilder = TestEntitySingleLinkRequestBuilder;
//# sourceMappingURL=TestEntitySingleLinkRequestBuilder.js.map
