import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { TestEntityLvl2MultiLink } from './TestEntityLvl2MultiLink';
/**
 * Request builder class for operations supported on the {@link TestEntityLvl2MultiLink} entity.
 */
export declare class TestEntityLvl2MultiLinkRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntityLvl2MultiLink<T>, T> {
    /**
     * Returns a request builder for retrieving one `TestEntityLvl2MultiLink` entity based on its keys.
     * @param keyProperty Key property. See {@link TestEntityLvl2MultiLink.keyProperty}.
     * @returns A request builder for creating requests to retrieve one `TestEntityLvl2MultiLink` entity based on its keys.
     */
    getByKey(keyProperty: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<TestEntityLvl2MultiLink<T>, T>;
    /**
     * Returns a request builder for querying all `TestEntityLvl2MultiLink` entities.
     * @returns A request builder for creating requests to retrieve all `TestEntityLvl2MultiLink` entities.
     */
    getAll(): GetAllRequestBuilder<TestEntityLvl2MultiLink<T>, T>;
    /**
     * Returns a request builder for creating a `TestEntityLvl2MultiLink` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TestEntityLvl2MultiLink`.
     */
    create(entity: TestEntityLvl2MultiLink<T>): CreateRequestBuilder<TestEntityLvl2MultiLink<T>, T>;
    /**
     * Returns a request builder for updating an entity of type `TestEntityLvl2MultiLink`.
     * @param entity The entity to be updated
     * @returns A request builder for creating requests that update an entity of type `TestEntityLvl2MultiLink`.
     */
    update(entity: TestEntityLvl2MultiLink<T>): UpdateRequestBuilder<TestEntityLvl2MultiLink<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityLvl2MultiLink`.
     * @param keyProperty Key property. See {@link TestEntityLvl2MultiLink.keyProperty}.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2MultiLink`.
     */
    delete(keyProperty: string): DeleteRequestBuilder<TestEntityLvl2MultiLink<T>, T>;
    /**
     * Returns a request builder for deleting an entity of type `TestEntityLvl2MultiLink`.
     * @param entity Pass the entity to be deleted.
     * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2MultiLink` by taking the entity as a parameter.
     */
    delete(entity: TestEntityLvl2MultiLink<T>): DeleteRequestBuilder<TestEntityLvl2MultiLink<T>, T>;
}
//# sourceMappingURL=TestEntityLvl2MultiLinkRequestBuilder.d.ts.map