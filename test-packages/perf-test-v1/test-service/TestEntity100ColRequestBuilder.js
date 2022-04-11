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
exports.TestEntity100ColRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var TestEntity100Col_1 = require("./TestEntity100Col");
/**
 * Request builder class for operations supported on the [[TestEntity100Col]] entity.
 */
var TestEntity100ColRequestBuilder = /** @class */ (function (_super) {
    __extends(TestEntity100ColRequestBuilder, _super);
    function TestEntity100ColRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `TestEntity100Col` entity based on its keys.
     * @param keyTestEntity100Col Key property. See [[TestEntity100Col.keyTestEntity100Col]].
     * @returns A request builder for creating requests to retrieve one `TestEntity100Col` entity based on its keys.
     */
    TestEntity100ColRequestBuilder.prototype.getByKey = function (keyTestEntity100Col) {
        return new core_1.GetByKeyRequestBuilderV4(TestEntity100Col_1.TestEntity100Col, { KeyTestEntity100Col: keyTestEntity100Col });
    };
    /**
     * Returns a request builder for querying all `TestEntity100Col` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity100Col` entities.
     */
    TestEntity100ColRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilderV4(TestEntity100Col_1.TestEntity100Col);
    };
    /**
     * Returns a request builder for creating a `TestEntity100Col` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity100Col`.
     */
    TestEntity100ColRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilderV4(TestEntity100Col_1.TestEntity100Col, entity);
    };
    /**
     * Returns a request builder for updating an entity of type `TestEntity100Col`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity100Col`.
     */
    TestEntity100ColRequestBuilder.prototype.update = function (entity) {
        return new core_1.UpdateRequestBuilderV4(TestEntity100Col_1.TestEntity100Col, entity);
    };
    TestEntity100ColRequestBuilder.prototype.delete = function (keyTestEntity100ColOrEntity) {
        return new core_1.DeleteRequestBuilderV4(TestEntity100Col_1.TestEntity100Col, keyTestEntity100ColOrEntity instanceof TestEntity100Col_1.TestEntity100Col ? keyTestEntity100ColOrEntity : { KeyTestEntity100Col: keyTestEntity100ColOrEntity });
    };
    return TestEntity100ColRequestBuilder;
}(core_1.RequestBuilder));
exports.TestEntity100ColRequestBuilder = TestEntity100ColRequestBuilder;
//# sourceMappingURL=TestEntity100ColRequestBuilder.js.map