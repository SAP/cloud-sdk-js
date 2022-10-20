"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityWithMultipleKeysRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const TestEntityWithMultipleKeys_1 = require("./TestEntityWithMultipleKeys");
/**
 * Request builder class for operations supported on the {@link TestEntityWithMultipleKeys} entity.
 */
class TestEntityWithMultipleKeysRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `TestEntityWithMultipleKeys` entity based on its keys.
     * @param keyTestEntityWithMultipleKeys Key property. See {@link TestEntityWithMultipleKeys.keyTestEntityWithMultipleKeys}.
     * @param stringPropertyWithMultipleKeys Key property. See {@link TestEntityWithMultipleKeys.stringPropertyWithMultipleKeys}.
     * @param booleanPropertyWithMultipleKeys Key property. See {@link TestEntityWithMultipleKeys.booleanPropertyWithMultipleKeys}.
     * @returns A request builder for creating requests to retrieve one `TestEntityWithMultipleKeys` entity based on its keys.
     */
    getByKey(keyTestEntityWithMultipleKeys, stringPropertyWithMultipleKeys, booleanPropertyWithMultipleKeys) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            KeyTestEntityWithMultipleKeys: keyTestEntityWithMultipleKeys,
            StringPropertyWithMultipleKeys: stringPropertyWithMultipleKeys,
            BooleanPropertyWithMultipleKeys: booleanPropertyWithMultipleKeys
        });
    }
    /**
     * Returns a request builder for querying all `TestEntityWithMultipleKeys` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntityWithMultipleKeys` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `TestEntityWithMultipleKeys` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntityWithMultipleKeys`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `TestEntityWithMultipleKeys`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntityWithMultipleKeys`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(keyTestEntityWithMultipleKeysOrEntity, stringPropertyWithMultipleKeys, booleanPropertyWithMultipleKeys) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, keyTestEntityWithMultipleKeysOrEntity instanceof TestEntityWithMultipleKeys_1.TestEntityWithMultipleKeys ? keyTestEntityWithMultipleKeysOrEntity : {
            KeyTestEntityWithMultipleKeys: keyTestEntityWithMultipleKeysOrEntity,
            StringPropertyWithMultipleKeys: stringPropertyWithMultipleKeys,
            BooleanPropertyWithMultipleKeys: booleanPropertyWithMultipleKeys
        });
    }
}
exports.TestEntityWithMultipleKeysRequestBuilder = TestEntityWithMultipleKeysRequestBuilder;
//# sourceMappingURL=TestEntityWithMultipleKeysRequestBuilder.js.map