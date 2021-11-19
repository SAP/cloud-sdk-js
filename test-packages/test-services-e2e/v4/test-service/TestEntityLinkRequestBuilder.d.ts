import { RequestBuilder } from '@sap-cloud-sdk/odata-common/internal';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestEntityLink } from './TestEntityLink';
/**
 * Request builder class for operations supported on the [[TestEntityLink]] entity.
 */
export declare class TestEntityLinkRequestBuilder extends RequestBuilder<TestEntityLink> {
  /**
   * Returns a request builder for retrieving one `TestEntityLink` entity based on its keys.
   * @param keyTestEntityLink Key property. See [[TestEntityLink.keyTestEntityLink]].
   * @param keyToTestEntity Key property. See [[TestEntityLink.keyToTestEntity]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLink` entity based on its keys.
   */
  getByKey(
    keyTestEntityLink: number,
    keyToTestEntity: number
  ): GetByKeyRequestBuilder<TestEntityLink>;
  /**
   * Returns a request builder for querying all `TestEntityLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLink` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityLink>;
  /**
   * Returns a request builder for creating a `TestEntityLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLink`.
   */
  create(entity: TestEntityLink): CreateRequestBuilder<TestEntityLink>;
  /**
   * Returns a request builder for updating an entity of type `TestEntityLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLink`.
   */
  update(entity: TestEntityLink): UpdateRequestBuilder<TestEntityLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityLink`.
   * @param keyTestEntityLink Key property. See [[TestEntityLink.keyTestEntityLink]].
   * @param keyToTestEntity Key property. See [[TestEntityLink.keyToTestEntity]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLink`.
   */
  delete(
    keyTestEntityLink: number,
    keyToTestEntity: number
  ): DeleteRequestBuilder<TestEntityLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLink` by taking the entity as a parameter.
   */
  delete(entity: TestEntityLink): DeleteRequestBuilder<TestEntityLink>;
}
//# sourceMappingURL=TestEntityLinkRequestBuilder.d.ts.map
