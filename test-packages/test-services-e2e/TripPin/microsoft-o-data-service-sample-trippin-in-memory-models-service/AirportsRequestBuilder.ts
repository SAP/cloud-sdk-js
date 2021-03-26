/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  RequestBuilder,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  CreateRequestBuilderV4,
  UpdateRequestBuilderV4,
  DeleteRequestBuilderV4
} from '@sap-cloud-sdk/core';
import { Airports } from './Airports';

/**
 * Request builder class for operations supported on the [[Airports]] entity.
 */
export class AirportsRequestBuilder extends RequestBuilder<Airports> {
  /**
   * Returns a request builder for retrieving one `Airports` entity based on its keys.
   * @param icaoCode Key property. See [[Airports.icaoCode]].
   * @returns A request builder for creating requests to retrieve one `Airports` entity based on its keys.
   */
  getByKey(icaoCode: string): GetByKeyRequestBuilderV4<Airports> {
    return new GetByKeyRequestBuilderV4(Airports, { IcaoCode: icaoCode });
  }

  /**
   * Returns a request builder for querying all `Airports` entities.
   * @returns A request builder for creating requests to retrieve all `Airports` entities.
   */
  getAll(): GetAllRequestBuilderV4<Airports> {
    return new GetAllRequestBuilderV4(Airports);
  }

  /**
   * Returns a request builder for creating a `Airports` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Airports`.
   */
  create(entity: Airports): CreateRequestBuilderV4<Airports> {
    return new CreateRequestBuilderV4(Airports, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `Airports`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Airports`.
   */
  update(entity: Airports): UpdateRequestBuilderV4<Airports> {
    return new UpdateRequestBuilderV4(Airports, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `Airports`.
   * @param icaoCode Key property. See [[Airports.icaoCode]].
   * @returns A request builder for creating requests that delete an entity of type `Airports`.
   */
  delete(icaoCode: string): DeleteRequestBuilderV4<Airports>;
  /**
   * Returns a request builder for deleting an entity of type `Airports`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Airports` by taking the entity as a parameter.
   */
  delete(entity: Airports): DeleteRequestBuilderV4<Airports>;
  delete(icaoCodeOrEntity: any): DeleteRequestBuilderV4<Airports> {
    return new DeleteRequestBuilderV4(
      Airports,
      icaoCodeOrEntity instanceof Airports
        ? icaoCodeOrEntity
        : { IcaoCode: icaoCodeOrEntity! }
    );
  }
}
