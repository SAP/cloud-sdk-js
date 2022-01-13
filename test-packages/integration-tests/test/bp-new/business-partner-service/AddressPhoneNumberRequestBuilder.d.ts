import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { AddressPhoneNumber } from './AddressPhoneNumber';
/**
 * Request builder class for operations supported on the [[AddressPhoneNumber]] entity.
 */
export declare class AddressPhoneNumberRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<AddressPhoneNumber<T>, T> {
    /**
     * Returns a request builder for retrieving one `AddressPhoneNumber` entity based on its keys.
     * @param addressId Key property. See [[AddressPhoneNumber.addressId]].
     * @param person Key property. See [[AddressPhoneNumber.person]].
     * @param ordinalNumber Key property. See [[AddressPhoneNumber.ordinalNumber]].
     * @returns A request builder for creating requests to retrieve one `AddressPhoneNumber` entity based on its keys.
     */
    getByKey(addressId: DeserializedType<T, 'Edm.String'>, person: DeserializedType<T, 'Edm.String'>, ordinalNumber: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<AddressPhoneNumber<T>, T>;
    /**
     * Returns a request builder for querying all `AddressPhoneNumber` entities.
     * @returns A request builder for creating requests to retrieve all `AddressPhoneNumber` entities.
     */
    getAll(): GetAllRequestBuilder<AddressPhoneNumber<T>, T>;
    /**
     * Returns a request builder for creating a `AddressPhoneNumber` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `AddressPhoneNumber`.
     */
    create(entity: AddressPhoneNumber<T>): CreateRequestBuilder<AddressPhoneNumber<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `AddressPhoneNumber`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `AddressPhoneNumber`.
     */
    update(entity: AddressPhoneNumber<T>): UpdateRequestBuilder<AddressPhoneNumber<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `AddressPhoneNumber`.
     * @param addressId Key property. See [[AddressPhoneNumber.addressId]].
     * @param person Key property. See [[AddressPhoneNumber.person]].
     * @param ordinalNumber Key property. See [[AddressPhoneNumber.ordinalNumber]].
     * @returns A request builder for creating requests that delete an entity of type `AddressPhoneNumber`.
     */
    delete(addressId: string, person: string, ordinalNumber: string): DeleteRequestBuilder<AddressPhoneNumber<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `AddressPhoneNumber`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `AddressPhoneNumber` by taking the entity as a parameter.
     */
    delete(entity: AddressPhoneNumber<T>): DeleteRequestBuilder<AddressPhoneNumber<T>, T>;
}
// # sourceMappingURL=AddressPhoneNumberRequestBuilder.d.ts.map
