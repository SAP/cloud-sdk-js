import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntityEndsWithSomethingElse } from './TestEntityEndsWithSomethingElse';
/**
 * Request builder class for operations supported on the {@link TestEntityEndsWithSomethingElse} entity.
 */
export declare class TestEntityEndsWithSomethingElseRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntityEndsWithSomethingElse<T>, T> {
    /**
     * Returns a request builder for retrieving one `TestEntityEndsWithSomethingElse` entity based on its keys.
     * @param keyProperty Key property. See {@link TestEntityEndsWithSomethingElse.keyProperty}.
     * @returns A request builder for creating requests to retrieve one `TestEntityEndsWithSomethingElse` entity based on its keys.
     */
    getByKey(keyProperty: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>;
    /**
     * Returns a request builder for querying all `TestEntityEndsWithSomethingElse` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntityEndsWithSomethingElse` entities.
     */
    getAll(): GetAllRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>;
    /**
     * Returns a request builder for creating a `TestEntityEndsWithSomethingElse` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWithSomethingElse`.
     */
    create(entity: TestEntityEndsWithSomethingElse<T>): CreateRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `TestEntityEndsWithSomethingElse`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWithSomethingElse`.
     */
    update(entity: TestEntityEndsWithSomethingElse<T>): UpdateRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityEndsWithSomethingElse`.
     * @param keyProperty Key property. See {@link TestEntityEndsWithSomethingElse.keyProperty}.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWithSomethingElse`.
     */
    delete(keyProperty: string): DeleteRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityEndsWithSomethingElse`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWithSomethingElse` by taking the entity as a parameter.
     */
    delete(entity: TestEntityEndsWithSomethingElse<T>): DeleteRequestBuilder<TestEntityEndsWithSomethingElse<T>, T>;
}
//# sourceMappingURL=TestEntityEndsWithSomethingElseRequestBuilder.d.ts.map