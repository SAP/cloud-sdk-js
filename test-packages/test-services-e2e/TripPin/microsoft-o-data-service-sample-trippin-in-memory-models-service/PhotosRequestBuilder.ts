/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { BigNumber } from 'bignumber.js';
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder, DeserializedType, RequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { Photos } from './Photos';

/**
 * Request builder class for operations supported on the {@link Photos} entity.
 */
export class PhotosRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<Photos<T>, T> {
  /**
   * Returns a request builder for retrieving one `Photos` entity based on its keys.
   * @param id Key property. See {@link Photos.id}.
   * @returns A request builder for creating requests to retrieve one `Photos` entity based on its keys.
   */
  getByKey(id: DeserializedType<T, 'Edm.Int64'>): GetByKeyRequestBuilder<Photos<T>, T> {
    return new GetByKeyRequestBuilder<Photos<T>, T>(this.entityApi, { Id: id });
  }

  /**
   * Returns a request builder for querying all `Photos` entities.
   * @returns A request builder for creating requests to retrieve all `Photos` entities.
   */
  getAll(): GetAllRequestBuilder<Photos<T>, T> {
    return new GetAllRequestBuilder<Photos<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `Photos` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Photos`.
   */
  create(entity: Photos<T>): CreateRequestBuilder<Photos<T>, T> {
    return new CreateRequestBuilder<Photos<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `Photos`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Photos`.
   */
  update(entity: Photos<T>): UpdateRequestBuilder<Photos<T>, T> {
    return new UpdateRequestBuilder<Photos<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `Photos`.
   * @param id Key property. See {@link Photos.id}.
   * @returns A request builder for creating requests that delete an entity of type `Photos`.
   */
  delete(id: BigNumber): DeleteRequestBuilder<Photos<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `Photos`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Photos` by taking the entity as a parameter.
   */
  delete(entity: Photos<T>): DeleteRequestBuilder<Photos<T>, T>;
  delete(idOrEntity: any): DeleteRequestBuilder<Photos<T>, T> {
    return new DeleteRequestBuilder<Photos<T>, T>(this.entityApi, idOrEntity instanceof Photos ? idOrEntity : { Id: idOrEntity! });
  }
}
