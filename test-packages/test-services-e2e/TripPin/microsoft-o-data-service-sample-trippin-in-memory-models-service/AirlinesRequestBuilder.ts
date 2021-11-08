/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder } from '@sap-cloud-sdk/odata-common';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { Airlines } from './Airlines';

/**
 * Request builder class for operations supported on the [[Airlines]] entity.
 */
export class AirlinesRequestBuilder extends RequestBuilder<Airlines> {
  /**
   * Returns a request builder for retrieving one `Airlines` entity based on its keys.
   * @param airlineCode Key property. See [[Airlines.airlineCode]].
   * @returns A request builder for creating requests to retrieve one `Airlines` entity based on its keys.
   */
  getByKey(airlineCode: string): GetByKeyRequestBuilder<Airlines> {
    return new GetByKeyRequestBuilder(Airlines, { AirlineCode: airlineCode });
  }

  /**
   * Returns a request builder for querying all `Airlines` entities.
   * @returns A request builder for creating requests to retrieve all `Airlines` entities.
   */
  getAll(): GetAllRequestBuilder<Airlines> {
    return new GetAllRequestBuilder(Airlines);
  }

  /**
   * Returns a request builder for creating a `Airlines` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Airlines`.
   */
  create(entity: Airlines): CreateRequestBuilder<Airlines> {
    return new CreateRequestBuilder(Airlines, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `Airlines`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Airlines`.
   */
  update(entity: Airlines): UpdateRequestBuilder<Airlines> {
    return new UpdateRequestBuilder(Airlines, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `Airlines`.
   * @param airlineCode Key property. See [[Airlines.airlineCode]].
   * @returns A request builder for creating requests that delete an entity of type `Airlines`.
   */
  delete(airlineCode: string): DeleteRequestBuilder<Airlines>;
  /**
   * Returns a request builder for deleting an entity of type `Airlines`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Airlines` by taking the entity as a parameter.
   */
  delete(entity: Airlines): DeleteRequestBuilder<Airlines>;
  delete(airlineCodeOrEntity: any): DeleteRequestBuilder<Airlines> {
    return new DeleteRequestBuilder(
      Airlines,
      airlineCodeOrEntity instanceof Airlines
        ? airlineCodeOrEntity
        : { AirlineCode: airlineCodeOrEntity! }
    );
  }
}
