"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var v4_1 = require("@sap-cloud-sdk/core/v4");
var TestEntity_1 = require("./TestEntity");
/**
 * Request builder class for operations supported on the [[TestEntity]] entity.
 */
var TestEntityRequestBuilder = /** @class */ (function (_super) {
    __extends(TestEntityRequestBuilder, _super);
    function TestEntityRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `TestEntity` entity based on its keys.
     * @param keyPropertyInt Key property. See [[TestEntity.keyPropertyInt]].
     * @param keyPropertyString Key property. See [[TestEntity.keyPropertyString]].
     * @returns A request builder for creating requests to retrieve one `TestEntity` entity based on its keys.
     */
    TestEntityRequestBuilder.prototype.getByKey = function (keyPropertyInt, keyPropertyString) {
        return new v4_1.GetByKeyRequestBuilder(TestEntity_1.TestEntity, {
            KeyPropertyInt: keyPropertyInt,
            KeyPropertyString: keyPropertyString
        });
    };
    /**
     * Returns a request builder for querying all `TestEntity` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity` entities.
     */
    TestEntityRequestBuilder.prototype.getAll = function () {
        return new v4_1.GetAllRequestBuilder(TestEntity_1.TestEntity);
    };
    /**
     * Returns a request builder for creating a `TestEntity` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity`.
     */
    TestEntityRequestBuilder.prototype.create = function (entity) {
        return new v4_1.CreateRequestBuilder(TestEntity_1.TestEntity, entity);
    };
    /**
     * Returns a request builder for updating an entity of type `TestEntity`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity`.
     */
    TestEntityRequestBuilder.prototype.update = function (entity) {
        return new v4_1.UpdateRequestBuilder(TestEntity_1.TestEntity, entity);
    };
    TestEntityRequestBuilder.prototype.delete = function (keyPropertyIntOrEntity, keyPropertyString) {
        return new v4_1.DeleteRequestBuilder(TestEntity_1.TestEntity, keyPropertyIntOrEntity instanceof TestEntity_1.TestEntity ? keyPropertyIntOrEntity : {
            KeyPropertyInt: keyPropertyIntOrEntity,
            KeyPropertyString: keyPropertyString
        });
    };
    return TestEntityRequestBuilder;
}(v4_1.RequestBuilder));
exports.TestEntityRequestBuilder = TestEntityRequestBuilder;
//# sourceMappingURL=TestEntityRequestBuilder.js.map