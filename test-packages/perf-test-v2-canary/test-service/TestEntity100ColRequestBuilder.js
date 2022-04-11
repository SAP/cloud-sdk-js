"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity100ColRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const TestEntity100Col_1 = require("./TestEntity100Col");
/**
 * Request builder class for operations supported on the [[TestEntity100Col]] entity.
 */
class TestEntity100ColRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `TestEntity100Col` entity based on its keys.
     * @param keyTestEntity100Col Key property. See [[TestEntity100Col.keyTestEntity100Col]].
     * @returns A request builder for creating requests to retrieve one `TestEntity100Col` entity based on its keys.
     */
    getByKey(keyTestEntity100Col) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, { KeyTestEntity100Col: keyTestEntity100Col });
    }
    /**
     * Returns a request builder for querying all `TestEntity100Col` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity100Col` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `TestEntity100Col` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity100Col`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `TestEntity100Col`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity100Col`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(keyTestEntity100ColOrEntity) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, keyTestEntity100ColOrEntity instanceof TestEntity100Col_1.TestEntity100Col ? keyTestEntity100ColOrEntity : { KeyTestEntity100Col: keyTestEntity100ColOrEntity });
    }
}
exports.TestEntity100ColRequestBuilder = TestEntity100ColRequestBuilder;
//# sourceMappingURL=TestEntity100ColRequestBuilder.js.map