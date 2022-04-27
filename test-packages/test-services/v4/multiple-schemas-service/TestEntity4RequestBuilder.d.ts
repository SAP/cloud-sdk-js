import {
  RequestBuilder,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  CreateRequestBuilderV4,
  UpdateRequestBuilderV4,
  DeleteRequestBuilderV4
} from '@sap-cloud-sdk/core';
import { TestEntity4 } from './TestEntity4';
/**
 * Request builder class for operations supported on the [[TestEntity4]] entity.
 */
export declare class TestEntity4RequestBuilder extends RequestBuilder<TestEntity4> {
  /**
   * Returns a request builder for retrieving one `TestEntity4` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntity4.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity4` entity based on its keys.
   */
  getByKey(keyPropertyString: string): GetByKeyRequestBuilderV4<TestEntity4>;
  /**
   * Returns a request builder for querying all `TestEntity4` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity4` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntity4>;
  /**
   * Returns a request builder for creating a `TestEntity4` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity4`.
   */
  create(entity: TestEntity4): CreateRequestBuilderV4<TestEntity4>;
  /**
   * Returns a request builder for updating an entity of type `TestEntity4`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity4`.
   */
  update(entity: TestEntity4): UpdateRequestBuilderV4<TestEntity4>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity4`.
   * @param keyPropertyString Key property. See [[TestEntity4.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity4`.
   */
  delete(keyPropertyString: string): DeleteRequestBuilderV4<TestEntity4>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity4`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity4` by taking the entity as a parameter.
   */
  delete(entity: TestEntity4): DeleteRequestBuilderV4<TestEntity4>;
}
//# sourceMappingURL=TestEntity4RequestBuilder.d.ts.map
