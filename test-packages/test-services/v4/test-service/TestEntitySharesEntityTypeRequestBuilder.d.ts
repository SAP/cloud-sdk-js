import { RequestBuilder, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, CreateRequestBuilderV4, UpdateRequestBuilderV4, DeleteRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntitySharesEntityType } from './TestEntitySharesEntityType';
/**
 * Request builder class for operations supported on the [[TestEntitySharesEntityType]] entity.
 */
export declare class TestEntitySharesEntityTypeRequestBuilder extends RequestBuilder<TestEntitySharesEntityType> {
    /**
     * Returns a request builder for retrieving one `TestEntitySharesEntityType` entity based on its keys.
     * @param keyPropertyGuid Key property. See [[TestEntitySharesEntityType.keyPropertyGuid]].
     * @param keyPropertyString Key property. See [[TestEntitySharesEntityType.keyPropertyString]].
     * @returns A request builder for creating requests to retrieve one `TestEntitySharesEntityType` entity based on its keys.
     */
    getByKey(keyPropertyGuid: string, keyPropertyString: string): GetByKeyRequestBuilderV4<TestEntitySharesEntityType>;
    /**
     * Returns a request builder for querying all `TestEntitySharesEntityType` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntitySharesEntityType` entities.
     */
    getAll(): GetAllRequestBuilderV4<TestEntitySharesEntityType>;
    /**
     * Returns a request builder for creating a `TestEntitySharesEntityType` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntitySharesEntityType`.
     */
    create(entity: TestEntitySharesEntityType): CreateRequestBuilderV4<TestEntitySharesEntityType>;
    /**
     * Returns a request builder for updating an entity of type `TestEntitySharesEntityType`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntitySharesEntityType`.
     */
    update(entity: TestEntitySharesEntityType): UpdateRequestBuilderV4<TestEntitySharesEntityType>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntitySharesEntityType`.
     * @param keyPropertyGuid Key property. See [[TestEntitySharesEntityType.keyPropertyGuid]].
     * @param keyPropertyString Key property. See [[TestEntitySharesEntityType.keyPropertyString]].
     * @returns A request builder for creating requests that delete an entity of type `TestEntitySharesEntityType`.
     */
    delete(keyPropertyGuid: string, keyPropertyString: string): DeleteRequestBuilderV4<TestEntitySharesEntityType>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntitySharesEntityType`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntitySharesEntityType` by taking the entity as a parameter.
     */
    delete(entity: TestEntitySharesEntityType): DeleteRequestBuilderV4<TestEntitySharesEntityType>;
}
//# sourceMappingURL=TestEntitySharesEntityTypeRequestBuilder.d.ts.map