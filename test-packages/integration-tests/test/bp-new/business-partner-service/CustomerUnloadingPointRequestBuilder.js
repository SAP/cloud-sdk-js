"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerUnloadingPointRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const CustomerUnloadingPoint_1 = require("./CustomerUnloadingPoint");
/**
 * Request builder class for operations supported on the [[CustomerUnloadingPoint]] entity.
 */
class CustomerUnloadingPointRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `CustomerUnloadingPoint` entity based on its keys.
     * @param customer Key property. See [[CustomerUnloadingPoint.customer]].
     * @param unloadingPointName Key property. See [[CustomerUnloadingPoint.unloadingPointName]].
     * @returns A request builder for creating requests to retrieve one `CustomerUnloadingPoint` entity based on its keys.
     */
    getByKey(customer, unloadingPointName) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            Customer: customer,
            UnloadingPointName: unloadingPointName
        });
    }
    /**
     * Returns a request builder for querying all `CustomerUnloadingPoint` entities.
     * @returns A request builder for creating requests to retrieve all `CustomerUnloadingPoint` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `CustomerUnloadingPoint` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CustomerUnloadingPoint`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `CustomerUnloadingPoint`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CustomerUnloadingPoint`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(customerOrEntity, unloadingPointName) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, customerOrEntity instanceof CustomerUnloadingPoint_1.CustomerUnloadingPoint ? customerOrEntity : {
            Customer: customerOrEntity,
            UnloadingPointName: unloadingPointName
        });
    }
}
exports.CustomerUnloadingPointRequestBuilder = CustomerUnloadingPointRequestBuilder;
//# sourceMappingURL=CustomerUnloadingPointRequestBuilder.js.map