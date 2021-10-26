'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PhotosRequestBuilder = void 0;
const core_1 = require('@sap-cloud-sdk/core');
const Photos_1 = require('./Photos');
/**
 * Request builder class for operations supported on the [[Photos]] entity.
 */
class PhotosRequestBuilder extends core_1.RequestBuilder {
  /**
   * Returns a request builder for retrieving one `Photos` entity based on its keys.
   * @param id Key property. See [[Photos.id]].
   * @returns A request builder for creating requests to retrieve one `Photos` entity based on its keys.
   */
  getByKey(id) {
    return new core_1.GetByKeyRequestBuilderV4(Photos_1.Photos, { Id: id });
  }
  /**
   * Returns a request builder for querying all `Photos` entities.
   * @returns A request builder for creating requests to retrieve all `Photos` entities.
   */
  getAll() {
    return new core_1.GetAllRequestBuilderV4(Photos_1.Photos);
  }
  /**
   * Returns a request builder for creating a `Photos` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Photos`.
   */
  create(entity) {
    return new core_1.CreateRequestBuilderV4(Photos_1.Photos, entity);
  }
  /**
   * Returns a request builder for updating an entity of type `Photos`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Photos`.
   */
  update(entity) {
    return new core_1.UpdateRequestBuilderV4(Photos_1.Photos, entity);
  }
  delete(idOrEntity) {
    return new core_1.DeleteRequestBuilderV4(
      Photos_1.Photos,
      idOrEntity instanceof Photos_1.Photos ? idOrEntity : { Id: idOrEntity }
    );
  }
}
exports.PhotosRequestBuilder = PhotosRequestBuilder;
//# sourceMappingURL=PhotosRequestBuilder.js.map
