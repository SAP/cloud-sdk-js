/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  RequestBuilder,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  CreateRequestBuilderV4,
  UpdateRequestBuilderV4,
  DeleteRequestBuilderV4
} from '@sap-cloud-sdk/core';
import { People } from './People';

/**
 * Request builder class for operations supported on the [[People]] entity.
 */
export class PeopleRequestBuilder extends RequestBuilder<People> {
  /**
   * Returns a request builder for retrieving one `People` entity based on its keys.
   * @param userName Key property. See [[People.userName]].
   * @returns A request builder for creating requests to retrieve one `People` entity based on its keys.
   */
  getByKey(userName: string): GetByKeyRequestBuilderV4<People> {
    return new GetByKeyRequestBuilderV4(People, { UserName: userName });
  }

  /**
   * Returns a request builder for querying all `People` entities.
   * @returns A request builder for creating requests to retrieve all `People` entities.
   */
  getAll(): GetAllRequestBuilderV4<People> {
    return new GetAllRequestBuilderV4(People);
  }

  /**
   * Returns a request builder for creating a `People` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `People`.
   */
  create(entity: People): CreateRequestBuilderV4<People> {
    return new CreateRequestBuilderV4(People, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `People`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `People`.
   */
  update(entity: People): UpdateRequestBuilderV4<People> {
    return new UpdateRequestBuilderV4(People, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `People`.
   * @param userName Key property. See [[People.userName]].
   * @returns A request builder for creating requests that delete an entity of type `People`.
   */
  delete(userName: string): DeleteRequestBuilderV4<People>;
  /**
   * Returns a request builder for deleting an entity of type `People`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `People` by taking the entity as a parameter.
   */
  delete(entity: People): DeleteRequestBuilderV4<People>;
  delete(userNameOrEntity: any): DeleteRequestBuilderV4<People> {
    return new DeleteRequestBuilderV4(
      People,
      userNameOrEntity instanceof People
        ? userNameOrEntity
        : { UserName: userNameOrEntity! }
    );
  }
}
