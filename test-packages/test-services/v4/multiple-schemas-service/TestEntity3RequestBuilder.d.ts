import { RequestBuilder, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, CreateRequestBuilderV4, UpdateRequestBuilderV4, DeleteRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntity3 } from './TestEntity3';
/**
 * Request builder class for operations supported on the [[TestEntity3]] entity.
 */
export declare class TestEntity3RequestBuilder extends RequestBuilder<TestEntity3> {
    /**
     * Returns a request builder for retrieving one `TestEntity3` entity based on its keys.
     * @param keyPropertyString Key property. See [[TestEntity3.keyPropertyString]].
     * @returns A request builder for creating requests to retrieve one `TestEntity3` entity based on its keys.
     */
    getByKey(keyPropertyString: string): GetByKeyRequestBuilderV4<TestEntity3>;
    /**
     * Returns a request builder for querying all `TestEntity3` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity3` entities.
     */
    getAll(): GetAllRequestBuilderV4<TestEntity3>;
    /**
     * Returns a request builder for creating a `TestEntity3` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity3`.
     */
    create(entity: TestEntity3): CreateRequestBuilderV4<TestEntity3>;
    /**
     * Returns a request builder for updating an entity of type `TestEntity3`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity3`.
     */
    update(entity: TestEntity3): UpdateRequestBuilderV4<TestEntity3>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntity3`.
     * @param keyPropertyString Key property. See [[TestEntity3.keyPropertyString]].
     * @returns A request builder for creating requests that delete an entity of type `TestEntity3`.
     */
    delete(keyPropertyString: string): DeleteRequestBuilderV4<TestEntity3>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntity3`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntity3` by taking the entity as a parameter.
     */
    delete(entity: TestEntity3): DeleteRequestBuilderV4<TestEntity3>;
}
//# sourceMappingURL=TestEntity3RequestBuilder.d.ts.map