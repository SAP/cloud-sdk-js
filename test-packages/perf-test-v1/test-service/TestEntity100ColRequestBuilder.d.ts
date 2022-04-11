import { RequestBuilder, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, CreateRequestBuilderV4, UpdateRequestBuilderV4, DeleteRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntity100Col } from './TestEntity100Col';
/**
 * Request builder class for operations supported on the [[TestEntity100Col]] entity.
 */
export declare class TestEntity100ColRequestBuilder extends RequestBuilder<TestEntity100Col> {
    /**
     * Returns a request builder for retrieving one `TestEntity100Col` entity based on its keys.
     * @param keyTestEntity100Col Key property. See [[TestEntity100Col.keyTestEntity100Col]].
     * @returns A request builder for creating requests to retrieve one `TestEntity100Col` entity based on its keys.
     */
    getByKey(keyTestEntity100Col: number): GetByKeyRequestBuilderV4<TestEntity100Col>;
    /**
     * Returns a request builder for querying all `TestEntity100Col` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntity100Col` entities.
     */
    getAll(): GetAllRequestBuilderV4<TestEntity100Col>;
    /**
     * Returns a request builder for creating a `TestEntity100Col` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntity100Col`.
     */
    create(entity: TestEntity100Col): CreateRequestBuilderV4<TestEntity100Col>;
    /**
     * Returns a request builder for updating an entity of type `TestEntity100Col`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntity100Col`.
     */
    update(entity: TestEntity100Col): UpdateRequestBuilderV4<TestEntity100Col>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntity100Col`.
     * @param keyTestEntity100Col Key property. See [[TestEntity100Col.keyTestEntity100Col]].
     * @returns A request builder for creating requests that delete an entity of type `TestEntity100Col`.
     */
    delete(keyTestEntity100Col: number): DeleteRequestBuilderV4<TestEntity100Col>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntity100Col`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntity100Col` by taking the entity as a parameter.
     */
    delete(entity: TestEntity100Col): DeleteRequestBuilderV4<TestEntity100Col>;
}
//# sourceMappingURL=TestEntity100ColRequestBuilder.d.ts.map