"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity50ColRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var TestEntity50Col_1 = require("./TestEntity50Col");
/**
 * Request builder class for operations supported on the [[TestEntity50Col]] entity.
 */
var TestEntity50ColRequestBuilder = /** @class */ (function (_super) {
    __extends(TestEntity50ColRequestBuilder, _super);
    function TestEntity50ColRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `TestEntity50Col` entity based on its keys.
     * @param keyTestEntity50Col Key property. See [[TestEntity50Col.keyTestEntity50Col]].
     * @returns A request builder for creating requests to retrieve one `TestEntity50Col` entity based on its keys.
     */
    TestEntity50ColRequestBuilder.prototype.getByKey = function (keyTestEntity50Col) {
        return new core_1.GetByKeyRequestBuilderV4(TestEntity50Col_1.TestEntity50Col, { KeyTestEntity50Col: keyTestEntity50Col });
    };
    /**
     * Returns a request builder for querying all `TestEntity50Col` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity50Col` entities.
     */
    TestEntity50ColRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilderV4(TestEntity50Col_1.TestEntity50Col);
    };
    /**
     * Returns a request builder for creating a `TestEntity50Col` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity50Col`.
     */
    TestEntity50ColRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilderV4(TestEntity50Col_1.TestEntity50Col, entity);
    };
    /**
     * Returns a request builder for updating an entity of type `TestEntity50Col`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity50Col`.
     */
    TestEntity50ColRequestBuilder.prototype.update = function (entity) {
        return new core_1.UpdateRequestBuilderV4(TestEntity50Col_1.TestEntity50Col, entity);
    };
    TestEntity50ColRequestBuilder.prototype.delete = function (keyTestEntity50ColOrEntity) {
        return new core_1.DeleteRequestBuilderV4(TestEntity50Col_1.TestEntity50Col, keyTestEntity50ColOrEntity instanceof TestEntity50Col_1.TestEntity50Col ? keyTestEntity50ColOrEntity : { KeyTestEntity50Col: keyTestEntity50ColOrEntity });
    };
    return TestEntity50ColRequestBuilder;
}(core_1.RequestBuilder));
exports.TestEntity50ColRequestBuilder = TestEntity50ColRequestBuilder;
//# sourceMappingURL=TestEntity50ColRequestBuilder.js.map