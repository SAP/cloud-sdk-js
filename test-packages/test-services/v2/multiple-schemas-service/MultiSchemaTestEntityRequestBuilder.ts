/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder } from '@sap-cloud-sdk/odata-common/internal';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { MultiSchemaTestEntity } from './MultiSchemaTestEntity';

/**
 * Request builder class for operations supported on the [[MultiSchemaTestEntity]] entity.
 */
export class MultiSchemaTestEntityRequestBuilder extends RequestBuilder<MultiSchemaTestEntity> {
  /**
   * Returns a request builder for retrieving one `MultiSchemaTestEntity` entity based on its keys.
   * @param keyProperty Key property. See [[MultiSchemaTestEntity.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `MultiSchemaTestEntity` entity based on its keys.
   */
  getByKey(keyProperty: string): GetByKeyRequestBuilder<MultiSchemaTestEntity> {
    return new GetByKeyRequestBuilder(MultiSchemaTestEntity, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `MultiSchemaTestEntity` entities.
   * @returns A request builder for creating requests to retrieve all `MultiSchemaTestEntity` entities.
   */
  getAll(): GetAllRequestBuilder<MultiSchemaTestEntity> {
    return new GetAllRequestBuilder(MultiSchemaTestEntity);
  }

  /**
   * Returns a request builder for creating a `MultiSchemaTestEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `MultiSchemaTestEntity`.
   */
  create(
    entity: MultiSchemaTestEntity
  ): CreateRequestBuilder<MultiSchemaTestEntity> {
    return new CreateRequestBuilder(MultiSchemaTestEntity, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `MultiSchemaTestEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `MultiSchemaTestEntity`.
   */
  update(
    entity: MultiSchemaTestEntity
  ): UpdateRequestBuilder<MultiSchemaTestEntity> {
    return new UpdateRequestBuilder(MultiSchemaTestEntity, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `MultiSchemaTestEntity`.
   * @param keyProperty Key property. See [[MultiSchemaTestEntity.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `MultiSchemaTestEntity`.
   */
  delete(keyProperty: string): DeleteRequestBuilder<MultiSchemaTestEntity>;
  /**
   * Returns a request builder for deleting an entity of type `MultiSchemaTestEntity`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `MultiSchemaTestEntity` by taking the entity as a parameter.
   */
  delete(
    entity: MultiSchemaTestEntity
  ): DeleteRequestBuilder<MultiSchemaTestEntity>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilder<MultiSchemaTestEntity> {
    return new DeleteRequestBuilder(
      MultiSchemaTestEntity,
      keyPropertyOrEntity instanceof MultiSchemaTestEntity
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
