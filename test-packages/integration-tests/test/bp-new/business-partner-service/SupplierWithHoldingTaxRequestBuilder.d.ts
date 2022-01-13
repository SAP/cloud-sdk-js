import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { SupplierWithHoldingTax } from './SupplierWithHoldingTax';
/**
 * Request builder class for operations supported on the [[SupplierWithHoldingTax]] entity.
 */
export declare class SupplierWithHoldingTaxRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<SupplierWithHoldingTax<T>, T> {
    /**
     * Returns a request builder for retrieving one `SupplierWithHoldingTax` entity based on its keys.
     * @param supplier Key property. See [[SupplierWithHoldingTax.supplier]].
     * @param companyCode Key property. See [[SupplierWithHoldingTax.companyCode]].
     * @param withholdingTaxType Key property. See [[SupplierWithHoldingTax.withholdingTaxType]].
     * @returns A request builder for creating requests to retrieve one `SupplierWithHoldingTax` entity based on its keys.
     */
    getByKey(supplier: DeserializedType<T, 'Edm.String'>, companyCode: DeserializedType<T, 'Edm.String'>, withholdingTaxType: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<SupplierWithHoldingTax<T>, T>;
    /**
     * Returns a request builder for querying all `SupplierWithHoldingTax` entities.
     * @returns A request builder for creating requests to retrieve all `SupplierWithHoldingTax` entities.
     */
    getAll(): GetAllRequestBuilder<SupplierWithHoldingTax<T>, T>;
    /**
     * Returns a request builder for creating a `SupplierWithHoldingTax` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `SupplierWithHoldingTax`.
     */
    create(entity: SupplierWithHoldingTax<T>): CreateRequestBuilder<SupplierWithHoldingTax<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `SupplierWithHoldingTax`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `SupplierWithHoldingTax`.
     */
    update(entity: SupplierWithHoldingTax<T>): UpdateRequestBuilder<SupplierWithHoldingTax<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `SupplierWithHoldingTax`.
     * @param supplier Key property. See [[SupplierWithHoldingTax.supplier]].
     * @param companyCode Key property. See [[SupplierWithHoldingTax.companyCode]].
     * @param withholdingTaxType Key property. See [[SupplierWithHoldingTax.withholdingTaxType]].
     * @returns A request builder for creating requests that delete an entity of type `SupplierWithHoldingTax`.
     */
    delete(supplier: string, companyCode: string, withholdingTaxType: string): DeleteRequestBuilder<SupplierWithHoldingTax<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `SupplierWithHoldingTax`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `SupplierWithHoldingTax` by taking the entity as a parameter.
     */
    delete(entity: SupplierWithHoldingTax<T>): DeleteRequestBuilder<SupplierWithHoldingTax<T>, T>;
}
// # sourceMappingURL=SupplierWithHoldingTaxRequestBuilder.d.ts.map
