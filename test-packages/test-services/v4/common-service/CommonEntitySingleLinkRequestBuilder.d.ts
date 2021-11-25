import { RequestBuilder } from '@sap-cloud-sdk/odata-common/internal';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { CommonEntitySingleLink } from './CommonEntitySingleLink';
/**
 * Request builder class for operations supported on the [[CommonEntitySingleLink]] entity.
 */
export declare class CommonEntitySingleLinkRequestBuilder extends RequestBuilder<CommonEntitySingleLink> {
  /**
   * Returns a request builder for retrieving one `CommonEntitySingleLink` entity based on its keys.
   * @param keyProperty Key property. See [[CommonEntitySingleLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `CommonEntitySingleLink` entity based on its keys.
   */
  getByKey(keyProperty: string): GetByKeyRequestBuilder<CommonEntitySingleLink>;
  /**
   * Returns a request builder for querying all `CommonEntitySingleLink` entities.
   * @returns A request builder for creating requests to retrieve all `CommonEntitySingleLink` entities.
   */
  getAll(): GetAllRequestBuilder<CommonEntitySingleLink>;
  /**
   * Returns a request builder for creating a `CommonEntitySingleLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CommonEntitySingleLink`.
   */
  create(
    entity: CommonEntitySingleLink
  ): CreateRequestBuilder<CommonEntitySingleLink>;
  /**
   * Returns a request builder for updating an entity of type `CommonEntitySingleLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CommonEntitySingleLink`.
   */
  update(
    entity: CommonEntitySingleLink
  ): UpdateRequestBuilder<CommonEntitySingleLink>;
  /**
   * Returns a request builder for deleting an entity of type `CommonEntitySingleLink`.
   * @param keyProperty Key property. See [[CommonEntitySingleLink.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `CommonEntitySingleLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilder<CommonEntitySingleLink>;
  /**
   * Returns a request builder for deleting an entity of type `CommonEntitySingleLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `CommonEntitySingleLink` by taking the entity as a parameter.
   */
  delete(
    entity: CommonEntitySingleLink
  ): DeleteRequestBuilder<CommonEntitySingleLink>;
}
//# sourceMappingURL=CommonEntitySingleLinkRequestBuilder.d.ts.map
