import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerWithHoldingTax } from './CustomerWithHoldingTax';
/**
 * Request builder class for operations supported on the [[CustomerWithHoldingTax]] entity.
 */
export declare class CustomerWithHoldingTaxRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<CustomerWithHoldingTax<T>, T> {
    /**
     * Returns a request builder for retrieving one `CustomerWithHoldingTax` entity based on its keys.
     * @param customer Key property. See [[CustomerWithHoldingTax.customer]].
     * @param companyCode Key property. See [[CustomerWithHoldingTax.companyCode]].
     * @param withholdingTaxType Key property. See [[CustomerWithHoldingTax.withholdingTaxType]].
     * @returns A request builder for creating requests to retrieve one `CustomerWithHoldingTax` entity based on its keys.
     */
    getByKey(customer: DeserializedType<T, 'Edm.String'>, companyCode: DeserializedType<T, 'Edm.String'>, withholdingTaxType: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<CustomerWithHoldingTax<T>, T>;
    /**
     * Returns a request builder for querying all `CustomerWithHoldingTax` entities.
     * @returns A request builder for creating requests to retrieve all `CustomerWithHoldingTax` entities.
     */
    getAll(): GetAllRequestBuilder<CustomerWithHoldingTax<T>, T>;
    /**
     * Returns a request builder for creating a `CustomerWithHoldingTax` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CustomerWithHoldingTax`.
     */
    create(entity: CustomerWithHoldingTax<T>): CreateRequestBuilder<CustomerWithHoldingTax<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `CustomerWithHoldingTax`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CustomerWithHoldingTax`.
     */
    update(entity: CustomerWithHoldingTax<T>): UpdateRequestBuilder<CustomerWithHoldingTax<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `CustomerWithHoldingTax`.
     * @param customer Key property. See [[CustomerWithHoldingTax.customer]].
     * @param companyCode Key property. See [[CustomerWithHoldingTax.companyCode]].
     * @param withholdingTaxType Key property. See [[CustomerWithHoldingTax.withholdingTaxType]].
     * @returns A request builder for creating requests that delete an entity of type `CustomerWithHoldingTax`.
     */
    delete(customer: string, companyCode: string, withholdingTaxType: string): DeleteRequestBuilder<CustomerWithHoldingTax<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `CustomerWithHoldingTax`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `CustomerWithHoldingTax` by taking the entity as a parameter.
     */
    delete(entity: CustomerWithHoldingTax<T>): DeleteRequestBuilder<CustomerWithHoldingTax<T>, T>;
}
// # sourceMappingURL=CustomerWithHoldingTaxRequestBuilder.d.ts.map
