import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerCompanyText } from './CustomerCompanyText';
/**
 * Request builder class for operations supported on the [[CustomerCompanyText]] entity.
 */
export declare class CustomerCompanyTextRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<CustomerCompanyText<T>, T> {
    /**
     * Returns a request builder for retrieving one `CustomerCompanyText` entity based on its keys.
     * @param customer Key property. See [[CustomerCompanyText.customer]].
     * @param companyCode Key property. See [[CustomerCompanyText.companyCode]].
     * @param language Key property. See [[CustomerCompanyText.language]].
     * @param longTextId Key property. See [[CustomerCompanyText.longTextId]].
     * @returns A request builder for creating requests to retrieve one `CustomerCompanyText` entity based on its keys.
     */
    getByKey(customer: DeserializedType<T, 'Edm.String'>, companyCode: DeserializedType<T, 'Edm.String'>, language: DeserializedType<T, 'Edm.String'>, longTextId: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<CustomerCompanyText<T>, T>;
    /**
     * Returns a request builder for querying all `CustomerCompanyText` entities.
     * @returns A request builder for creating requests to retrieve all `CustomerCompanyText` entities.
     */
    getAll(): GetAllRequestBuilder<CustomerCompanyText<T>, T>;
    /**
     * Returns a request builder for creating a `CustomerCompanyText` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CustomerCompanyText`.
     */
    create(entity: CustomerCompanyText<T>): CreateRequestBuilder<CustomerCompanyText<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `CustomerCompanyText`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CustomerCompanyText`.
     */
    update(entity: CustomerCompanyText<T>): UpdateRequestBuilder<CustomerCompanyText<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `CustomerCompanyText`.
     * @param customer Key property. See [[CustomerCompanyText.customer]].
     * @param companyCode Key property. See [[CustomerCompanyText.companyCode]].
     * @param language Key property. See [[CustomerCompanyText.language]].
     * @param longTextId Key property. See [[CustomerCompanyText.longTextId]].
     * @returns A request builder for creating requests that delete an entity of type `CustomerCompanyText`.
     */
    delete(customer: string, companyCode: string, language: string, longTextId: string): DeleteRequestBuilder<CustomerCompanyText<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `CustomerCompanyText`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `CustomerCompanyText` by taking the entity as a parameter.
     */
    delete(entity: CustomerCompanyText<T>): DeleteRequestBuilder<CustomerCompanyText<T>, T>;
}
// # sourceMappingURL=CustomerCompanyTextRequestBuilder.d.ts.map
