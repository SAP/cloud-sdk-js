import {
  RequestBuilder,
  GetAllRequestBuilderV2,
  GetByKeyRequestBuilderV2,
  CreateRequestBuilderV2,
  UpdateRequestBuilderV2,
  DeleteRequestBuilderV2
} from '@sap-cloud-sdk/core';
import { TestEntityLvl2SingleLink } from './TestEntityLvl2SingleLink';
/**
 * Request builder class for operations supported on the [[TestEntityLvl2SingleLink]] entity.
 */
export declare class TestEntityLvl2SingleLinkRequestBuilder extends RequestBuilder<TestEntityLvl2SingleLink> {
  /**
   * Returns a request builder for retrieving one `TestEntityLvl2SingleLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityLvl2SingleLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLvl2SingleLink` entity based on its keys.
   */
  getByKey(
    keyProperty: string
  ): GetByKeyRequestBuilderV2<TestEntityLvl2SingleLink>;
  /**
   * Returns a request builder for querying all `TestEntityLvl2SingleLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLvl2SingleLink` entities.
   */
  getAll(): GetAllRequestBuilderV2<TestEntityLvl2SingleLink>;
  /**
   * Returns a request builder for creating a `TestEntityLvl2SingleLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLvl2SingleLink`.
   */
  create(
    entity: TestEntityLvl2SingleLink
  ): CreateRequestBuilderV2<TestEntityLvl2SingleLink>;
  /**
   * Returns a request builder for updating an entity of type `TestEntityLvl2SingleLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLvl2SingleLink`.
   */
  update(
    entity: TestEntityLvl2SingleLink
  ): UpdateRequestBuilderV2<TestEntityLvl2SingleLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl2SingleLink`.
   * @param keyProperty Key property. See [[TestEntityLvl2SingleLink.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2SingleLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilderV2<TestEntityLvl2SingleLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl2SingleLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl2SingleLink` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityLvl2SingleLink
  ): DeleteRequestBuilderV2<TestEntityLvl2SingleLink>;
}
//# sourceMappingURL=TestEntityLvl2SingleLinkRequestBuilder.d.ts.map
