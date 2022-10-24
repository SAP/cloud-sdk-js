"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const TestEntity_1 = require("./TestEntity");
/**
 * Request builder class for operations supported on the {@link TestEntity} entity.
 */
class TestEntityRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `TestEntity` entity based on its keys.
     * @param keyTestEntity Key property. See {@link TestEntity.keyTestEntity}.
     * @returns A request builder for creating requests to retrieve one `TestEntity` entity based on its keys.
     */
    getByKey(keyTestEntity) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, { KeyTestEntity: keyTestEntity });
    }
    /**
     * Returns a request builder for querying all `TestEntity` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `TestEntity` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `TestEntity`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(keyTestEntityOrEntity) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, keyTestEntityOrEntity instanceof TestEntity_1.TestEntity ? keyTestEntityOrEntity : { KeyTestEntity: keyTestEntityOrEntity });
    }
}
exports.TestEntityRequestBuilder = TestEntityRequestBuilder;
//# sourceMappingURL=TestEntityRequestBuilder.js.map