import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntity3 } from './TestEntity3';
/**
 * Request builder class for operations supported on the {@link TestEntity3} entity.
 */
export declare class TestEntity3RequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntity3<T>, T> {
    /**
     * Returns a request builder for retrieving one `TestEntity3` entity based on its keys.
     * @param keyPropertyString Key property. See {@link TestEntity3.keyPropertyString}.
     * @returns A request builder for creating requests to retrieve one `TestEntity3` entity based on its keys.
     */
    getByKey(keyPropertyString: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<TestEntity3<T>, T>;
    /**
     * Returns a request builder for querying all `TestEntity3` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity3` entities.
     */
    getAll(): GetAllRequestBuilder<TestEntity3<T>, T>;
    /**
     * Returns a request builder for creating a `TestEntity3` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity3`.
     */
    create(entity: TestEntity3<T>): CreateRequestBuilder<TestEntity3<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `TestEntity3`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity3`.
     */
    update(entity: TestEntity3<T>): UpdateRequestBuilder<TestEntity3<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntity3`.
     * @param keyPropertyString Key property. See {@link TestEntity3.keyPropertyString}.
     * @returns A request builder for creating requests that delete an entity of type `TestEntity3`.
     */
    delete(keyPropertyString: string): DeleteRequestBuilder<TestEntity3<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntity3`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntity3` by taking the entity as a parameter.
     */
    delete(entity: TestEntity3<T>): DeleteRequestBuilder<TestEntity3<T>, T>;
}
//# sourceMappingURL=TestEntity3RequestBuilder.d.ts.map