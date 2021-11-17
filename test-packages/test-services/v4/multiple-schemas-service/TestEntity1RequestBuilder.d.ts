import { RequestBuilder } from '@sap-cloud-sdk/odata-common/internal';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestEntity1 } from './TestEntity1';
/**
 * Request builder class for operations supported on the [[TestEntity1]] entity.
 */
export declare class TestEntity1RequestBuilder extends RequestBuilder<TestEntity1> {
  /**
   * Returns a request builder for retrieving one `TestEntity1` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntity1.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity1` entity based on its keys.
   */
  getByKey(keyPropertyString: string): GetByKeyRequestBuilder<TestEntity1>;
  /**
   * Returns a request builder for querying all `TestEntity1` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity1` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntity1>;
  /**
   * Returns a request builder for creating a `TestEntity1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity1`.
   */
  create(entity: TestEntity1): CreateRequestBuilder<TestEntity1>;
  /**
   * Returns a request builder for updating an entity of type `TestEntity1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity1`.
   */
  update(entity: TestEntity1): UpdateRequestBuilder<TestEntity1>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity1`.
   * @param keyPropertyString Key property. See [[TestEntity1.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity1`.
   */
  delete(keyPropertyString: string): DeleteRequestBuilder<TestEntity1>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity1`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity1` by taking the entity as a parameter.
   */
  delete(entity: TestEntity1): DeleteRequestBuilder<TestEntity1>;
}
//# sourceMappingURL=TestEntity1RequestBuilder.d.ts.map
