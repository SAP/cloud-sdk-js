"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerWithHoldingTaxRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const CustomerWithHoldingTax_1 = require("./CustomerWithHoldingTax");
/**
 * Request builder class for operations supported on the [[CustomerWithHoldingTax]] entity.
 */
class CustomerWithHoldingTaxRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `CustomerWithHoldingTax` entity based on its keys.
     * @param customer Key property. See [[CustomerWithHoldingTax.customer]].
     * @param companyCode Key property. See [[CustomerWithHoldingTax.companyCode]].
     * @param withholdingTaxType Key property. See [[CustomerWithHoldingTax.withholdingTaxType]].
     * @returns A request builder for creating requests to retrieve one `CustomerWithHoldingTax` entity based on its keys.
     */
    getByKey(customer, companyCode, withholdingTaxType) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            Customer: customer,
            CompanyCode: companyCode,
            WithholdingTaxType: withholdingTaxType
        });
    }
    /**
     * Returns a request builder for querying all `CustomerWithHoldingTax` entities.
     * @returns A request builder for creating requests to retrieve all `CustomerWithHoldingTax` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `CustomerWithHoldingTax` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CustomerWithHoldingTax`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `CustomerWithHoldingTax`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CustomerWithHoldingTax`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(customerOrEntity, companyCode, withholdingTaxType) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, customerOrEntity instanceof CustomerWithHoldingTax_1.CustomerWithHoldingTax ? customerOrEntity : {
            Customer: customerOrEntity,
            CompanyCode: companyCode,
            WithholdingTaxType: withholdingTaxType
        });
    }
}
exports.CustomerWithHoldingTaxRequestBuilder = CustomerWithHoldingTaxRequestBuilder;
//# sourceMappingURL=CustomerWithHoldingTaxRequestBuilder.js.map