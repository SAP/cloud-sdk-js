"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerTextRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const CustomerText_1 = require("./CustomerText");
/**
 * Request builder class for operations supported on the [[CustomerText]] entity.
 */
class CustomerTextRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `CustomerText` entity based on its keys.
     * @param customer Key property. See [[CustomerText.customer]].
     * @param language Key property. See [[CustomerText.language]].
     * @param longTextId Key property. See [[CustomerText.longTextId]].
     * @returns A request builder for creating requests to retrieve one `CustomerText` entity based on its keys.
     */
    getByKey(customer, language, longTextId) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            Customer: customer,
            Language: language,
            LongTextID: longTextId
        });
    }
    /**
     * Returns a request builder for querying all `CustomerText` entities.
     * @returns A request builder for creating requests to retrieve all `CustomerText` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `CustomerText` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CustomerText`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `CustomerText`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CustomerText`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(customerOrEntity, language, longTextId) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, customerOrEntity instanceof CustomerText_1.CustomerText ? customerOrEntity : {
            Customer: customerOrEntity,
            Language: language,
            LongTextID: longTextId
        });
    }
}
exports.CustomerTextRequestBuilder = CustomerTextRequestBuilder;
//# sourceMappingURL=CustomerTextRequestBuilder.js.map