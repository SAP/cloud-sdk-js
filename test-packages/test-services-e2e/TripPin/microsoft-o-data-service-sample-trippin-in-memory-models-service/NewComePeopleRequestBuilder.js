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
exports.NewComePeopleRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var NewComePeople_1 = require("./NewComePeople");
/**
 * Request builder class for operations supported on the [[NewComePeople]] entity.
 */
var NewComePeopleRequestBuilder = /** @class */ (function (_super) {
    __extends(NewComePeopleRequestBuilder, _super);
    function NewComePeopleRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `NewComePeople` entity based on its keys.
     * @param userName Key property. See [[NewComePeople.userName]].
     * @returns A request builder for creating requests to retrieve one `NewComePeople` entity based on its keys.
     */
    NewComePeopleRequestBuilder.prototype.getByKey = function (userName) {
        return new core_1.GetByKeyRequestBuilderV4(NewComePeople_1.NewComePeople, { UserName: userName });
    };
    /**
     * Returns a request builder for querying all `NewComePeople` entities.
     * @returns A request builder for creating requests to retrieve all `NewComePeople` entities.
     */
    NewComePeopleRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilderV4(NewComePeople_1.NewComePeople);
    };
    /**
     * Returns a request builder for creating a `NewComePeople` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `NewComePeople`.
     */
    NewComePeopleRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilderV4(NewComePeople_1.NewComePeople, entity);
    };
    /**
     * Returns a request builder for updating an entity of type `NewComePeople`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `NewComePeople`.
     */
    NewComePeopleRequestBuilder.prototype.update = function (entity) {
        return new core_1.UpdateRequestBuilderV4(NewComePeople_1.NewComePeople, entity);
    };
    NewComePeopleRequestBuilder.prototype.delete = function (userNameOrEntity) {
        return new core_1.DeleteRequestBuilderV4(NewComePeople_1.NewComePeople, userNameOrEntity instanceof NewComePeople_1.NewComePeople ? userNameOrEntity : { UserName: userNameOrEntity });
    };
    return NewComePeopleRequestBuilder;
}(core_1.RequestBuilder));
exports.NewComePeopleRequestBuilder = NewComePeopleRequestBuilder;
//# sourceMappingURL=NewComePeopleRequestBuilder.js.map