/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilderV2, GetByKeyRequestBuilderV2, CreateRequestBuilderV2, UpdateRequestBuilderV2, DeleteRequestBuilderV2 } from '@sap-cloud-sdk/core';
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
  getByKey(keyProperty: string): GetByKeyRequestBuilderV2<MultiSchemaTestEntity> {
    return new GetByKeyRequestBuilderV2(MultiSchemaTestEntity, { KeyProperty: keyProperty });
  }

  /**
   * Returns a request builder for querying all `MultiSchemaTestEntity` entities.
   * @returns A request builder for creating requests to retrieve all `MultiSchemaTestEntity` entities.
   */
  getAll(): GetAllRequestBuilderV2<MultiSchemaTestEntity> {
    return new GetAllRequestBuilderV2(MultiSchemaTestEntity);
  }

  /**
   * Returns a request builder for creating a `MultiSchemaTestEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `MultiSchemaTestEntity`.
   */
  create(entity: MultiSchemaTestEntity): CreateRequestBuilderV2<MultiSchemaTestEntity> {
    return new CreateRequestBuilderV2(MultiSchemaTestEntity, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `MultiSchemaTestEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `MultiSchemaTestEntity`.
   */
  update(entity: MultiSchemaTestEntity): UpdateRequestBuilderV2<MultiSchemaTestEntity> {
    return new UpdateRequestBuilderV2(MultiSchemaTestEntity, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `MultiSchemaTestEntity`.
   * @param keyProperty Key property. See [[MultiSchemaTestEntity.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `MultiSchemaTestEntity`.
   */
  delete(keyProperty: string): DeleteRequestBuilderV2<MultiSchemaTestEntity>;
  /**
   * Returns a request builder for deleting an entity of type `MultiSchemaTestEntity`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `MultiSchemaTestEntity` by taking the entity as a parameter.
   */
  delete(entity: MultiSchemaTestEntity): DeleteRequestBuilderV2<MultiSchemaTestEntity>;
  delete(keyPropertyOrEntity: any): DeleteRequestBuilderV2<MultiSchemaTestEntity> {
    return new DeleteRequestBuilderV2(MultiSchemaTestEntity, keyPropertyOrEntity instanceof MultiSchemaTestEntity ? keyPropertyOrEntity : { KeyProperty: keyPropertyOrEntity! });
  }
}
