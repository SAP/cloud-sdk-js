import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartnerBank } from './BusinessPartnerBank';
/**
 * Request builder class for operations supported on the [[BusinessPartnerBank]] entity.
 */
export declare class BusinessPartnerBankRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<BusinessPartnerBank<T>, T> {
    /**
     * Returns a request builder for retrieving one `BusinessPartnerBank` entity based on its keys.
     * @param businessPartner Key property. See [[BusinessPartnerBank.businessPartner]].
     * @param bankIdentification Key property. See [[BusinessPartnerBank.bankIdentification]].
     * @returns A request builder for creating requests to retrieve one `BusinessPartnerBank` entity based on its keys.
     */
    getByKey(businessPartner: DeserializedType<T, 'Edm.String'>, bankIdentification: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<BusinessPartnerBank<T>, T>;
    /**
     * Returns a request builder for querying all `BusinessPartnerBank` entities.
     * @returns A request builder for creating requests to retrieve all `BusinessPartnerBank` entities.
     */
    getAll(): GetAllRequestBuilder<BusinessPartnerBank<T>, T>;
    /**
     * Returns a request builder for creating a `BusinessPartnerBank` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `BusinessPartnerBank`.
     */
    create(entity: BusinessPartnerBank<T>): CreateRequestBuilder<BusinessPartnerBank<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `BusinessPartnerBank`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `BusinessPartnerBank`.
     */
    update(entity: BusinessPartnerBank<T>): UpdateRequestBuilder<BusinessPartnerBank<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `BusinessPartnerBank`.
     * @param businessPartner Key property. See [[BusinessPartnerBank.businessPartner]].
     * @param bankIdentification Key property. See [[BusinessPartnerBank.bankIdentification]].
     * @returns A request builder for creating requests that delete an entity of type `BusinessPartnerBank`.
     */
    delete(businessPartner: string, bankIdentification: string): DeleteRequestBuilder<BusinessPartnerBank<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `BusinessPartnerBank`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `BusinessPartnerBank` by taking the entity as a parameter.
     */
    delete(entity: BusinessPartnerBank<T>): DeleteRequestBuilder<BusinessPartnerBank<T>, T>;
}
// # sourceMappingURL=BusinessPartnerBankRequestBuilder.d.ts.map
