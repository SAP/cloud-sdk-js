import { RequestBuilder, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, CreateRequestBuilderV4, UpdateRequestBuilderV4, DeleteRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntitySharesEntityType1 } from './TestEntitySharesEntityType1';
/**
 * Request builder class for operations supported on the [[TestEntitySharesEntityType1]] entity.
 */
export declare class TestEntitySharesEntityType1RequestBuilder extends RequestBuilder<TestEntitySharesEntityType1> {
    /**
     * Returns a request builder for retrieving one `TestEntitySharesEntityType1` entity based on its keys.
     * @param keyProperty Key property. See [[TestEntitySharesEntityType1.keyProperty]].
     * @returns A request builder for creating requests to retrieve one `TestEntitySharesEntityType1` entity based on its keys.
     */
    getByKey(keyProperty: string): GetByKeyRequestBuilderV4<TestEntitySharesEntityType1>;
    /**
     * Returns a request builder for querying all `TestEntitySharesEntityType1` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntitySharesEntityType1` entities.
     */
    getAll(): GetAllRequestBuilderV4<TestEntitySharesEntityType1>;
    /**
     * Returns a request builder for creating a `TestEntitySharesEntityType1` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntitySharesEntityType1`.
     */
    create(entity: TestEntitySharesEntityType1): CreateRequestBuilderV4<TestEntitySharesEntityType1>;
    /**
     * Returns a request builder for updating an entity of type `TestEntitySharesEntityType1`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntitySharesEntityType1`.
     */
    update(entity: TestEntitySharesEntityType1): UpdateRequestBuilderV4<TestEntitySharesEntityType1>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntitySharesEntityType1`.
     * @param keyProperty Key property. See [[TestEntitySharesEntityType1.keyProperty]].
     * @returns A request builder for creating requests that delete an entity of type `TestEntitySharesEntityType1`.
     */
    delete(keyProperty: string): DeleteRequestBuilderV4<TestEntitySharesEntityType1>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntitySharesEntityType1`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntitySharesEntityType1` by taking the entity as a parameter.
     */
    delete(entity: TestEntitySharesEntityType1): DeleteRequestBuilderV4<TestEntitySharesEntityType1>;
}
//# sourceMappingURL=TestEntitySharesEntityType1RequestBuilder.d.ts.map