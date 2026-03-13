/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CreateRequestBuilder,
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  GetAllRequestBuilder,
  RequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestEntityWithNoKeys } from './TestEntityWithNoKeys';

/**
 * Request builder class for operations supported on the {@link TestEntityWithNoKeys} entity.
 */
export class TestEntityWithNoKeysRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<TestEntityWithNoKeys<T>, T> {
  /**
   * Returns a request builder for querying all `TestEntityWithNoKeys` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityWithNoKeys` entities.
   */
  getAll(): GetAllRequestBuilder<TestEntityWithNoKeys<T>, T> {
    return new GetAllRequestBuilder<TestEntityWithNoKeys<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `TestEntityWithNoKeys` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityWithNoKeys`.
   */
  create(
    entity: TestEntityWithNoKeys<T>
  ): CreateRequestBuilder<TestEntityWithNoKeys<T>, T> {
    return new CreateRequestBuilder<TestEntityWithNoKeys<T>, T>(
      this.entityApi,
      entity
    );
  }
}
