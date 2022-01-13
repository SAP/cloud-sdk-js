"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustSalesPartnerFuncRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const CustSalesPartnerFunc_1 = require("./CustSalesPartnerFunc");
/**
 * Request builder class for operations supported on the [[CustSalesPartnerFunc]] entity.
 */
class CustSalesPartnerFuncRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `CustSalesPartnerFunc` entity based on its keys.
     * @param customer Key property. See [[CustSalesPartnerFunc.customer]].
     * @param salesOrganization Key property. See [[CustSalesPartnerFunc.salesOrganization]].
     * @param distributionChannel Key property. See [[CustSalesPartnerFunc.distributionChannel]].
     * @param division Key property. See [[CustSalesPartnerFunc.division]].
     * @param partnerCounter Key property. See [[CustSalesPartnerFunc.partnerCounter]].
     * @param partnerFunction Key property. See [[CustSalesPartnerFunc.partnerFunction]].
     * @returns A request builder for creating requests to retrieve one `CustSalesPartnerFunc` entity based on its keys.
     */
    getByKey(customer, salesOrganization, distributionChannel, division, partnerCounter, partnerFunction) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            Customer: customer,
            SalesOrganization: salesOrganization,
            DistributionChannel: distributionChannel,
            Division: division,
            PartnerCounter: partnerCounter,
            PartnerFunction: partnerFunction
        });
    }
    /**
     * Returns a request builder for querying all `CustSalesPartnerFunc` entities.
     * @returns A request builder for creating requests to retrieve all `CustSalesPartnerFunc` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `CustSalesPartnerFunc` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CustSalesPartnerFunc`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `CustSalesPartnerFunc`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CustSalesPartnerFunc`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(customerOrEntity, salesOrganization, distributionChannel, division, partnerCounter, partnerFunction) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, customerOrEntity instanceof CustSalesPartnerFunc_1.CustSalesPartnerFunc ? customerOrEntity : {
            Customer: customerOrEntity,
            SalesOrganization: salesOrganization,
            DistributionChannel: distributionChannel,
            Division: division,
            PartnerCounter: partnerCounter,
            PartnerFunction: partnerFunction
        });
    }
}
exports.CustSalesPartnerFuncRequestBuilder = CustSalesPartnerFuncRequestBuilder;
//# sourceMappingURL=CustSalesPartnerFuncRequestBuilder.js.map