import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntitySingleLink } from './TestEntitySingleLink';
/**
 * Request builder class for operations supported on the {@link TestEntitySingleLink} entity.
 */
export declare class TestEntitySingleLinkRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntitySingleLink<T>, T> {
    /**
     * Returns a request builder for retrieving one `TestEntitySingleLink` entity based on its keys.
     * @param keyProperty Key property. See {@link TestEntitySingleLink.keyProperty}.
     * @returns A request builder for creating requests to retrieve one `TestEntitySingleLink` entity based on its keys.
     */
    getByKey(keyProperty: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<TestEntitySingleLink<T>, T>;
    /**
     * Returns a request builder for querying all `TestEntitySingleLink` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntitySingleLink` entities.
     */
    getAll(): GetAllRequestBuilder<TestEntitySingleLink<T>, T>;
    /**
     * Returns a request builder for creating a `TestEntitySingleLink` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntitySingleLink`.
     */
    create(entity: TestEntitySingleLink<T>): CreateRequestBuilder<TestEntitySingleLink<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `TestEntitySingleLink`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntitySingleLink`.
     */
    update(entity: TestEntitySingleLink<T>): UpdateRequestBuilder<TestEntitySingleLink<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntitySingleLink`.
     * @param keyProperty Key property. See {@link TestEntitySingleLink.keyProperty}.
     * @returns A request builder for creating requests that delete an entity of type `TestEntitySingleLink`.
     */
    delete(keyProperty: string): DeleteRequestBuilder<TestEntitySingleLink<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntitySingleLink`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntitySingleLink` by taking the entity as a parameter.
     */
    delete(entity: TestEntitySingleLink<T>): DeleteRequestBuilder<TestEntitySingleLink<T>, T>;
}
//# sourceMappingURL=TestEntitySingleLinkRequestBuilder.d.ts.map