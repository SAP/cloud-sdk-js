import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { BpContactToAddress } from './BpContactToAddress';
/**
 * Request builder class for operations supported on the [[BpContactToAddress]] entity.
 */
export declare class BpContactToAddressRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<BpContactToAddress<T>, T> {
    /**
     * Returns a request builder for retrieving one `BpContactToAddress` entity based on its keys.
     * @param relationshipNumber Key property. See [[BpContactToAddress.relationshipNumber]].
     * @param businessPartnerCompany Key property. See [[BpContactToAddress.businessPartnerCompany]].
     * @param businessPartnerPerson Key property. See [[BpContactToAddress.businessPartnerPerson]].
     * @param validityEndDate Key property. See [[BpContactToAddress.validityEndDate]].
     * @param addressId Key property. See [[BpContactToAddress.addressId]].
     * @returns A request builder for creating requests to retrieve one `BpContactToAddress` entity based on its keys.
     */
    getByKey(relationshipNumber: DeserializedType<T, 'Edm.String'>, businessPartnerCompany: DeserializedType<T, 'Edm.String'>, businessPartnerPerson: DeserializedType<T, 'Edm.String'>, validityEndDate: DeserializedType<T, 'Edm.DateTime'>, addressId: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<BpContactToAddress<T>, T>;
    /**
     * Returns a request builder for querying all `BpContactToAddress` entities.
     * @returns A request builder for creating requests to retrieve all `BpContactToAddress` entities.
     */
    getAll(): GetAllRequestBuilder<BpContactToAddress<T>, T>;
}
// # sourceMappingURL=BpContactToAddressRequestBuilder.d.ts.map
