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
import { Airlines } from './Airlines';

/**
 * Request builder class for operations supported on the {@link Airlines} entity.
 */
export class AirlinesRequestBuilder<
  T extends DeSerializers = DefaultDeSerializers
> extends RequestBuilder<Airlines<T>, T> {
  /**
   * Returns a request builder for retrieving one `Airlines` entity based on its keys.
   * @param airlineCode Key property. See {@link Airlines.airlineCode}.
   * @returns A request builder for creating requests to retrieve one `Airlines` entity based on its keys.
   */
  getByKey(
    airlineCode: DeserializedType<T, 'Edm.String'>
  ): GetByKeyRequestBuilder<Airlines<T>, T> {
    return new GetByKeyRequestBuilder<Airlines<T>, T>(this.entityApi, {
      AirlineCode: airlineCode
    });
  }

  /**
   * Returns a request builder for querying all `Airlines` entities.
   * @returns A request builder for creating requests to retrieve all `Airlines` entities.
   */
  getAll(): GetAllRequestBuilder<Airlines<T>, T> {
    return new GetAllRequestBuilder<Airlines<T>, T>(this.entityApi);
  }

  /**
   * Returns a request builder for creating a `Airlines` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Airlines`.
   */
  create(entity: Airlines<T>): CreateRequestBuilder<Airlines<T>, T> {
    return new CreateRequestBuilder<Airlines<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `Airlines`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Airlines`.
   */
  update(entity: Airlines<T>): UpdateRequestBuilder<Airlines<T>, T> {
    return new UpdateRequestBuilder<Airlines<T>, T>(this.entityApi, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `Airlines`.
   * @param airlineCode Key property. See {@link Airlines.airlineCode}.
   * @returns A request builder for creating requests that delete an entity of type `Airlines`.
   */
  delete(airlineCode: string): DeleteRequestBuilder<Airlines<T>, T>;
  /**
   * Returns a request builder for deleting an entity of type `Airlines`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Airlines` by taking the entity as a parameter.
   */
  delete(entity: Airlines<T>): DeleteRequestBuilder<Airlines<T>, T>;
  delete(airlineCodeOrEntity: any): DeleteRequestBuilder<Airlines<T>, T> {
    return new DeleteRequestBuilder<Airlines<T>, T>(
      this.entityApi,
      airlineCodeOrEntity instanceof Airlines
        ? airlineCodeOrEntity
        : { AirlineCode: airlineCodeOrEntity! }
    );
  }
}
