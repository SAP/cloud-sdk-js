import {
  DefaultDeSerializers,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder,
  DeserializedType,
  RequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { TestEntityEndsWith } from './TestEntityEndsWith';
/**
 * Request builder class for operations supported on the {@link TestEntityEndsWith} entity.
 */
export declare class TestEntityEndsWithRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<TestEntityEndsWith<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntityEndsWith` entity based on its keys.
   * @param keyProperty Key property. See {@link TestEntityEndsWith.keyProperty}.
   * @returns A request builder for creating requests to retrieve one `TestEntityEndsWith` entity based on its keys.
   */
  getByKey(
    keyProperty: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<TestEntityEndsWith<T>, T>;
  /**
   * Returns a request builder for querying all `TestEntityEndsWith` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWith` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityEndsWith<T>, T>;
  /**
   * Returns a request builder for creating a `TestEntityEndsWith` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWith`.
   */
  create(
    entity: TestEntityEndsWith<T>
  ): CreateRequestBuilder<TestEntityEndsWith<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWith`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWith`.
   */
  update(
    entity: TestEntityEndsWith<T>
  ): UpdateRequestBuilder<TestEntityEndsWith<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWith`.
   * @param keyProperty Key property. See {@link TestEntityEndsWith.keyProperty}.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWith`.
   */
  delete(keyProperty: string): DeleteRequestBuilder<TestEntityEndsWith<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWith`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWith` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityEndsWith<T>
  ): DeleteRequestBuilder<TestEntityEndsWith<T>, T>;
}
//# sourceMappingURL=TestEntityEndsWithRequestBuilder.d.ts.map
