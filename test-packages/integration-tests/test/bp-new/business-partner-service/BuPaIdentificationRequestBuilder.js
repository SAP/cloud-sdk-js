"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuPaIdentificationRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BuPaIdentification_1 = require("./BuPaIdentification");
/**
 * Request builder class for operations supported on the [[BuPaIdentification]] entity.
 */
class BuPaIdentificationRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `BuPaIdentification` entity based on its keys.
     * @param businessPartner Key property. See [[BuPaIdentification.businessPartner]].
     * @param bpIdentificationType Key property. See [[BuPaIdentification.bpIdentificationType]].
     * @param bpIdentificationNumber Key property. See [[BuPaIdentification.bpIdentificationNumber]].
     * @returns A request builder for creating requests to retrieve one `BuPaIdentification` entity based on its keys.
     */
    getByKey(businessPartner, bpIdentificationType, bpIdentificationNumber) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            BusinessPartner: businessPartner,
            BPIdentificationType: bpIdentificationType,
            BPIdentificationNumber: bpIdentificationNumber
        });
    }
    /**
     * Returns a request builder for querying all `BuPaIdentification` entities.
     * @returns A request builder for creating requests to retrieve all `BuPaIdentification` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `BuPaIdentification` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `BuPaIdentification`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `BuPaIdentification`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `BuPaIdentification`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(businessPartnerOrEntity, bpIdentificationType, bpIdentificationNumber) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, businessPartnerOrEntity instanceof BuPaIdentification_1.BuPaIdentification ? businessPartnerOrEntity : {
            BusinessPartner: businessPartnerOrEntity,
            BPIdentificationType: bpIdentificationType,
            BPIdentificationNumber: bpIdentificationNumber
        });
    }
}
exports.BuPaIdentificationRequestBuilder = BuPaIdentificationRequestBuilder;
//# sourceMappingURL=BuPaIdentificationRequestBuilder.js.map