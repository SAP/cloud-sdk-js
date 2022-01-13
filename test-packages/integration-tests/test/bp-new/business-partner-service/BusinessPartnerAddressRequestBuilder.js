"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPartnerAddressRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BusinessPartnerAddress_1 = require("./BusinessPartnerAddress");
/**
 * Request builder class for operations supported on the [[BusinessPartnerAddress]] entity.
 */
class BusinessPartnerAddressRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `BusinessPartnerAddress` entity based on its keys.
     * @param businessPartner Key property. See [[BusinessPartnerAddress.businessPartner]].
     * @param addressId Key property. See [[BusinessPartnerAddress.addressId]].
     * @returns A request builder for creating requests to retrieve one `BusinessPartnerAddress` entity based on its keys.
     */
    getByKey(businessPartner, addressId) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            BusinessPartner: businessPartner,
            AddressID: addressId
        });
    }
    /**
     * Returns a request builder for querying all `BusinessPartnerAddress` entities.
     * @returns A request builder for creating requests to retrieve all `BusinessPartnerAddress` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `BusinessPartnerAddress` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `BusinessPartnerAddress`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `BusinessPartnerAddress`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `BusinessPartnerAddress`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(businessPartnerOrEntity, addressId) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, businessPartnerOrEntity instanceof BusinessPartnerAddress_1.BusinessPartnerAddress ? businessPartnerOrEntity : {
            BusinessPartner: businessPartnerOrEntity,
            AddressID: addressId
        });
    }
}
exports.BusinessPartnerAddressRequestBuilder = BusinessPartnerAddressRequestBuilder;
//# sourceMappingURL=BusinessPartnerAddressRequestBuilder.js.map