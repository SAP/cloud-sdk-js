/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
import { DefaultDeSerializers, DeSerializers, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder, UpdateRequestBuilder, DeleteRequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { RequestBuilder } from '@sap-cloud-sdk/odata-v4/internal';
import { TestEntityLvl3MultiLink } from './TestEntityLvl3MultiLink';

/**
 * Request builder class for operations supported on the [[TestEntityLvl3MultiLink]] entity.
 */
export class TestEntityLvl3MultiLinkRequestBuilder<T extends DeSerializers = DefaultDeSerializers> extends RequestBuilder<TestEntityLvl3MultiLink<T>, T> {
  /**
   * Returns a request builder for retrieving one `TestEntityLvl3MultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityLvl3MultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityLvl3MultiLink` entity based on its keys.
   */
  getByKey(keyProperty: DeserializedType<T, 'Edm.String'>): GetByKeyRequestBuilder<TestEntityLvl3MultiLink<T>, T> {
    return new GetByKeyRequestBuilder<TestEntityLvl3MultiLink<T>, T>(this.entityApi, { KeyProperty: keyProperty });
  }

  /**
   * Returns a request builder for querying all `TestEntityLvl3MultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityLvl3MultiLink` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityLvl3MultiLink<T>, T> {
    return new GetAllRequestBuilder<TestEntityLvl3MultiLink<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `TestEntityLvl3MultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityLvl3MultiLink`.
   */
  create(entity: TestEntityLvl3MultiLink<T>): CreateRequestBuilder<TestEntityLvl3MultiLink<T>, T> {
    return new CreateRequestBuilder<TestEntityLvl3MultiLink<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityLvl3MultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityLvl3MultiLink`.
   */
  update(entity: TestEntityLvl3MultiLink<T>): UpdateRequestBuilder<TestEntityLvl3MultiLink<T>, T> {
    return new UpdateRequestBuilder<TestEntityLvl3MultiLink<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl3MultiLink`.
   * @param keyProperty Key property. See [[TestEntityLvl3MultiLink.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl3MultiLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilder<TestEntityLvl3MultiLink<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityLvl3MultiLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityLvl3MultiLink` by taking the entity as a parameter.
   */
  delete(entity: TestEntityLvl3MultiLink<T>): DeleteRequestBuilder<TestEntityLvl3MultiLink<T>, T>;
  delete(keyPropertyOrEntity: any): DeleteRequestBuilder<TestEntityLvl3MultiLink<T>, T> {
    return new DeleteRequestBuilder<TestEntityLvl3MultiLink<T>, T>(this.entityApi, keyPropertyOrEntity instanceof TestEntityLvl3MultiLink ? keyPropertyOrEntity : { KeyProperty: keyPropertyOrEntity! });
  }
}
