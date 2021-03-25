import {
  RequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/core';
import { TestEntityOtherMultiLink } from './TestEntityOtherMultiLink';
/**
 * Request builder class for operations supported on the [[TestEntityOtherMultiLink]] entity.
 */
export declare class TestEntityOtherMultiLinkRequestBuilder extends RequestBuilder<TestEntityOtherMultiLink> {
  /**
   * Returns a request builder for retrieving one `TestEntityOtherMultiLink` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntityOtherMultiLink.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntityOtherMultiLink` entity based on its keys.
   */
  getByKey(
    keyPropertyString: string
  ): GetByKeyRequestBuilder<TestEntityOtherMultiLink>;
  /**
   * Returns a request builder for querying all `TestEntityOtherMultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityOtherMultiLink` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityOtherMultiLink>;
  /**
   * Returns a request builder for creating a `TestEntityOtherMultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityOtherMultiLink`.
   */
  create(
    entity: TestEntityOtherMultiLink
  ): CreateRequestBuilder<TestEntityOtherMultiLink>;
  /**
   * Returns a request builder for updating an entity of type `TestEntityOtherMultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityOtherMultiLink`.
   */
  update(
    entity: TestEntityOtherMultiLink
  ): UpdateRequestBuilder<TestEntityOtherMultiLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityOtherMultiLink`.
   * @param keyPropertyString Key property. See [[TestEntityOtherMultiLink.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityOtherMultiLink`.
   */
  delete(
    keyPropertyString: string
  ): DeleteRequestBuilder<TestEntityOtherMultiLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityOtherMultiLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityOtherMultiLink` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityOtherMultiLink
  ): DeleteRequestBuilder<TestEntityOtherMultiLink>;
}
//# sourceMappingURL=TestEntityOtherMultiLinkRequestBuilder.d.ts.map
