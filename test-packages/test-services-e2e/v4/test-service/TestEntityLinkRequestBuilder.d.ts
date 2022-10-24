import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntityLink } from './TestEntityLink';
/**
 * Request builder class for operations supported on the {@link TestEntityLink} entity.
 */
export declare class TestEntityLinkRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntityLink<T>, T> {
    /**
     * Returns a request builder for retrieving one `TestEntityLink` entity based on its keys.
     * @param keyTestEntityLink Key property. See {@link TestEntityLink.keyTestEntityLink}.
     * @param keyToTestEntity Key property. See {@link TestEntityLink.keyToTestEntity}.
     * @returns A request builder for creating requests to retrieve one `TestEntityLink` entity based on its keys.
     */
    getByKey(keyTestEntityLink: DeserializedType<T, 'Edm.Int32'>, keyToTestEntity: DeserializedType<T, 'Edm.Int32'>): GetByKeyRequestBuilder<TestEntityLink<T>, T>;
    /**
     * Returns a request builder for querying all `TestEntityLink` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntityLink` entities.
     */
    getAll(): GetAllRequestBuilder<TestEntityLink<T>, T>;
    /**
     * Returns a request builder for creating a `TestEntityLink` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntityLink`.
     */
    create(entity: TestEntityLink<T>): CreateRequestBuilder<TestEntityLink<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `TestEntityLink`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntityLink`.
     */
    update(entity: TestEntityLink<T>): UpdateRequestBuilder<TestEntityLink<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityLink`.
     * @param keyTestEntityLink Key property. See {@link TestEntityLink.keyTestEntityLink}.
     * @param keyToTestEntity Key property. See {@link TestEntityLink.keyToTestEntity}.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityLink`.
     */
    delete(keyTestEntityLink: number, keyToTestEntity: number): DeleteRequestBuilder<TestEntityLink<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityLink`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityLink` by taking the entity as a parameter.
     */
    delete(entity: TestEntityLink<T>): DeleteRequestBuilder<TestEntityLink<T>, T>;
}
//# sourceMappingURL=TestEntityLinkRequestBuilder.d.ts.map