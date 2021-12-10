"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSchemaTestEntityRequestBuilder = void 0;
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const internal_1 = require("@sap-cloud-sdk/odata-v2/internal");
const MultiSchemaTestEntity_1 = require("./MultiSchemaTestEntity");
/**
 * Request builder class for operations supported on the [[MultiSchemaTestEntity]] entity.
 */
class MultiSchemaTestEntityRequestBuilder extends internal_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `MultiSchemaTestEntity` entity based on its keys.
     * @param keyProperty Key property. See [[MultiSchemaTestEntity.keyProperty]].
     * @returns A request builder for creating requests to retrieve one `MultiSchemaTestEntity` entity based on its keys.
     */
    getByKey(keyProperty) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, { KeyProperty: keyProperty });
    }
    /**
     * Returns a request builder for querying all `MultiSchemaTestEntity` entities.
     * @returns A request builder for creating requests to retrieve all `MultiSchemaTestEntity` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `MultiSchemaTestEntity` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `MultiSchemaTestEntity`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `MultiSchemaTestEntity`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `MultiSchemaTestEntity`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(keyPropertyOrEntity) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, keyPropertyOrEntity instanceof MultiSchemaTestEntity_1.MultiSchemaTestEntity ? keyPropertyOrEntity : { KeyProperty: keyPropertyOrEntity });
    }
}
exports.MultiSchemaTestEntityRequestBuilder = MultiSchemaTestEntityRequestBuilder;
//# sourceMappingURL=MultiSchemaTestEntityRequestBuilder.js.map