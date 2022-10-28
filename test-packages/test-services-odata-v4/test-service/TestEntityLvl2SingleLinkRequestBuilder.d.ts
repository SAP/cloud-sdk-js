import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntityLvl2SingleLink } from './TestEntityLvl2SingleLink';
/**
 * Request builder class for operations supported on the {@link TestEntityLvl2SingleLink} entity.
 */
export declare class TestEntityLvl2SingleLinkRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntityLvl2SingleLink<T>, T> {
    /**
     * Returns a request builder for retrieving one `TestEntityLvl2SingleLink` entity based on its keys.
     * @param keyProperty Key property. See {@link TestEntityLvl2SingleLink.keyProperty}.
     * @returns A request builder for creating requests to retrieve one `TestEntityLvl2SingleLink` entity based on its keys.
     */
    getByKey(keyProperty: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<TestEntityLvl2SingleLink<T>, T>;
    /**
     * Returns a request builder for querying all `TestEntityLvl2SingleLink` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntityLvl2SingleLink` entities.
     */
    getAll(): GetAllRequestBuilder<TestEntityLvl2SingleLink<T>, T>;
    /**
     * Returns a request builder for creating a `TestEntityLvl2SingleLink` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntityLvl2SingleLink`.
     */
    create(entity: TestEntityLvl2SingleLink<T>): CreateRequestBuilder<TestEntityLvl2SingleLink<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `TestEntityLvl2SingleLink`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntityLvl2SingleLink`.
     */
    update(entity: TestEntityLvl2SingleLink<T>): UpdateRequestBuilder<TestEntityLvl2SingleLink<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityLvl2SingleLink`.
     * @param keyProperty Key property. See {@link TestEntityLvl2SingleLink.keyProperty}.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2SingleLink`.
     */
    delete(keyProperty: string): DeleteRequestBuilder<TestEntityLvl2SingleLink<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityLvl2SingleLink`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2SingleLink` by taking the entity as a parameter.
     */
    delete(entity: TestEntityLvl2SingleLink<T>): DeleteRequestBuilder<TestEntityLvl2SingleLink<T>, T>;
}
//# sourceMappingURL=TestEntityLvl2SingleLinkRequestBuilder.d.ts.map