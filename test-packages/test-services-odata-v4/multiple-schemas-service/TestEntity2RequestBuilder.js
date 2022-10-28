"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity2RequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const TestEntity2_1 = require("./TestEntity2");
/**
 * Request builder class for operations supported on the {@link TestEntity2} entity.
 */
class TestEntity2RequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `TestEntity2` entity based on its keys.
     * @param keyPropertyString Key property. See {@link TestEntity2.keyPropertyString}.
     * @returns A request builder for creating requests to retrieve one `TestEntity2` entity based on its keys.
     */
    getByKey(keyPropertyString) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, { KeyPropertyString: keyPropertyString });
    }
    /**
     * Returns a request builder for querying all `TestEntity2` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity2` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `TestEntity2` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity2`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `TestEntity2`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity2`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(keyPropertyStringOrEntity) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, keyPropertyStringOrEntity instanceof TestEntity2_1.TestEntity2 ? keyPropertyStringOrEntity : { KeyPropertyString: keyPropertyStringOrEntity });
    }
}
exports.TestEntity2RequestBuilder = TestEntity2RequestBuilder;
//# sourceMappingURL=TestEntity2RequestBuilder.js.map