"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierPurchasingOrgTextRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const SupplierPurchasingOrgText_1 = require("./SupplierPurchasingOrgText");
/**
 * Request builder class for operations supported on the [[SupplierPurchasingOrgText]] entity.
 */
class SupplierPurchasingOrgTextRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `SupplierPurchasingOrgText` entity based on its keys.
     * @param supplier Key property. See [[SupplierPurchasingOrgText.supplier]].
     * @param purchasingOrganization Key property. See [[SupplierPurchasingOrgText.purchasingOrganization]].
     * @param language Key property. See [[SupplierPurchasingOrgText.language]].
     * @param longTextId Key property. See [[SupplierPurchasingOrgText.longTextId]].
     * @returns A request builder for creating requests to retrieve one `SupplierPurchasingOrgText` entity based on its keys.
     */
    getByKey(supplier, purchasingOrganization, language, longTextId) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            Supplier: supplier,
            PurchasingOrganization: purchasingOrganization,
            Language: language,
            LongTextID: longTextId
        });
    }
    /**
     * Returns a request builder for querying all `SupplierPurchasingOrgText` entities.
     * @returns A request builder for creating requests to retrieve all `SupplierPurchasingOrgText` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `SupplierPurchasingOrgText` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SupplierPurchasingOrgText`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `SupplierPurchasingOrgText`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SupplierPurchasingOrgText`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(supplierOrEntity, purchasingOrganization, language, longTextId) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, supplierOrEntity instanceof SupplierPurchasingOrgText_1.SupplierPurchasingOrgText ? supplierOrEntity : {
            Supplier: supplierOrEntity,
            PurchasingOrganization: purchasingOrganization,
            Language: language,
            LongTextID: longTextId
        });
    }
}
exports.SupplierPurchasingOrgTextRequestBuilder = SupplierPurchasingOrgTextRequestBuilder;
//# sourceMappingURL=SupplierPurchasingOrgTextRequestBuilder.js.map