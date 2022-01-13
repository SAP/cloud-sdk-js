import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, UpdateRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { Customer } from './Customer';
/**
 * Request builder class for operations supported on the [[Customer]] entity.
 */
export declare class CustomerRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<Customer<T>, T> {
    /**
     * Returns a request builder for retrieving one `Customer` entity based on its keys.
     * @param customer Key property. See [[Customer.customer]].
     * @returns A request builder for creating requests to retrieve one `Customer` entity based on its keys.
     */
    getByKey(customer: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<Customer<T>, T>;
    /**
     * Returns a request builder for querying all `Customer` entities.
     * @returns A request builder for creating requests to retrieve all `Customer` entities.
     */
    getAll(): GetAllRequestBuilder<Customer<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `Customer`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `Customer`.
     */
    update(entity: Customer<T>): UpdateRequestBuilder<Customer<T>, T>;
}
// # sourceMappingURL=CustomerRequestBuilder.d.ts.map
