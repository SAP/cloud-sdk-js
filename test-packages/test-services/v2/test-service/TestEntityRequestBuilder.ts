/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DefaultDeSerializers as DeSerializersCommon,
  defaultDeSerializersRaw as defaultDeSerializersRawCommon,
  Time
} from '@sap-cloud-sdk/odata-common';
import {
  DeSerializersBASE,
  DeserializedType
} from '@sap-cloud-sdk/odata-common/dist/de-serializers/de-serializers';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder,
  DefaultDeSerializers,
  defaultDeSerializers
} from '@sap-cloud-sdk/odata-v2';
import { DeSerializers } from '@sap-cloud-sdk/odata-v2/internal';
import { CustomDeSerializers } from '@sap-cloud-sdk/odata-v2/internal';

import { RequestBuilder } from '@sap-cloud-sdk/odata-v2/internal';

import { TestEntity } from './TestEntity';

/**
 * Request builder class for operations supported on the [[TestEntity]] entity.
 */
export class TestEntityRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<TestEntity<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntity` entity based on its keys.
   * @param keyPropertyGuid Key property. See [[TestEntity.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[TestEntity.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity` entity based on its keys.
   */
  getByKey(
    keyPropertyGuid: DeserializedType<T, 'Edm.Guid'>,
    keyPropertyString: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<TestEntity<T>> {
    return new GetByKeyRequestBuilder(
      TestEntity,
      {
        KeyPropertyGuid: keyPropertyGuid,
        KeyPropertyString: keyPropertyString
      },
      this.deSerializers
    );
  }

  /**
   * Returns a request builder for querying all `TestEntity` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntity<T>, T> {
    return new GetAllRequestBuilder<TestEntity<T>, T>(
      this.entityApi.entityConstructor,
      this.entityApi.deSerializers,
      this.entityApi.schema
    );
  }

  /**
   * Returns a request builder for creating a `TestEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity`.
   */
  create(entity: TestEntity): CreateRequestBuilder<TestEntity> {
    return new CreateRequestBuilder(TestEntity, entity, this.deSerializers);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity`.
   */
  update(entity: TestEntity): UpdateRequestBuilder<TestEntity> {
    return new UpdateRequestBuilder(TestEntity, entity, this.deSerializers);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param keyPropertyGuid Key property. See [[TestEntity.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[TestEntity.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity`.
   */
  delete(
    keyPropertyGuid: string,
    keyPropertyString: string
  ): DeleteRequestBuilder<TestEntity>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity` by taking the entity as a parameter.
   */
  delete(entity: TestEntity): DeleteRequestBuilder<TestEntity>;
  delete(
    keyPropertyGuidOrEntity: any,
    keyPropertyString?: string
  ): DeleteRequestBuilder<TestEntity> {
    return new DeleteRequestBuilder(
      TestEntity,
      keyPropertyGuidOrEntity instanceof TestEntity
        ? keyPropertyGuidOrEntity
        : {
            KeyPropertyGuid: keyPropertyGuidOrEntity!,
            KeyPropertyString: keyPropertyString!
          },
      this.deSerializers
    );
  }
}
