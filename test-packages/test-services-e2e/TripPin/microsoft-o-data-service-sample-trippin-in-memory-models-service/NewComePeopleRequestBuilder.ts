/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, CreateRequestBuilderV4, UpdateRequestBuilderV4, DeleteRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { NewComePeople } from './NewComePeople';

/**
 * Request builder class for operations supported on the [[NewComePeople]] entity.
 */
export class NewComePeopleRequestBuilder extends RequestBuilder<NewComePeople> {
  /**
   * Returns a request builder for retrieving one `NewComePeople` entity based on its keys.
   * @param userName Key property. See [[NewComePeople.userName]].
   * @returns A request builder for creating requests to retrieve one `NewComePeople` entity based on its keys.
   */
  getByKey(userName: string): GetByKeyRequestBuilderV4<NewComePeople> {
    return new GetByKeyRequestBuilderV4(NewComePeople, { UserName: userName });
  }

  /**
   * Returns a request builder for querying all `NewComePeople` entities.
   * @returns A request builder for creating requests to retrieve all `NewComePeople` entities.
   */
  getAll(): GetAllRequestBuilderV4<NewComePeople> {
    return new GetAllRequestBuilderV4(NewComePeople);
  }

  /**
   * Returns a request builder for creating a `NewComePeople` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `NewComePeople`.
   */
  create(entity: NewComePeople): CreateRequestBuilderV4<NewComePeople> {
    return new CreateRequestBuilderV4(NewComePeople, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `NewComePeople`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `NewComePeople`.
   */
  update(entity: NewComePeople): UpdateRequestBuilderV4<NewComePeople> {
    return new UpdateRequestBuilderV4(NewComePeople, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `NewComePeople`.
   * @param userName Key property. See [[NewComePeople.userName]].
   * @returns A request builder for creating requests that delete an entity of type `NewComePeople`.
   */
  delete(userName: string): DeleteRequestBuilderV4<NewComePeople>;
  /**
   * Returns a request builder for deleting an entity of type `NewComePeople`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `NewComePeople` by taking the entity as a parameter.
   */
  delete(entity: NewComePeople): DeleteRequestBuilderV4<NewComePeople>;
  delete(userNameOrEntity: any): DeleteRequestBuilderV4<NewComePeople> {
    return new DeleteRequestBuilderV4(NewComePeople, userNameOrEntity instanceof NewComePeople ? userNameOrEntity : { UserName: userNameOrEntity! });
  }
}
