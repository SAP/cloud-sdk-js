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
import { CaseTest } from './CaseTest';

/**
 * Request builder class for operations supported on the {@link CaseTest} entity.
 */
export class CaseTestRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<CaseTest<T>, T> {
  /**
   * Returns a request builder for retrieving one `CaseTest` entity based on its keys.
   * @param keyPropertyString Key property. See {@link CaseTest.keyPropertyString}.
   * @returns A request builder for creating requests to retrieve one `CaseTest` entity based on its keys.
   */
  getByKey(
    keyPropertyString: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<CaseTest<T>, T> {
    return new GetByKeyRequestBuilder<CaseTest<T>, T>(this.entityApi, {
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `CaseTest` entities.
   * @returns A request builder for creating requests to retrieve all `CaseTest` entities.
   */
  getAll(): GetAllRequestBuilder<CaseTest<T>, T> {
    return new GetAllRequestBuilder<CaseTest<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `CaseTest` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CaseTest`.
   */
  create(entity: CaseTest<T>): CreateRequestBuilder<CaseTest<T>, T> {
    return new CreateRequestBuilder<CaseTest<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `CaseTest`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CaseTest`.
   */
  update(entity: CaseTest<T>): UpdateRequestBuilder<CaseTest<T>, T> {
    return new UpdateRequestBuilder<CaseTest<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `CaseTest`.
   * @param keyPropertyString Key property. See {@link CaseTest.keyPropertyString}.
   * @returns A request builder for creating requests that delete an entity of type `CaseTest`.
   */
  delete(keyPropertyString: string): DeleteRequestBuilder<CaseTest<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `CaseTest`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `CaseTest` by taking the entity as a parameter.
   */
  delete(entity: CaseTest<T>): DeleteRequestBuilder<CaseTest<T>, T>;
  delete(keyPropertyStringOrEntity: any): DeleteRequestBuilder<CaseTest<T>, T> {
    return new DeleteRequestBuilder<CaseTest<T>, T>(
      this.entityApi,
      keyPropertyStringOrEntity instanceof CaseTest
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity! }
    );
  }
}
