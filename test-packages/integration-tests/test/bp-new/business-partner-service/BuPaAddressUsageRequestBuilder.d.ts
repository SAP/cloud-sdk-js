import { Moment } from 'moment';
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { BuPaAddressUsage } from './BuPaAddressUsage';
/**
 * Request builder class for operations supported on the [[BuPaAddressUsage]] entity.
 */
export declare class BuPaAddressUsageRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<BuPaAddressUsage<T>, T> {
    /**
     * Returns a request builder for retrieving one `BuPaAddressUsage` entity based on its keys.
     * @param businessPartner Key property. See [[BuPaAddressUsage.businessPartner]].
     * @param validityEndDate Key property. See [[BuPaAddressUsage.validityEndDate]].
     * @param addressUsage Key property. See [[BuPaAddressUsage.addressUsage]].
     * @param addressId Key property. See [[BuPaAddressUsage.addressId]].
     * @returns A request builder for creating requests to retrieve one `BuPaAddressUsage` entity based on its keys.
     */
    getByKey(businessPartner: DeserializedType<T, 'Edm.String'>, validityEndDate: DeserializedType<T, 'Edm.DateTimeOffset'>, addressUsage: DeserializedType<T, 'Edm.String'>, addressId: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<BuPaAddressUsage<T>, T>;
    /**
     * Returns a request builder for querying all `BuPaAddressUsage` entities.
     * @returns A request builder for creating requests to retrieve all `BuPaAddressUsage` entities.
     */
    getAll(): GetAllRequestBuilder<BuPaAddressUsage<T>, T>;
    /**
     * Returns a request builder for creating a `BuPaAddressUsage` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `BuPaAddressUsage`.
     */
    create(entity: BuPaAddressUsage<T>): CreateRequestBuilder<BuPaAddressUsage<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `BuPaAddressUsage`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `BuPaAddressUsage`.
     */
    update(entity: BuPaAddressUsage<T>): UpdateRequestBuilder<BuPaAddressUsage<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `BuPaAddressUsage`.
     * @param businessPartner Key property. See [[BuPaAddressUsage.businessPartner]].
     * @param validityEndDate Key property. See [[BuPaAddressUsage.validityEndDate]].
     * @param addressUsage Key property. See [[BuPaAddressUsage.addressUsage]].
     * @param addressId Key property. See [[BuPaAddressUsage.addressId]].
     * @returns A request builder for creating requests that delete an entity of type `BuPaAddressUsage`.
     */
    delete(businessPartner: string, validityEndDate: Moment, addressUsage: string, addressId: string): DeleteRequestBuilder<BuPaAddressUsage<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `BuPaAddressUsage`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `BuPaAddressUsage` by taking the entity as a parameter.
     */
    delete(entity: BuPaAddressUsage<T>): DeleteRequestBuilder<BuPaAddressUsage<T>, T>;
}
// # sourceMappingURL=BuPaAddressUsageRequestBuilder.d.ts.map
