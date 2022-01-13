import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { SupplierDunning } from './SupplierDunning';
/**
 * Request builder class for operations supported on the [[SupplierDunning]] entity.
 */
export declare class SupplierDunningRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<SupplierDunning<T>, T> {
    /**
     * Returns a request builder for retrieving one `SupplierDunning` entity based on its keys.
     * @param supplier Key property. See [[SupplierDunning.supplier]].
     * @param companyCode Key property. See [[SupplierDunning.companyCode]].
     * @param dunningArea Key property. See [[SupplierDunning.dunningArea]].
     * @returns A request builder for creating requests to retrieve one `SupplierDunning` entity based on its keys.
     */
    getByKey(supplier: DeserializedType<T, 'Edm.String'>, companyCode: DeserializedType<T, 'Edm.String'>, dunningArea: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<SupplierDunning<T>, T>;
    /**
     * Returns a request builder for querying all `SupplierDunning` entities.
     * @returns A request builder for creating requests to retrieve all `SupplierDunning` entities.
     */
    getAll(): GetAllRequestBuilder<SupplierDunning<T>, T>;
    /**
     * Returns a request builder for creating a `SupplierDunning` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SupplierDunning`.
     */
    create(entity: SupplierDunning<T>): CreateRequestBuilder<SupplierDunning<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `SupplierDunning`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SupplierDunning`.
     */
    update(entity: SupplierDunning<T>): UpdateRequestBuilder<SupplierDunning<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `SupplierDunning`.
     * @param supplier Key property. See [[SupplierDunning.supplier]].
     * @param companyCode Key property. See [[SupplierDunning.companyCode]].
     * @param dunningArea Key property. See [[SupplierDunning.dunningArea]].
     * @returns A request builder for creating requests that delete an entity of type `SupplierDunning`.
     */
    delete(supplier: string, companyCode: string, dunningArea: string): DeleteRequestBuilder<SupplierDunning<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `SupplierDunning`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `SupplierDunning` by taking the entity as a parameter.
     */
    delete(entity: SupplierDunning<T>): DeleteRequestBuilder<SupplierDunning<T>, T>;
}
// # sourceMappingURL=SupplierDunningRequestBuilder.d.ts.map
