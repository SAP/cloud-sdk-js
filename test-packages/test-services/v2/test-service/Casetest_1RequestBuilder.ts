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
} from '@sap-cloud-sdk/odata-v2';
import { Casetest_1 } from './Casetest_1';

/**
 * Request builder class for operations supported on the [[Casetest_1]] entity.
 */
export class Casetest_1RequestBuilder extends RequestBuilder<Casetest_1> {
  /**
   * Returns a request builder for retrieving one `Casetest_1` entity based on its keys.
   * @param keyPropertyString Key property. See [[Casetest_1.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `Casetest_1` entity based on its keys.
   */
  getByKey(keyPropertyString: string): GetByKeyRequestBuilder<Casetest_1> {
    return new GetByKeyRequestBuilder(Casetest_1, {
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `Casetest_1` entities.
   * @returns A request builder for creating requests to retrieve all `Casetest_1` entities.
   */
  getAll(): GetAllRequestBuilder<Casetest_1> {
    return new GetAllRequestBuilder(Casetest_1);
  }

  /**
   * Returns a request builder for creating a `Casetest_1` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Casetest_1`.
   */
  create(entity: Casetest_1): CreateRequestBuilder<Casetest_1> {
    return new CreateRequestBuilder(Casetest_1, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `Casetest_1`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Casetest_1`.
   */
  update(entity: Casetest_1): UpdateRequestBuilder<Casetest_1> {
    return new UpdateRequestBuilder(Casetest_1, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `Casetest_1`.
   * @param keyPropertyString Key property. See [[Casetest_1.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `Casetest_1`.
   */
  delete(keyPropertyString: string): DeleteRequestBuilder<Casetest_1>;
  /**
   * Returns a request builder for deleting an entity of type `Casetest_1`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Casetest_1` by taking the entity as a parameter.
   */
  delete(entity: Casetest_1): DeleteRequestBuilder<Casetest_1>;
  delete(keyPropertyStringOrEntity: any): DeleteRequestBuilder<Casetest_1> {
    return new DeleteRequestBuilder(
      Casetest_1,
      keyPropertyStringOrEntity instanceof Casetest_1
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity! }
    );
  }
}
