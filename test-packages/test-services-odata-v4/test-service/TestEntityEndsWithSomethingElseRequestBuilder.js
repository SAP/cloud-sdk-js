"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityEndsWithSomethingElseRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const TestEntityEndsWithSomethingElse_1 = require("./TestEntityEndsWithSomethingElse");
/**
 * Request builder class for operations supported on the {@link TestEntityEndsWithSomethingElse} entity.
 */
class TestEntityEndsWithSomethingElseRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `TestEntityEndsWithSomethingElse` entity based on its keys.
     * @param keyProperty Key property. See {@link TestEntityEndsWithSomethingElse.keyProperty}.
     * @returns A request builder for creating requests to retrieve one `TestEntityEndsWithSomethingElse` entity based on its keys.
     */
    getByKey(keyProperty) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, { KeyProperty: keyProperty });
    }
    /**
     * Returns a request builder for querying all `TestEntityEndsWithSomethingElse` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntityEndsWithSomethingElse` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `TestEntityEndsWithSomethingElse` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWithSomethingElse`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `TestEntityEndsWithSomethingElse`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWithSomethingElse`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(keyPropertyOrEntity) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, keyPropertyOrEntity instanceof TestEntityEndsWithSomethingElse_1.TestEntityEndsWithSomethingElse
            ? keyPropertyOrEntity
            : { KeyProperty: keyPropertyOrEntity });
    }
}
exports.TestEntityEndsWithSomethingElseRequestBuilder = TestEntityEndsWithSomethingElseRequestBuilder;
//# sourceMappingURL=TestEntityEndsWithSomethingElseRequestBuilder.js.map