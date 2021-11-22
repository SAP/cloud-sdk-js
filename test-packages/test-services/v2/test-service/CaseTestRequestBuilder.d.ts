import { RequestBuilder } from '@sap-cloud-sdk/odata-common/internal';
import { GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { CaseTest } from './CaseTest';
/**
 * Request builder class for operations supported on the [[CaseTest]] entity.
 */
export declare class CaseTestRequestBuilder extends RequestBuilder<CaseTest> {
    /**
     * Returns a request builder for retrieving one `CaseTest` entity based on its keys.
     * @param keyPropertyString Key property. See [[CaseTest.keyPropertyString]].
     * @returns A request builder for creating requests to retrieve one `CaseTest` entity based on its keys.
     */
    getByKey(keyPropertyString: string): GetByKeyRequestBuilder<CaseTest>;
    /**
     * Returns a request builder for querying all `CaseTest` entities.
     * @returns A request builder for creating requests to retrieve all `CaseTest` entities.
     */
    getAll(): GetAllRequestBuilder<CaseTest>;
    /**
     * Returns a request builder for creating a `CaseTest` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CaseTest`.
     */
    create(entity: CaseTest): CreateRequestBuilder<CaseTest>;
    /**
     * Returns a request builder for updating an entity of type `CaseTest`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `CaseTest`.
     */
    update(entity: CaseTest): UpdateRequestBuilder<CaseTest>;
    /**
     * Returns a request builder for deleting an entity of type `CaseTest`.
     * @param keyPropertyString Key property. See [[CaseTest.keyPropertyString]].
     * @returns A request builder for creating requests that delete an entity of type `CaseTest`.
     */
    delete(keyPropertyString: string): DeleteRequestBuilder<CaseTest>;
    /**
     * Returns a request builder for deleting an entity of type `CaseTest`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `CaseTest` by taking the entity as a parameter.
     */
    delete(entity: CaseTest): DeleteRequestBuilder<CaseTest>;
}
//# sourceMappingURL=CaseTestRequestBuilder.d.ts.map