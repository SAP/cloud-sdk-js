"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity50PropRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const TestEntity50Prop_1 = require("./TestEntity50Prop");
/**
 * Request builder class for operations supported on the {@link TestEntity50Prop} entity.
 */
class TestEntity50PropRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `TestEntity50Prop` entity based on its keys.
     * @param keyTestEntity50Prop Key property. See {@link TestEntity50Prop.keyTestEntity50Prop}.
     * @returns A request builder for creating requests to retrieve one `TestEntity50Prop` entity based on its keys.
     */
    getByKey(keyTestEntity50Prop) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, {
            KeyTestEntity50Prop: keyTestEntity50Prop
        });
    }
    /**
     * Returns a request builder for querying all `TestEntity50Prop` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity50Prop` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `TestEntity50Prop` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity50Prop`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `TestEntity50Prop`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity50Prop`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(keyTestEntity50PropOrEntity) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, keyTestEntity50PropOrEntity instanceof TestEntity50Prop_1.TestEntity50Prop
            ? keyTestEntity50PropOrEntity
            : { KeyTestEntity50Prop: keyTestEntity50PropOrEntity });
    }
}
exports.TestEntity50PropRequestBuilder = TestEntity50PropRequestBuilder;
//# sourceMappingURL=TestEntity50PropRequestBuilder.js.map