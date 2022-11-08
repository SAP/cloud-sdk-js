"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosRequestBuilder = void 0;
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const Photos_1 = require("./Photos");
/**
 * Request builder class for operations supported on the {@link Photos} entity.
 */
class PhotosRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `Photos` entity based on its keys.
     * @param id Key property. See {@link Photos.id}.
     * @returns A request builder for creating requests to retrieve one `Photos` entity based on its keys.
     */
    getByKey(id) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, { Id: id });
    }
    /**
     * Returns a request builder for querying all `Photos` entities.
     * @returns A request builder for creating requests to retrieve all `Photos` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `Photos` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `Photos`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `Photos`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `Photos`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(idOrEntity) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, idOrEntity instanceof Photos_1.Photos ? idOrEntity : { Id: idOrEntity });
    }
}
exports.PhotosRequestBuilder = PhotosRequestBuilder;
//# sourceMappingURL=PhotosRequestBuilder.js.map