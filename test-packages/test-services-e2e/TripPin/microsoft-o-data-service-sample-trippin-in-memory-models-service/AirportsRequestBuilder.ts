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
} from '@sap-cloud-sdk/odata-v4';
import { Airports } from './Airports';

/**
 * Request builder class for operations supported on the {@link Airports} entity.
 */
export class AirportsRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<Airports<T>, T> {
  /**
   * Returns a request builder for retrieving one `Airports` entity based on its keys.
   * @param icaoCode Key property. See {@link Airports.icaoCode}.
   * @returns A request builder for creating requests to retrieve one `Airports` entity based on its keys.
   */
  getByKey(
    icaoCode: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<Airports<T>, T> {
    return new GetByKeyRequestBuilder<Airports<T>, T>(this.entityApi, {
      IcaoCode: icaoCode
    });
  }

  /**
   * Returns a request builder for querying all `Airports` entities.
   * @returns A request builder for creating requests to retrieve all `Airports` entities.
   */
  getAll(): GetAllRequestBuilder<Airports<T>, T> {
    return new GetAllRequestBuilder<Airports<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `Airports` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Airports`.
   */
  create(entity: Airports<T>): CreateRequestBuilder<Airports<T>, T> {
    return new CreateRequestBuilder<Airports<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `Airports`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Airports`.
   */
  update(entity: Airports<T>): UpdateRequestBuilder<Airports<T>, T> {
    return new UpdateRequestBuilder<Airports<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `Airports`.
   * @param icaoCode Key property. See {@link Airports.icaoCode}.
   * @returns A request builder for creating requests that delete an entity of type `Airports`.
   */
  delete(icaoCode: string): DeleteRequestBuilder<Airports<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `Airports`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Airports` by taking the entity as a parameter.
   */
  delete(entity: Airports<T>): DeleteRequestBuilder<Airports<T>, T>;
  delete(icaoCodeOrEntity: any): DeleteRequestBuilder<Airports<T>, T> {
    return new DeleteRequestBuilder<Airports<T>, T>(
      this.entityApi,
      icaoCodeOrEntity instanceof Airports
        ? icaoCodeOrEntity
        : { IcaoCode: icaoCodeOrEntity! }
    );
  }
}
