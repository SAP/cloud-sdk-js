import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntity2 } from './TestEntity2';
/**
 * Request builder class for operations supported on the {@link TestEntity2} entity.
 */
export declare class TestEntity2RequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntity2<T>, T> {
    /**
     * Returns a request builder for retrieving one `TestEntity2` entity based on its keys.
     * @param keyPropertyString Key property. See {@link TestEntity2.keyPropertyString}.
     * @returns A request builder for creating requests to retrieve one `TestEntity2` entity based on its keys.
     */
    getByKey(keyPropertyString: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<TestEntity2<T>, T>;
    /**
     * Returns a request builder for querying all `TestEntity2` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity2` entities.
     */
    getAll(): GetAllRequestBuilder<TestEntity2<T>, T>;
    /**
     * Returns a request builder for creating a `TestEntity2` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity2`.
     */
    create(entity: TestEntity2<T>): CreateRequestBuilder<TestEntity2<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `TestEntity2`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity2`.
     */
    update(entity: TestEntity2<T>): UpdateRequestBuilder<TestEntity2<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntity2`.
     * @param keyPropertyString Key property. See {@link TestEntity2.keyPropertyString}.
     * @returns A request builder for creating requests that delete an entity of type `TestEntity2`.
     */
    delete(keyPropertyString: string): DeleteRequestBuilder<TestEntity2<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntity2`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntity2` by taking the entity as a parameter.
     */
    delete(entity: TestEntity2<T>): DeleteRequestBuilder<TestEntity2<T>, T>;
}
//# sourceMappingURL=TestEntity2RequestBuilder.d.ts.map