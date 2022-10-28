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
import { Casetest_1 } from './Casetest_1';

/**
 * Request builder class for operations supported on the {@link Casetest_1} entity.
 */
export class Casetest_1RequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<Casetest_1<T>, T> {
  /**
   * Returns a request builder for retrieving one `Casetest_1` entity based on its keys.
   * @param keyPropertyString Key property. See {@link Casetest_1.keyPropertyString}.
   * @returns A request builder for creating requests to retrieve one `Casetest_1` entity based on its keys.
   */
  getByKey(
    keyPropertyString: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<Casetest_1<T>, T> {
    return new GetByKeyRequestBuilder<Casetest_1<T>, T>(this.entityApi, {
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `Casetest_1` entities.
   * @returns A request builder for creating requests to retrieve all `Casetest_1` entities.
   */
  getAll(): GetAllRequestBuilder<Casetest_1<T>, T> {
    return new GetAllRequestBuilder<Casetest_1<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `Casetest_1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Casetest_1`.
   */
  create(entity: Casetest_1<T>): CreateRequestBuilder<Casetest_1<T>, T> {
    return new CreateRequestBuilder<Casetest_1<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `Casetest_1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Casetest_1`.
   */
  update(entity: Casetest_1<T>): UpdateRequestBuilder<Casetest_1<T>, T> {
    return new UpdateRequestBuilder<Casetest_1<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `Casetest_1`.
   * @param keyPropertyString Key property. See {@link Casetest_1.keyPropertyString}.
   * @returns A request builder for creating requests that delete an entity of type `Casetest_1`.
   */
  delete(keyPropertyString: string): DeleteRequestBuilder<Casetest_1<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `Casetest_1`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Casetest_1` by taking the entity as a parameter.
   */
  delete(entity: Casetest_1<T>): DeleteRequestBuilder<Casetest_1<T>, T>;
  delete(
    keyPropertyStringOrEntity: any
  ): DeleteRequestBuilder<Casetest_1<T>, T> {
    return new DeleteRequestBuilder<Casetest_1<T>, T>(
      this.entityApi,
      keyPropertyStringOrEntity instanceof Casetest_1
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity! }
    );
  }
}
