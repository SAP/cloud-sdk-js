"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const People_1 = require("./People");
/**
 * Request builder class for operations supported on the {@link People} entity.
 */
class PeopleRequestBuilder extends odata_v4_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `People` entity based on its keys.
     * @param userName Key property. See {@link People.userName}.
     * @returns A request builder for creating requests to retrieve one `People` entity based on its keys.
     */
    getByKey(userName) {
        return new odata_v4_1.GetByKeyRequestBuilder(this.entityApi, { UserName: userName });
    }
    /**
     * Returns a request builder for querying all `People` entities.
     * @returns A request builder for creating requests to retrieve all `People` entities.
     */
    getAll() {
        return new odata_v4_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `People` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `People`.
     */
    create(entity) {
        return new odata_v4_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `People`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `People`.
     */
    update(entity) {
        return new odata_v4_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(userNameOrEntity) {
        return new odata_v4_1.DeleteRequestBuilder(this.entityApi, userNameOrEntity instanceof People_1.People ? userNameOrEntity : { UserName: userNameOrEntity });
    }
}
exports.PeopleRequestBuilder = PeopleRequestBuilder;
//# sourceMappingURL=PeopleRequestBuilder.js.map