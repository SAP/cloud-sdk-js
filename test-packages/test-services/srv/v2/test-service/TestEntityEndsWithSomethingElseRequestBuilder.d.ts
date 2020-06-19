import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder } from '@sap-cloud-sdk/core';
import { TestEntityEndsWithSomethingElse } from './TestEntityEndsWithSomethingElse';
/**
 * Request builder class for operations supported on the [[TestEntityEndsWithSomethingElse]] entity.
 */
export declare class TestEntityEndsWithSomethingElseRequestBuilder extends RequestBuilder<TestEntityEndsWithSomethingElse> {
    /**
     * Returns a request builder for retrieving one `TestEntityEndsWithSomethingElse` entity based on its keys.
     * @param keyProperty Key property. See [[TestEntityEndsWithSomethingElse.keyProperty]].
     * @returns A request builder for creating requests to retrieve one `TestEntityEndsWithSomethingElse` entity based on its keys.
     */
    getByKey(keyProperty: string): GetByKeyRequestBuilder<TestEntityEndsWithSomethingElse>;
    /**
     * Returns a request builder for querying all `TestEntityEndsWithSomethingElse` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntityEndsWithSomethingElse` entities.
     */
    getAll(): GetAllRequestBuilder<TestEntityEndsWithSomethingElse>;
    /**
     * Returns a request builder for creating a `TestEntityEndsWithSomethingElse` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWithSomethingElse`.
     */
    create(entity: TestEntityEndsWithSomethingElse): CreateRequestBuilder<TestEntityEndsWithSomethingElse>;
    /**
     * Returns a request builder for updating an entity of type `TestEntityEndsWithSomethingElse`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWithSomethingElse`.
     */
    update(entity: TestEntityEndsWithSomethingElse): UpdateRequestBuilder<TestEntityEndsWithSomethingElse>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityEndsWithSomethingElse`.
     * @param keyProperty Key property. See [[TestEntityEndsWithSomethingElse.keyProperty]].
     * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWithSomethingElse`.
     */
    delete(keyProperty: string): DeleteRequestBuilder<TestEntityEndsWithSomethingElse>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityEndsWithSomethingElse`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWithSomethingElse` by taking the entity as a parameter.
     */
    delete(entity: TestEntityEndsWithSomethingElse): DeleteRequestBuilder<TestEntityEndsWithSomethingElse>;
}
//# sourceMappingURL=TestEntityEndsWithSomethingElseRequestBuilder.d.ts.map