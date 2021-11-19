import { RequestBuilder } from '@sap-cloud-sdk/odata-common/internal';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestEntityWithEnumKey } from './TestEntityWithEnumKey';
import { TestEnumType } from './TestEnumType';
/**
 * Request builder class for operations supported on the [[TestEntityWithEnumKey]] entity.
 */
export declare class TestEntityWithEnumKeyRequestBuilder extends RequestBuilder<TestEntityWithEnumKey> {
  /**
   * Returns a request builder for retrieving one `TestEntityWithEnumKey` entity based on its keys.
   * @param keyPropertyEnum1 Key property. See [[TestEntityWithEnumKey.keyPropertyEnum1]].
   * @returns A request builder for creating requests to retrieve one `TestEntityWithEnumKey` entity based on its keys.
   */
  getByKey(
    keyPropertyEnum1: TestEnumType
  ): GetByKeyRequestBuilder<TestEntityWithEnumKey>;
  /**
   * Returns a request builder for querying all `TestEntityWithEnumKey` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithEnumKey` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityWithEnumKey>;
  /**
   * Returns a request builder for creating a `TestEntityWithEnumKey` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithEnumKey`.
   */
  create(
    entity: TestEntityWithEnumKey
  ): CreateRequestBuilder<TestEntityWithEnumKey>;
  /**
   * Returns a request builder for updating an entity of type `TestEntityWithEnumKey`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityWithEnumKey`.
   */
  update(
    entity: TestEntityWithEnumKey
  ): UpdateRequestBuilder<TestEntityWithEnumKey>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityWithEnumKey`.
   * @param keyPropertyEnum1 Key property. See [[TestEntityWithEnumKey.keyPropertyEnum1]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityWithEnumKey`.
   */
  delete(
    keyPropertyEnum1: TestEnumType
  ): DeleteRequestBuilder<TestEntityWithEnumKey>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityWithEnumKey`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityWithEnumKey` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityWithEnumKey
  ): DeleteRequestBuilder<TestEntityWithEnumKey>;
}
//# sourceMappingURL=TestEntityWithEnumKeyRequestBuilder.d.ts.map
