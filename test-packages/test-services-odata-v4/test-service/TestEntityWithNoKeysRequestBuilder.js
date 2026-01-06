"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityWithNoKeysRequestBuilder = void 0;
/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * Request builder class for operations supported on the {@link TestEntityWithNoKeys} entity.
 */
class TestEntityWithNoKeysRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `TestEntityWithNoKeys` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntityWithNoKeys` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `TestEntityWithNoKeys` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntityWithNoKeys`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
}
exports.TestEntityWithNoKeysRequestBuilder = TestEntityWithNoKeysRequestBuilder;
//# sourceMappingURL=TestEntityWithNoKeysRequestBuilder.js.map