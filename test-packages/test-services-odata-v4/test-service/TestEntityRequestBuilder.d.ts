import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntity } from './TestEntity';
/**
 * Request builder class for operations supported on the {@link TestEntity} entity.
 */
export declare class TestEntityRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntity<T>, T> {
    /**
     * Returns a request builder for retrieving one `TestEntity` entity based on its keys.
     * @param keyPropertyGuid Key property. See {@link TestEntity.keyPropertyGuid}.
     * @param keyPropertyString Key property. See {@link TestEntity.keyPropertyString}.
     * @returns A request builder for creating requests to retrieve one `TestEntity` entity based on its keys.
     */
    getByKey(keyPropertyGuid: DeserializedType<T, 'Edm.Guid'>, keyPropertyString: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<TestEntity<T>, T>;
    /**
     * Returns a request builder for querying all `TestEntity` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity` entities.
     */
    getAll(): GetAllRequestBuilder<TestEntity<T>, T>;
    /**
     * Returns a request builder for creating a `TestEntity` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity`.
     */
    create(entity: TestEntity<T>): CreateRequestBuilder<TestEntity<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `TestEntity`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity`.
     */
    update(entity: TestEntity<T>): UpdateRequestBuilder<TestEntity<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntity`.
     * @param keyPropertyGuid Key property. See {@link TestEntity.keyPropertyGuid}.
     * @param keyPropertyString Key property. See {@link TestEntity.keyPropertyString}.
     * @returns A request builder for creating requests that delete an entity of type `TestEntity`.
     */
    delete(keyPropertyGuid: string, keyPropertyString: string): DeleteRequestBuilder<TestEntity<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntity`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntity` by taking the entity as a parameter.
     */
    delete(entity: TestEntity<T>): DeleteRequestBuilder<TestEntity<T>, T>;
}
//# sourceMappingURL=TestEntityRequestBuilder.d.ts.map