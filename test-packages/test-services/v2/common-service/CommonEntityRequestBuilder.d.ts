import { RequestBuilder } from '@sap-cloud-sdk/odata-common/internal';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { CommonEntity } from './CommonEntity';
/**
 * Request builder class for operations supported on the [[CommonEntity]] entity.
 */
export declare class CommonEntityRequestBuilder extends RequestBuilder<CommonEntity> {
  /**
   * Returns a request builder for retrieving one `CommonEntity` entity based on its keys.
   * @param keyPropertyGuid Key property. See [[CommonEntity.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[CommonEntity.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `CommonEntity` entity based on its keys.
   */
  getByKey(
    keyPropertyGuid: string,
    keyPropertyString: string
  ): GetByKeyRequestBuilder<CommonEntity>;
  /**
   * Returns a request builder for querying all `CommonEntity` entities.
   * @returns A request builder for creating requests to retrieve all `CommonEntity` entities.
   */
  getAll(): GetAllRequestBuilder<CommonEntity>;
  /**
   * Returns a request builder for creating a `CommonEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CommonEntity`.
   */
  create(entity: CommonEntity): CreateRequestBuilder<CommonEntity>;
  /**
   * Returns a request builder for updating an entity of type `CommonEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CommonEntity`.
   */
  update(entity: CommonEntity): UpdateRequestBuilder<CommonEntity>;
  /**
   * Returns a request builder for deleting an entity of type `CommonEntity`.
   * @param keyPropertyGuid Key property. See [[CommonEntity.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[CommonEntity.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `CommonEntity`.
   */
  delete(
    keyPropertyGuid: string,
    keyPropertyString: string
  ): DeleteRequestBuilder<CommonEntity>;
  /**
   * Returns a request builder for deleting an entity of type `CommonEntity`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `CommonEntity` by taking the entity as a parameter.
   */
  delete(entity: CommonEntity): DeleteRequestBuilder<CommonEntity>;
}
//# sourceMappingURL=CommonEntityRequestBuilder.d.ts.map
