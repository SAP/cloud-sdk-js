import { RequestBuilder } from '@sap-cloud-sdk/odata-common/internal';
import { GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { TestEntityEndsWith } from './TestEntityEndsWith';
/**
 * Request builder class for operations supported on the [[TestEntityEndsWith]] entity.
 */
export declare class TestEntityEndsWithRequestBuilder extends RequestBuilder<TestEntityEndsWith> {
    /**
     * Returns a request builder for retrieving one `TestEntityEndsWith` entity based on its keys.
     * @param keyProperty Key property. See [[TestEntityEndsWith.keyProperty]].
     * @returns A request builder for creating requests to retrieve one `TestEntityEndsWith` entity based on its keys.
     */
    getByKey(keyProperty: string): GetByKeyRequestBuilder<TestEntityEndsWith>;
    /**
     * Returns a request builder for querying all `TestEntityEndsWith` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntityEndsWith` entities.
     */
    getAll(): GetAllRequestBuilder<TestEntityEndsWith>;
    /**
     * Returns a request builder for creating a `TestEntityEndsWith` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWith`.
     */
    create(entity: TestEntityEndsWith): CreateRequestBuilder<TestEntityEndsWith>;
    /**
     * Returns a request builder for updating an entity of type `TestEntityEndsWith`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWith`.
     */
    update(entity: TestEntityEndsWith): UpdateRequestBuilder<TestEntityEndsWith>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityEndsWith`.
     * @param keyProperty Key property. See [[TestEntityEndsWith.keyProperty]].
     * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWith`.
     */
    delete(keyProperty: string): DeleteRequestBuilder<TestEntityEndsWith>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityEndsWith`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWith` by taking the entity as a parameter.
     */
    delete(entity: TestEntityEndsWith): DeleteRequestBuilder<TestEntityEndsWith>;
}
//# sourceMappingURL=TestEntityEndsWithRequestBuilder.d.ts.map