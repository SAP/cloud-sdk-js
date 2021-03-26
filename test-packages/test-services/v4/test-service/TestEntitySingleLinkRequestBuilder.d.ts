import {
  RequestBuilder,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  CreateRequestBuilderV4,
  UpdateRequestBuilderV4,
  DeleteRequestBuilderV4
} from '@sap-cloud-sdk/core';
import { TestEntitySingleLink } from './TestEntitySingleLink';
/**
 * Request builder class for operations supported on the [[TestEntitySingleLink]] entity.
 */
export declare class TestEntitySingleLinkRequestBuilder extends RequestBuilder<TestEntitySingleLink> {
  /**
   * Returns a request builder for retrieving one `TestEntitySingleLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntitySingleLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntitySingleLink` entity based on its keys.
   */
  getByKey(keyProperty: string): GetByKeyRequestBuilderV4<TestEntitySingleLink>;
  /**
   * Returns a request builder for querying all `TestEntitySingleLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntitySingleLink` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntitySingleLink>;
  /**
   * Returns a request builder for creating a `TestEntitySingleLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntitySingleLink`.
   */
  create(
    entity: TestEntitySingleLink
  ): CreateRequestBuilderV4<TestEntitySingleLink>;
  /**
   * Returns a request builder for updating an entity of type `TestEntitySingleLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntitySingleLink`.
   */
  update(
    entity: TestEntitySingleLink
  ): UpdateRequestBuilderV4<TestEntitySingleLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntitySingleLink`.
   * @param keyProperty Key property. See [[TestEntitySingleLink.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntitySingleLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilderV4<TestEntitySingleLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntitySingleLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntitySingleLink` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntitySingleLink
  ): DeleteRequestBuilderV4<TestEntitySingleLink>;
}
//# sourceMappingURL=TestEntitySingleLinkRequestBuilder.d.ts.map
