"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSalesAreaTextRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const CustomerSalesAreaText_1 = require("./CustomerSalesAreaText");
/**
 * Request builder class for operations supported on the [[CustomerSalesAreaText]] entity.
 */
class CustomerSalesAreaTextRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `CustomerSalesAreaText` entity based on its keys.
     * @param customer Key property. See [[CustomerSalesAreaText.customer]].
     * @param salesOrganization Key property. See [[CustomerSalesAreaText.salesOrganization]].
     * @param distributionChannel Key property. See [[CustomerSalesAreaText.distributionChannel]].
     * @param division Key property. See [[CustomerSalesAreaText.division]].
     * @param language Key property. See [[CustomerSalesAreaText.language]].
     * @param longTextId Key property. See [[CustomerSalesAreaText.longTextId]].
     * @returns A request builder for creating requests to retrieve one `CustomerSalesAreaText` entity based on its keys.
     */
    getByKey(customer, salesOrganization, distributionChannel, division, language, longTextId) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            Customer: customer,
            SalesOrganization: salesOrganization,
            DistributionChannel: distributionChannel,
            Division: division,
            Language: language,
            LongTextID: longTextId
        });
    }
    /**
     * Returns a request builder for querying all `CustomerSalesAreaText` entities.
     * @returns A request builder for creating requests to retrieve all `CustomerSalesAreaText` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `CustomerSalesAreaText` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CustomerSalesAreaText`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `CustomerSalesAreaText`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CustomerSalesAreaText`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(customerOrEntity, salesOrganization, distributionChannel, division, language, longTextId) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, customerOrEntity instanceof CustomerSalesAreaText_1.CustomerSalesAreaText ? customerOrEntity : {
            Customer: customerOrEntity,
            SalesOrganization: salesOrganization,
            DistributionChannel: distributionChannel,
            Division: division,
            Language: language,
            LongTextID: longTextId
        });
    }
}
exports.CustomerSalesAreaTextRequestBuilder = CustomerSalesAreaTextRequestBuilder;
//# sourceMappingURL=CustomerSalesAreaTextRequestBuilder.js.map