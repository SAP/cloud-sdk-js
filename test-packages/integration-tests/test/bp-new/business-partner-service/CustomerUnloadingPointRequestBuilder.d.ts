import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerUnloadingPoint } from './CustomerUnloadingPoint';
/**
 * Request builder class for operations supported on the [[CustomerUnloadingPoint]] entity.
 */
export declare class CustomerUnloadingPointRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<CustomerUnloadingPoint<T>, T> {
    /**
     * Returns a request builder for retrieving one `CustomerUnloadingPoint` entity based on its keys.
     * @param customer Key property. See [[CustomerUnloadingPoint.customer]].
     * @param unloadingPointName Key property. See [[CustomerUnloadingPoint.unloadingPointName]].
     * @returns A request builder for creating requests to retrieve one `CustomerUnloadingPoint` entity based on its keys.
     */
    getByKey(customer: DeserializedType<T, 'Edm.String'>, unloadingPointName: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<CustomerUnloadingPoint<T>, T>;
    /**
     * Returns a request builder for querying all `CustomerUnloadingPoint` entities.
     * @returns A request builder for creating requests to retrieve all `CustomerUnloadingPoint` entities.
     */
    getAll(): GetAllRequestBuilder<CustomerUnloadingPoint<T>, T>;
    /**
     * Returns a request builder for creating a `CustomerUnloadingPoint` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CustomerUnloadingPoint`.
     */
    create(entity: CustomerUnloadingPoint<T>): CreateRequestBuilder<CustomerUnloadingPoint<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `CustomerUnloadingPoint`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CustomerUnloadingPoint`.
     */
    update(entity: CustomerUnloadingPoint<T>): UpdateRequestBuilder<CustomerUnloadingPoint<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `CustomerUnloadingPoint`.
     * @param customer Key property. See [[CustomerUnloadingPoint.customer]].
     * @param unloadingPointName Key property. See [[CustomerUnloadingPoint.unloadingPointName]].
     * @returns A request builder for creating requests that delete an entity of type `CustomerUnloadingPoint`.
     */
    delete(customer: string, unloadingPointName: string): DeleteRequestBuilder<CustomerUnloadingPoint<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `CustomerUnloadingPoint`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `CustomerUnloadingPoint` by taking the entity as a parameter.
     */
    delete(entity: CustomerUnloadingPoint<T>): DeleteRequestBuilder<CustomerUnloadingPoint<T>, T>;
}
// # sourceMappingURL=CustomerUnloadingPointRequestBuilder.d.ts.map
