"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierPurchasingOrgRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the [[SupplierPurchasingOrg]] entity.
 */
class SupplierPurchasingOrgRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `SupplierPurchasingOrg` entity based on its keys.
     * @param supplier Key property. See [[SupplierPurchasingOrg.supplier]].
     * @param purchasingOrganization Key property. See [[SupplierPurchasingOrg.purchasingOrganization]].
     * @returns A request builder for creating requests to retrieve one `SupplierPurchasingOrg` entity based on its keys.
     */
    getByKey(supplier, purchasingOrganization) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            Supplier: supplier,
            PurchasingOrganization: purchasingOrganization
        });
    }
    /**
     * Returns a request builder for querying all `SupplierPurchasingOrg` entities.
     * @returns A request builder for creating requests to retrieve all `SupplierPurchasingOrg` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `SupplierPurchasingOrg` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SupplierPurchasingOrg`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `SupplierPurchasingOrg`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SupplierPurchasingOrg`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
}
exports.SupplierPurchasingOrgRequestBuilder = SupplierPurchasingOrgRequestBuilder;
//# sourceMappingURL=SupplierPurchasingOrgRequestBuilder.js.map