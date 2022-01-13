import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, UpdateRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { Supplier } from './Supplier';
/**
 * Request builder class for operations supported on the [[Supplier]] entity.
 */
export declare class SupplierRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<Supplier<T>, T> {
    /**
     * Returns a request builder for retrieving one `Supplier` entity based on its keys.
     * @param supplier Key property. See [[Supplier.supplier]].
     * @returns A request builder for creating requests to retrieve one `Supplier` entity based on its keys.
     */
    getByKey(supplier: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<Supplier<T>, T>;
    /**
     * Returns a request builder for querying all `Supplier` entities.
     * @returns A request builder for creating requests to retrieve all `Supplier` entities.
     */
    getAll(): GetAllRequestBuilder<Supplier<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `Supplier`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `Supplier`.
     */
    update(entity: Supplier<T>): UpdateRequestBuilder<Supplier<T>, T>;
}
// # sourceMappingURL=SupplierRequestBuilder.d.ts.map
