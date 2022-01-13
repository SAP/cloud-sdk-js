"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSalesAreaRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the [[CustomerSalesArea]] entity.
 */
class CustomerSalesAreaRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `CustomerSalesArea` entity based on its keys.
     * @param customer Key property. See [[CustomerSalesArea.customer]].
     * @param salesOrganization Key property. See [[CustomerSalesArea.salesOrganization]].
     * @param distributionChannel Key property. See [[CustomerSalesArea.distributionChannel]].
     * @param division Key property. See [[CustomerSalesArea.division]].
     * @returns A request builder for creating requests to retrieve one `CustomerSalesArea` entity based on its keys.
     */
    getByKey(customer, salesOrganization, distributionChannel, division) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            Customer: customer,
            SalesOrganization: salesOrganization,
            DistributionChannel: distributionChannel,
            Division: division
        });
    }
    /**
     * Returns a request builder for querying all `CustomerSalesArea` entities.
     * @returns A request builder for creating requests to retrieve all `CustomerSalesArea` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `CustomerSalesArea` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CustomerSalesArea`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `CustomerSalesArea`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CustomerSalesArea`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
}
exports.CustomerSalesAreaRequestBuilder = CustomerSalesAreaRequestBuilder;
//# sourceMappingURL=CustomerSalesAreaRequestBuilder.js.map