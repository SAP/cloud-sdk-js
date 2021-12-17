"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityLinkRequestBuilder = void 0;
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const internal_1 = require("@sap-cloud-sdk/odata-v4/internal");
const TestEntityLink_1 = require("./TestEntityLink");
/**
 * Request builder class for operations supported on the [[TestEntityLink]] entity.
 */
class TestEntityLinkRequestBuilder extends internal_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `TestEntityLink` entity based on its keys.
     * @param keyTestEntityLink Key property. See [[TestEntityLink.keyTestEntityLink]].
     * @param keyToTestEntity Key property. See [[TestEntityLink.keyToTestEntity]].
     * @returns A request builder for creating requests to retrieve one `TestEntityLink` entity based on its keys.
     */
    getByKey(keyTestEntityLink, keyToTestEntity) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            KeyTestEntityLink: keyTestEntityLink,
            KeyToTestEntity: keyToTestEntity
        });
    }
    /**
     * Returns a request builder for querying all `TestEntityLink` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntityLink` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `TestEntityLink` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntityLink`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `TestEntityLink`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntityLink`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(keyTestEntityLinkOrEntity, keyToTestEntity) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, keyTestEntityLinkOrEntity instanceof TestEntityLink_1.TestEntityLink ? keyTestEntityLinkOrEntity : {
            KeyTestEntityLink: keyTestEntityLinkOrEntity,
            KeyToTestEntity: keyToTestEntity
        });
    }
}
exports.TestEntityLinkRequestBuilder = TestEntityLinkRequestBuilder;
//# sourceMappingURL=TestEntityLinkRequestBuilder.js.map