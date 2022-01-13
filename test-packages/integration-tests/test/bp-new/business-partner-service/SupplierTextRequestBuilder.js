"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierTextRequestBuilder = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const SupplierText_1 = require("./SupplierText");
/**
 * Request builder class for operations supported on the [[SupplierText]] entity.
 */
class SupplierTextRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for retrieving one `SupplierText` entity based on its keys.
     * @param supplier Key property. See [[SupplierText.supplier]].
     * @param language Key property. See [[SupplierText.language]].
     * @param longTextId Key property. See [[SupplierText.longTextId]].
     * @returns A request builder for creating requests to retrieve one `SupplierText` entity based on its keys.
     */
    getByKey(supplier, language, longTextId) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            Supplier: supplier,
            Language: language,
            LongTextID: longTextId
        });
    }
    /**
     * Returns a request builder for querying all `SupplierText` entities.
     * @returns A request builder for creating requests to retrieve all `SupplierText` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `SupplierText` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SupplierText`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for updating an entity of type `SupplierText`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SupplierText`.
     */
    update(entity) {
        return new odata_v2_1.UpdateRequestBuilder(this.entityApi, entity);
    }
    delete(supplierOrEntity, language, longTextId) {
        return new odata_v2_1.DeleteRequestBuilder(this.entityApi, supplierOrEntity instanceof SupplierText_1.SupplierText ? supplierOrEntity : {
            Supplier: supplierOrEntity,
            Language: language,
            LongTextID: longTextId
        });
    }
}
exports.SupplierTextRequestBuilder = SupplierTextRequestBuilder;
//# sourceMappingURL=SupplierTextRequestBuilder.js.map