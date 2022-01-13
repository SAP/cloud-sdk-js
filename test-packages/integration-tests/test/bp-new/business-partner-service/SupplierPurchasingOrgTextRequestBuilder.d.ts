import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { SupplierPurchasingOrgText } from './SupplierPurchasingOrgText';
/**
 * Request builder class for operations supported on the [[SupplierPurchasingOrgText]] entity.
 */
export declare class SupplierPurchasingOrgTextRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<SupplierPurchasingOrgText<T>, T> {
    /**
     * Returns a request builder for retrieving one `SupplierPurchasingOrgText` entity based on its keys.
     * @param supplier Key property. See [[SupplierPurchasingOrgText.supplier]].
     * @param purchasingOrganization Key property. See [[SupplierPurchasingOrgText.purchasingOrganization]].
     * @param language Key property. See [[SupplierPurchasingOrgText.language]].
     * @param longTextId Key property. See [[SupplierPurchasingOrgText.longTextId]].
     * @returns A request builder for creating requests to retrieve one `SupplierPurchasingOrgText` entity based on its keys.
     */
    getByKey(supplier: DeserializedType<T, 'Edm.String'>, purchasingOrganization: DeserializedType<T, 'Edm.String'>, language: DeserializedType<T, 'Edm.String'>, longTextId: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<SupplierPurchasingOrgText<T>, T>;
    /**
     * Returns a request builder for querying all `SupplierPurchasingOrgText` entities.
     * @returns A request builder for creating requests to retrieve all `SupplierPurchasingOrgText` entities.
     */
    getAll(): GetAllRequestBuilder<SupplierPurchasingOrgText<T>, T>;
    /**
     * Returns a request builder for creating a `SupplierPurchasingOrgText` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SupplierPurchasingOrgText`.
     */
    create(entity: SupplierPurchasingOrgText<T>): CreateRequestBuilder<SupplierPurchasingOrgText<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `SupplierPurchasingOrgText`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SupplierPurchasingOrgText`.
     */
    update(entity: SupplierPurchasingOrgText<T>): UpdateRequestBuilder<SupplierPurchasingOrgText<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `SupplierPurchasingOrgText`.
     * @param supplier Key property. See [[SupplierPurchasingOrgText.supplier]].
     * @param purchasingOrganization Key property. See [[SupplierPurchasingOrgText.purchasingOrganization]].
     * @param language Key property. See [[SupplierPurchasingOrgText.language]].
     * @param longTextId Key property. See [[SupplierPurchasingOrgText.longTextId]].
     * @returns A request builder for creating requests that delete an entity of type `SupplierPurchasingOrgText`.
     */
    delete(supplier: string, purchasingOrganization: string, language: string, longTextId: string): DeleteRequestBuilder<SupplierPurchasingOrgText<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `SupplierPurchasingOrgText`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `SupplierPurchasingOrgText` by taking the entity as a parameter.
     */
    delete(entity: SupplierPurchasingOrgText<T>): DeleteRequestBuilder<SupplierPurchasingOrgText<T>, T>;
}
// # sourceMappingURL=SupplierPurchasingOrgTextRequestBuilder.d.ts.map
