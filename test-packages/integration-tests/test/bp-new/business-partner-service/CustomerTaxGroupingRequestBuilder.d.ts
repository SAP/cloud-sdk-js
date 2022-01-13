import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerTaxGrouping } from './CustomerTaxGrouping';
/**
 * Request builder class for operations supported on the [[CustomerTaxGrouping]] entity.
 */
export declare class CustomerTaxGroupingRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<CustomerTaxGrouping<T>, T> {
    /**
     * Returns a request builder for retrieving one `CustomerTaxGrouping` entity based on its keys.
     * @param customer Key property. See [[CustomerTaxGrouping.customer]].
     * @param customerTaxGroupingCode Key property. See [[CustomerTaxGrouping.customerTaxGroupingCode]].
     * @returns A request builder for creating requests to retrieve one `CustomerTaxGrouping` entity based on its keys.
     */
    getByKey(customer: DeserializedType<T, 'Edm.String'>, customerTaxGroupingCode: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<CustomerTaxGrouping<T>, T>;
    /**
     * Returns a request builder for querying all `CustomerTaxGrouping` entities.
     * @returns A request builder for creating requests to retrieve all `CustomerTaxGrouping` entities.
     */
    getAll(): GetAllRequestBuilder<CustomerTaxGrouping<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `CustomerTaxGrouping`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CustomerTaxGrouping`.
     */
    update(entity: CustomerTaxGrouping<T>): UpdateRequestBuilder<CustomerTaxGrouping<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `CustomerTaxGrouping`.
     * @param customer Key property. See [[CustomerTaxGrouping.customer]].
     * @param customerTaxGroupingCode Key property. See [[CustomerTaxGrouping.customerTaxGroupingCode]].
     * @returns A request builder for creating requests that delete an entity of type `CustomerTaxGrouping`.
     */
    delete(customer: string, customerTaxGroupingCode: string): DeleteRequestBuilder<CustomerTaxGrouping<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `CustomerTaxGrouping`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `CustomerTaxGrouping` by taking the entity as a parameter.
     */
    delete(entity: CustomerTaxGrouping<T>): DeleteRequestBuilder<CustomerTaxGrouping<T>, T>;
}
// # sourceMappingURL=CustomerTaxGroupingRequestBuilder.d.ts.map
