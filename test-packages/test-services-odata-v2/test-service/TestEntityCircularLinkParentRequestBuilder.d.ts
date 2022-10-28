import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { TestEntityCircularLinkParent } from './TestEntityCircularLinkParent';
/**
 * Request builder class for operations supported on the {@link TestEntityCircularLinkParent} entity.
 */
export declare class TestEntityCircularLinkParentRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntityCircularLinkParent<T>, T> {
    /**
     * Returns a request builder for retrieving one `TestEntityCircularLinkParent` entity based on its keys.
     * @param keyProperty Key property. See {@link TestEntityCircularLinkParent.keyProperty}.
     * @returns A request builder for creating requests to retrieve one `TestEntityCircularLinkParent` entity based on its keys.
     */
    getByKey(keyProperty: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<TestEntityCircularLinkParent<T>, T>;
    /**
     * Returns a request builder for querying all `TestEntityCircularLinkParent` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntityCircularLinkParent` entities.
     */
    getAll(): GetAllRequestBuilder<TestEntityCircularLinkParent<T>, T>;
    /**
     * Returns a request builder for creating a `TestEntityCircularLinkParent` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntityCircularLinkParent`.
     */
    create(entity: TestEntityCircularLinkParent<T>): CreateRequestBuilder<TestEntityCircularLinkParent<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `TestEntityCircularLinkParent`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntityCircularLinkParent`.
     */
    update(entity: TestEntityCircularLinkParent<T>): UpdateRequestBuilder<TestEntityCircularLinkParent<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityCircularLinkParent`.
     * @param keyProperty Key property. See {@link TestEntityCircularLinkParent.keyProperty}.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkParent`.
     */
    delete(keyProperty: string): DeleteRequestBuilder<TestEntityCircularLinkParent<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityCircularLinkParent`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityCircularLinkParent` by taking the entity as a parameter.
     */
    delete(entity: TestEntityCircularLinkParent<T>): DeleteRequestBuilder<TestEntityCircularLinkParent<T>, T>;
}
//# sourceMappingURL=TestEntityCircularLinkParentRequestBuilder.d.ts.map