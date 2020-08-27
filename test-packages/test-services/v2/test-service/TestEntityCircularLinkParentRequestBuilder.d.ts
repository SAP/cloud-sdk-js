import { RequestBuilder, GetAllRequestBuilderV2, GetByKeyRequestBuilderV2, CreateRequestBuilderV2, UpdateRequestBuilderV2, DeleteRequestBuilderV2 } from '@sap-cloud-sdk/core';
import { TestEntityCircularLinkParent } from './TestEntityCircularLinkParent';
/**
 * Request builder class for operations supported on the [[TestEntityCircularLinkParent]] entity.
 */
export declare class TestEntityCircularLinkParentRequestBuilder extends RequestBuilder<TestEntityCircularLinkParent> {
    /**
     * Returns a request builder for retrieving one `TestEntityCircularLinkParent` entity based on its keys.
     * @param keyProperty Key property. See [[TestEntityCircularLinkParent.keyProperty]].
     * @returns A request builder for creating requests to retrieve one `TestEntityCircularLinkParent` entity based on its keys.
     */
    getByKey(keyProperty: string): GetByKeyRequestBuilderV2<TestEntityCircularLinkParent>;
    /**
     * Returns a request builder for querying all `TestEntityCircularLinkParent` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntityCircularLinkParent` entities.
     */
    getAll(): GetAllRequestBuilderV2<TestEntityCircularLinkParent>;
    /**
     * Returns a request builder for creating a `TestEntityCircularLinkParent` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntityCircularLinkParent`.
     */
    create(entity: TestEntityCircularLinkParent): CreateRequestBuilderV2<TestEntityCircularLinkParent>;
    /**
     * Returns a request builder for updating an entity of type `TestEntityCircularLinkParent`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntityCircularLinkParent`.
     */
    update(entity: TestEntityCircularLinkParent): UpdateRequestBuilderV2<TestEntityCircularLinkParent>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityCircularLinkParent`.
     * @param keyProperty Key property. See [[TestEntityCircularLinkParent.keyProperty]].
     * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkParent`.
     */
    delete(keyProperty: string): DeleteRequestBuilderV2<TestEntityCircularLinkParent>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityCircularLinkParent`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkParent` by taking the entity as a parameter.
     */
    delete(entity: TestEntityCircularLinkParent): DeleteRequestBuilderV2<TestEntityCircularLinkParent>;
}
//# sourceMappingURL=TestEntityCircularLinkParentRequestBuilder.d.ts.map