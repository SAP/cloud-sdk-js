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
exports.TestEntitySharesEntityTypeRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var TestEntitySharesEntityType_1 = require("./TestEntitySharesEntityType");
/**
 * Request builder class for operations supported on the [[TestEntitySharesEntityType]] entity.
 */
var TestEntitySharesEntityTypeRequestBuilder = /** @class */ (function (_super) {
    __extends(TestEntitySharesEntityTypeRequestBuilder, _super);
    function TestEntitySharesEntityTypeRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `TestEntitySharesEntityType` entity based on its keys.
     * @param keyPropertyGuid Key property. See [[TestEntitySharesEntityType.keyPropertyGuid]].
     * @param keyPropertyString Key property. See [[TestEntitySharesEntityType.keyPropertyString]].
     * @returns A request builder for creating requests to retrieve one `TestEntitySharesEntityType` entity based on its keys.
     */
    TestEntitySharesEntityTypeRequestBuilder.prototype.getByKey = function (keyPropertyGuid, keyPropertyString) {
        return new core_1.GetByKeyRequestBuilderV4(TestEntitySharesEntityType_1.TestEntitySharesEntityType, {
            KeyPropertyGuid: keyPropertyGuid,
            KeyPropertyString: keyPropertyString
        });
    };
    /**
     * Returns a request builder for querying all `TestEntitySharesEntityType` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntitySharesEntityType` entities.
     */
    TestEntitySharesEntityTypeRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilderV4(TestEntitySharesEntityType_1.TestEntitySharesEntityType);
    };
    /**
     * Returns a request builder for creating a `TestEntitySharesEntityType` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntitySharesEntityType`.
     */
    TestEntitySharesEntityTypeRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilderV4(TestEntitySharesEntityType_1.TestEntitySharesEntityType, entity);
    };
    /**
     * Returns a request builder for updating an entity of type `TestEntitySharesEntityType`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntitySharesEntityType`.
     */
    TestEntitySharesEntityTypeRequestBuilder.prototype.update = function (entity) {
        return new core_1.UpdateRequestBuilderV4(TestEntitySharesEntityType_1.TestEntitySharesEntityType, entity);
    };
    TestEntitySharesEntityTypeRequestBuilder.prototype.delete = function (keyPropertyGuidOrEntity, keyPropertyString) {
        return new core_1.DeleteRequestBuilderV4(TestEntitySharesEntityType_1.TestEntitySharesEntityType, keyPropertyGuidOrEntity instanceof TestEntitySharesEntityType_1.TestEntitySharesEntityType ? keyPropertyGuidOrEntity : {
            KeyPropertyGuid: keyPropertyGuidOrEntity,
            KeyPropertyString: keyPropertyString
        });
    };
    return TestEntitySharesEntityTypeRequestBuilder;
}(core_1.RequestBuilder));
exports.TestEntitySharesEntityTypeRequestBuilder = TestEntitySharesEntityTypeRequestBuilder;
//# sourceMappingURL=TestEntitySharesEntityTypeRequestBuilder.js.map