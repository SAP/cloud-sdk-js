"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuPaAddressUsageRequestBuilder = void 0;
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BuPaAddressUsage_1 = require("./BuPaAddressUsage");
/**
 * Request builder class for operations supported on the [[BuPaAddressUsage]] entity.
 */
class BuPaAddressUsageRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `BuPaAddressUsage` entity based on its keys.
     * @param businessPartner Key property. See [[BuPaAddressUsage.businessPartner]].
     * @param validityEndDate Key property. See [[BuPaAddressUsage.validityEndDate]].
     * @param addressUsage Key property. See [[BuPaAddressUsage.addressUsage]].
     * @param addressId Key property. See [[BuPaAddressUsage.addressId]].
     * @returns A request builder for creating requests to retrieve one `BuPaAddressUsage` entity based on its keys.
     */
    getByKey(businessPartner, validityEndDate, addressUsage, addressId) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            BusinessPartner: businessPartner,
            ValidityEndDate: validityEndDate,
            AddressUsage: addressUsage,
            AddressID: addressId
        });
    }
    /**
     * Returns a request builder for querying all `BuPaAddressUsage` entities.
     * @returns A request builder for creating requests to retrieve all `BuPaAddressUsage` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `BuPaAddressUsage` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `BuPaAddressUsage`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `BuPaAddressUsage`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `BuPaAddressUsage`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(businessPartnerOrEntity, validityEndDate, addressUsage, addressId) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, businessPartnerOrEntity instanceof BuPaAddressUsage_1.BuPaAddressUsage ? businessPartnerOrEntity : {
            BusinessPartner: businessPartnerOrEntity,
            ValidityEndDate: validityEndDate,
            AddressUsage: addressUsage,
            AddressID: addressId
        });
    }
}
exports.BuPaAddressUsageRequestBuilder = BuPaAddressUsageRequestBuilder;
//# sourceMappingURL=BuPaAddressUsageRequestBuilder.js.map