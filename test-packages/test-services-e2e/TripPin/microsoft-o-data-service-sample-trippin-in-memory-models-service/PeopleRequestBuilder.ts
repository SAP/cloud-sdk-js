/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DefaultDeSerializers,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder,
  DeserializedType,
  RequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { People } from './People';

/**
 * Request builder class for operations supported on the {@link People} entity.
 */
export class PeopleRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<People<T>, T> {
  /**
   * Returns a request builder for retrieving one `People` entity based on its keys.
   * @param userName Key property. See {@link People.userName}.
   * @returns A request builder for creating requests to retrieve one `People` entity based on its keys.
   */
  getByKey(
    userName: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<People<T>, T> {
    return new GetByKeyRequestBuilder<People<T>, T>(this.entityApi, {
      UserName: userName
    });
  }

  /**
   * Returns a request builder for querying all `People` entities.
   * @returns A request builder for creating requests to retrieve all `People` entities.
   */
  getAll(): GetAllRequestBuilder<People<T>, T> {
    return new GetAllRequestBuilder<People<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `People` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `People`.
   */
  create(entity: People<T>): CreateRequestBuilder<People<T>, T> {
    return new CreateRequestBuilder<People<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `People`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `People`.
   */
  update(entity: People<T>): UpdateRequestBuilder<People<T>, T> {
    return new UpdateRequestBuilder<People<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `People`.
   * @param userName Key property. See {@link People.userName}.
   * @returns A request builder for creating requests that delete an entity of type `People`.
   */
  delete(userName: string): DeleteRequestBuilder<People<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `People`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `People` by taking the entity as a parameter.
   */
  delete(entity: People<T>): DeleteRequestBuilder<People<T>, T>;
  delete(userNameOrEntity: any): DeleteRequestBuilder<People<T>, T> {
    return new DeleteRequestBuilder<People<T>, T>(
      this.entityApi,
      userNameOrEntity instanceof People
        ? userNameOrEntity
        : { UserName: userNameOrEntity! }
    );
  }
}
