import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerSalesAreaTax } from './CustomerSalesAreaTax';
/**
 * Request builder class for operations supported on the [[CustomerSalesAreaTax]] entity.
 */
export declare class CustomerSalesAreaTaxRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<CustomerSalesAreaTax<T>, T> {
    /**
     * Returns a request builder for retrieving one `CustomerSalesAreaTax` entity based on its keys.
     * @param customer Key property. See [[CustomerSalesAreaTax.customer]].
     * @param salesOrganization Key property. See [[CustomerSalesAreaTax.salesOrganization]].
     * @param distributionChannel Key property. See [[CustomerSalesAreaTax.distributionChannel]].
     * @param division Key property. See [[CustomerSalesAreaTax.division]].
     * @param departureCountry Key property. See [[CustomerSalesAreaTax.departureCountry]].
     * @param customerTaxCategory Key property. See [[CustomerSalesAreaTax.customerTaxCategory]].
     * @returns A request builder for creating requests to retrieve one `CustomerSalesAreaTax` entity based on its keys.
     */
    getByKey(customer: DeserializedType<T, 'Edm.String'>, salesOrganization: DeserializedType<T, 'Edm.String'>, distributionChannel: DeserializedType<T, 'Edm.String'>, division: DeserializedType<T, 'Edm.String'>, departureCountry: DeserializedType<T, 'Edm.String'>, customerTaxCategory: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<CustomerSalesAreaTax<T>, T>;
    /**
     * Returns a request builder for querying all `CustomerSalesAreaTax` entities.
     * @returns A request builder for creating requests to retrieve all `CustomerSalesAreaTax` entities.
     */
    getAll(): GetAllRequestBuilder<CustomerSalesAreaTax<T>, T>;
    /**
     * Returns a request builder for creating a `CustomerSalesAreaTax` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CustomerSalesAreaTax`.
     */
    create(entity: CustomerSalesAreaTax<T>): CreateRequestBuilder<CustomerSalesAreaTax<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `CustomerSalesAreaTax`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CustomerSalesAreaTax`.
     */
    update(entity: CustomerSalesAreaTax<T>): UpdateRequestBuilder<CustomerSalesAreaTax<T>, T>;
}
// # sourceMappingURL=CustomerSalesAreaTaxRequestBuilder.d.ts.map
