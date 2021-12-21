import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
import {
  DefaultDeSerializers,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { RequestBuilder } from '@sap-cloud-sdk/odata-v4/internal';
import { People } from './People';
/**
 * Request builder class for operations supported on the [[People]] entity.
 */
export declare class PeopleRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<People<T>, T> {
  /**
   * Returns a request builder for retrieving one `People` entity based on its keys.
   * @param userName Key property. See [[People.userName]].
   * @returns A request builder for creating requests to retrieve one `People` entity based on its keys.
   */
  getByKey(
    userName: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<People<T>, T>;
  /**
   * Returns a request builder for querying all `People` entities.
   * @returns A request builder for creating requests to retrieve all `People` entities.
   */
  getAll(): GetAllRequestBuilder<People<T>, T>;
  /**
   * Returns a request builder for creating a `People` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `People`.
   */
  create(entity: People<T>): CreateRequestBuilder<People<T>, T>;
  /**
   * Returns a request builder for updating an entity of type `People`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `People`.
   */
  update(entity: People<T>): UpdateRequestBuilder<People<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `People`.
   * @param userName Key property. See [[People.userName]].
   * @returns A request builder for creating requests that delete an entity of type `People`.
   */
  delete(userName: string): DeleteRequestBuilder<People<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `People`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `People` by taking the entity as a parameter.
   */
  delete(entity: People<T>): DeleteRequestBuilder<People<T>, T>;
}
//# sourceMappingURL=PeopleRequestBuilder.d.ts.map
