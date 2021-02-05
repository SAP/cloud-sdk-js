import { RequestBuilder, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, CreateRequestBuilderV4, UpdateRequestBuilderV4, DeleteRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntitySharesEntityType2 } from './TestEntitySharesEntityType2';
/**
 * Request builder class for operations supported on the [[TestEntitySharesEntityType2]] entity.
 */
export declare class TestEntitySharesEntityType2RequestBuilder extends RequestBuilder<TestEntitySharesEntityType2> {
    /**
     * Returns a request builder for retrieving one `TestEntitySharesEntityType2` entity based on its keys.
     * @param keyPropertyString Key property. See [[TestEntitySharesEntityType2.keyPropertyString]].
     * @returns A request builder for creating requests to retrieve one `TestEntitySharesEntityType2` entity based on its keys.
     */
    getByKey(keyPropertyString: string): GetByKeyRequestBuilderV4<TestEntitySharesEntityType2>;
    /**
     * Returns a request builder for querying all `TestEntitySharesEntityType2` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntitySharesEntityType2` entities.
     */
    getAll(): GetAllRequestBuilderV4<TestEntitySharesEntityType2>;
    /**
     * Returns a request builder for creating a `TestEntitySharesEntityType2` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntitySharesEntityType2`.
     */
    create(entity: TestEntitySharesEntityType2): CreateRequestBuilderV4<TestEntitySharesEntityType2>;
    /**
     * Returns a request builder for updating an entity of type `TestEntitySharesEntityType2`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntitySharesEntityType2`.
     */
    update(entity: TestEntitySharesEntityType2): UpdateRequestBuilderV4<TestEntitySharesEntityType2>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntitySharesEntityType2`.
     * @param keyPropertyString Key property. See [[TestEntitySharesEntityType2.keyPropertyString]].
     * @returns A request builder for creating requests that delete an entity of type `TestEntitySharesEntityType2`.
     */
    delete(keyPropertyString: string): DeleteRequestBuilderV4<TestEntitySharesEntityType2>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntitySharesEntityType2`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntitySharesEntityType2` by taking the entity as a parameter.
     */
    delete(entity: TestEntitySharesEntityType2): DeleteRequestBuilderV4<TestEntitySharesEntityType2>;
}
//# sourceMappingURL=TestEntitySharesEntityType2RequestBuilder.d.ts.map