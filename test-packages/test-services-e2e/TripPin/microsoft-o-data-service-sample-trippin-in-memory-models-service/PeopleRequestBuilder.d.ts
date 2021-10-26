import { RequestBuilder } from '@sap-cloud-sdk/odata-common';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { People } from './People';
/**
 * Request builder class for operations supported on the [[People]] entity.
 */
export declare class PeopleRequestBuilder extends RequestBuilder<People> {
  /**
   * Returns a request builder for retrieving one `People` entity based on its keys.
   * @param userName Key property. See [[People.userName]].
   * @returns A request builder for creating requests to retrieve one `People` entity based on its keys.
   */
  getByKey(userName: string): GetByKeyRequestBuilder<People>;
  /**
   * Returns a request builder for querying all `People` entities.
   * @returns A request builder for creating requests to retrieve all `People` entities.
   */
  getAll(): GetAllRequestBuilder<People>;
  /**
   * Returns a request builder for creating a `People` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `People`.
   */
  create(entity: People): CreateRequestBuilder<People>;
  /**
   * Returns a request builder for updating an entity of type `People`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `People`.
   */
  update(entity: People): UpdateRequestBuilder<People>;
  /**
   * Returns a request builder for deleting an entity of type `People`.
   * @param userName Key property. See [[People.userName]].
   * @returns A request builder for creating requests that delete an entity of type `People`.
   */
  delete(userName: string): DeleteRequestBuilder<People>;
  /**
   * Returns a request builder for deleting an entity of type `People`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `People` by taking the entity as a parameter.
   */
  delete(entity: People): DeleteRequestBuilder<People>;
}
//# sourceMappingURL=PeopleRequestBuilder.d.ts.map
