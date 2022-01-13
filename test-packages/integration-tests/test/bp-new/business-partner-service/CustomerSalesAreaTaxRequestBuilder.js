"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSalesAreaTaxRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the [[CustomerSalesAreaTax]] entity.
 */
class CustomerSalesAreaTaxRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `CustomerSalesAreaTax` entity based on its keys.
     * @param customer Key property. See [[CustomerSalesAreaTax.customer]].
     * @param salesOrganization Key property. See [[CustomerSalesAreaTax.salesOrganization]].
     * @param distributionChannel Key property. See [[CustomerSalesAreaTax.distributionChannel]].
     * @param division Key property. See [[CustomerSalesAreaTax.division]].
     * @param departureCountry Key property. See [[CustomerSalesAreaTax.departureCountry]].
     * @param customerTaxCategory Key property. See [[CustomerSalesAreaTax.customerTaxCategory]].
     * @returns A request builder for creating requests to retrieve one `CustomerSalesAreaTax` entity based on its keys.
     */
    getByKey(customer, salesOrganization, distributionChannel, division, departureCountry, customerTaxCategory) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            Customer: customer,
            SalesOrganization: salesOrganization,
            DistributionChannel: distributionChannel,
            Division: division,
            DepartureCountry: departureCountry,
            CustomerTaxCategory: customerTaxCategory
        });
    }
    /**
     * Returns a request builder for querying all `CustomerSalesAreaTax` entities.
     * @returns A request builder for creating requests to retrieve all `CustomerSalesAreaTax` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `CustomerSalesAreaTax` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CustomerSalesAreaTax`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `CustomerSalesAreaTax`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CustomerSalesAreaTax`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
}
exports.CustomerSalesAreaTaxRequestBuilder = CustomerSalesAreaTaxRequestBuilder;
//# sourceMappingURL=CustomerSalesAreaTaxRequestBuilder.js.map