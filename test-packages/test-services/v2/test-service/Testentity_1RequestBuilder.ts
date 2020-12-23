/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder } from '@sap-cloud-sdk/core';
import { Testentity_1 } from './Testentity_1';

/**
 * Request builder class for operations supported on the [[Testentity_1]] entity.
 */
export class Testentity_1RequestBuilder extends RequestBuilder<Testentity_1> {
  /**
   * Returns a request builder for retrieving one `Testentity_1` entity based on its keys.
   * @param keyPropertyGuid Key property. See [[Testentity_1.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[Testentity_1.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `Testentity_1` entity based on its keys.
   */
  getByKey(keyPropertyGuid: string, keyPropertyString: string): GetByKeyRequestBuilder<Testentity_1> {
    return new GetByKeyRequestBuilder(Testentity_1, {
      KeyPropertyGuid: keyPropertyGuid,
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `Testentity_1` entities.
   * @returns A request builder for creating requests to retrieve all `Testentity_1` entities.
   */
  getAll(): GetAllRequestBuilder<Testentity_1> {
    return new GetAllRequestBuilder(Testentity_1);
  }

  /**
   * Returns a request builder for creating a `Testentity_1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Testentity_1`.
   */
  create(entity: Testentity_1): CreateRequestBuilder<Testentity_1> {
    return new CreateRequestBuilder(Testentity_1, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `Testentity_1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Testentity_1`.
   */
  update(entity: Testentity_1): UpdateRequestBuilder<Testentity_1> {
    return new UpdateRequestBuilder(Testentity_1, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `Testentity_1`.
   * @param keyPropertyGuid Key property. See [[Testentity_1.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[Testentity_1.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `Testentity_1`.
   */
  delete(keyPropertyGuid: string, keyPropertyString: string): DeleteRequestBuilder<Testentity_1>;
  /**
   * Returns a request builder for deleting an entity of type `Testentity_1`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Testentity_1` by taking the entity as a parameter.
   */
  delete(entity: Testentity_1): DeleteRequestBuilder<Testentity_1>;
  delete(keyPropertyGuidOrEntity: any, keyPropertyString?: string): DeleteRequestBuilder<Testentity_1> {
    return new DeleteRequestBuilder(Testentity_1, keyPropertyGuidOrEntity instanceof Testentity_1 ? keyPropertyGuidOrEntity : {
      KeyPropertyGuid: keyPropertyGuidOrEntity!,
      KeyPropertyString: keyPropertyString!
    });
  }
}
