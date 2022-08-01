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
} from '@sap-cloud-sdk/odata-v2';
import { MultiSchemaTestEntity } from './MultiSchemaTestEntity';

/**
 * Request builder class for operations supported on the {@link MultiSchemaTestEntity} entity.
 */
export class MultiSchemaTestEntityRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<MultiSchemaTestEntity<T>, T> {
  /**
   * Returns a request builder for retrieving one `MultiSchemaTestEntity` entity based on its keys.
   * @param keyProperty Key property. See {@link MultiSchemaTestEntity.keyProperty}.
   * @returns A request builder for creating requests to retrieve one `MultiSchemaTestEntity` entity based on its keys.
   */
  getByKey(
    keyProperty: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<MultiSchemaTestEntity<T>, T> {
    return new GetByKeyRequestBuilder<MultiSchemaTestEntity<T>, T>(
      this.entityApi,
      { KeyProperty: keyProperty }
    );
  }

  /**
   * Returns a request builder for querying all `MultiSchemaTestEntity` entities.
   * @returns A request builder for creating requests to retrieve all `MultiSchemaTestEntity` entities.
   */
  getAll(): GetAllRequestBuilder<MultiSchemaTestEntity<T>, T> {
    return new GetAllRequestBuilder<MultiSchemaTestEntity<T>, T>(
      this.entityApi
    );
  }

  /**
   * Returns a request builder for creating a `MultiSchemaTestEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `MultiSchemaTestEntity`.
   */
  create(
    entity: MultiSchemaTestEntity<T>
  ): CreateRequestBuilder<MultiSchemaTestEntity<T>, T> {
    return new CreateRequestBuilder<MultiSchemaTestEntity<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for updating an entity of type `MultiSchemaTestEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `MultiSchemaTestEntity`.
   */
  update(
    entity: MultiSchemaTestEntity<T>
  ): UpdateRequestBuilder<MultiSchemaTestEntity<T>, T> {
    return new UpdateRequestBuilder<MultiSchemaTestEntity<T>, T>(
      this.entityApi,
      entity
    );
  }

  /**
   * Returns a request builder for deleting an entity of type `MultiSchemaTestEntity`.
   * @param keyProperty Key property. See {@link MultiSchemaTestEntity.keyProperty}.
   * @returns A request builder for creating requests that delete an entity of type `MultiSchemaTestEntity`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilder<MultiSchemaTestEntity<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `MultiSchemaTestEntity`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `MultiSchemaTestEntity` by taking the entity as a parameter.
   */
  delete(
    entity: MultiSchemaTestEntity<T>
  ): DeleteRequestBuilder<MultiSchemaTestEntity<T>, T>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<MultiSchemaTestEntity<T>, T> {
    return new DeleteRequestBuilder<MultiSchemaTestEntity<T>, T>(
      this.entityApi,
      keyPropertyOrEntity instanceof MultiSchemaTestEntity
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
