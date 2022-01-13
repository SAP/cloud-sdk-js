"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuPaIndustryRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BuPaIndustry_1 = require("./BuPaIndustry");
/**
 * Request builder class for operations supported on the [[BuPaIndustry]] entity.
 */
class BuPaIndustryRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `BuPaIndustry` entity based on its keys.
     * @param industrySector Key property. See [[BuPaIndustry.industrySector]].
     * @param industrySystemType Key property. See [[BuPaIndustry.industrySystemType]].
     * @param businessPartner Key property. See [[BuPaIndustry.businessPartner]].
     * @returns A request builder for creating requests to retrieve one `BuPaIndustry` entity based on its keys.
     */
    getByKey(industrySector, industrySystemType, businessPartner) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            IndustrySector: industrySector,
            IndustrySystemType: industrySystemType,
            BusinessPartner: businessPartner
        });
    }
    /**
     * Returns a request builder for querying all `BuPaIndustry` entities.
     * @returns A request builder for creating requests to retrieve all `BuPaIndustry` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `BuPaIndustry` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `BuPaIndustry`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `BuPaIndustry`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `BuPaIndustry`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(industrySectorOrEntity, industrySystemType, businessPartner) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, industrySectorOrEntity instanceof BuPaIndustry_1.BuPaIndustry ? industrySectorOrEntity : {
            IndustrySector: industrySectorOrEntity,
            IndustrySystemType: industrySystemType,
            BusinessPartner: businessPartner
        });
    }
}
exports.BuPaIndustryRequestBuilder = BuPaIndustryRequestBuilder;
//# sourceMappingURL=BuPaIndustryRequestBuilder.js.map