import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntity100Col } from './TestEntity100Col';
/**
 * Request builder class for operations supported on the [[TestEntity100Col]] entity.
 */
export declare class TestEntity100ColRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntity100Col<T>, T> {
    /**
     * Returns a request builder for retrieving one `TestEntity100Col` entity based on its keys.
     * @param keyTestEntity100Col Key property. See [[TestEntity100Col.keyTestEntity100Col]].
     * @returns A request builder for creating requests to retrieve one `TestEntity100Col` entity based on its keys.
     */
    getByKey(keyTestEntity100Col: DeserializedType<T, 'Edm.Int32'>): GetByKeyRequestBuilder<TestEntity100Col<T>, T>;
    /**
     * Returns a request builder for querying all `TestEntity100Col` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity100Col` entities.
     */
    getAll(): GetAllRequestBuilder<TestEntity100Col<T>, T>;
    /**
     * Returns a request builder for creating a `TestEntity100Col` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity100Col`.
     */
    create(entity: TestEntity100Col<T>): CreateRequestBuilder<TestEntity100Col<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `TestEntity100Col`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity100Col`.
     */
    update(entity: TestEntity100Col<T>): UpdateRequestBuilder<TestEntity100Col<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntity100Col`.
     * @param keyTestEntity100Col Key property. See [[TestEntity100Col.keyTestEntity100Col]].
     * @returns A request builder for creating requests that delete an entity of type `TestEntity100Col`.
     */
    delete(keyTestEntity100Col: number): DeleteRequestBuilder<TestEntity100Col<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntity100Col`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntity100Col` by taking the entity as a parameter.
     */
    delete(entity: TestEntity100Col<T>): DeleteRequestBuilder<TestEntity100Col<T>, T>;
}
//# sourceMappingURL=TestEntity100ColRequestBuilder.d.ts.map