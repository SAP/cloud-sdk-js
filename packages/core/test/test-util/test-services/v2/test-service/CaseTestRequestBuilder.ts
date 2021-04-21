/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  RequestBuilder,
  GetAllRequestBuilderV2,
  GetByKeyRequestBuilderV2,
  CreateRequestBuilderV2,
  UpdateRequestBuilderV2,
  DeleteRequestBuilderV2
} from '../../../../../src';
import { CaseTest } from './CaseTest';

/**
 * Request builder class for operations supported on the [[CaseTest]] entity.
 */
export class CaseTestRequestBuilder extends RequestBuilder<CaseTest> {
  /**
   * Returns a request builder for retrieving one `CaseTest` entity based on its keys.
   * @param keyPropertyString Key property. See [[CaseTest.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `CaseTest` entity based on its keys.
   */
  getByKey(keyPropertyString: string): GetByKeyRequestBuilderV2<CaseTest> {
    return new GetByKeyRequestBuilderV2(CaseTest, {
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `CaseTest` entities.
   * @returns A request builder for creating requests to retrieve all `CaseTest` entities.
   */
  getAll(): GetAllRequestBuilderV2<CaseTest> {
    return new GetAllRequestBuilderV2(CaseTest);
  }

  /**
   * Returns a request builder for creating a `CaseTest` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CaseTest`.
   */
  create(entity: CaseTest): CreateRequestBuilderV2<CaseTest> {
    return new CreateRequestBuilderV2(CaseTest, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `CaseTest`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `CaseTest`.
   */
  update(entity: CaseTest): UpdateRequestBuilderV2<CaseTest> {
    return new UpdateRequestBuilderV2(CaseTest, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `CaseTest`.
   * @param keyPropertyString Key property. See [[CaseTest.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `CaseTest`.
   */
  delete(keyPropertyString: string): DeleteRequestBuilderV2<CaseTest>;
  /**
   * Returns a request builder for deleting an entity of type `CaseTest`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `CaseTest` by taking the entity as a parameter.
   */
  delete(entity: CaseTest): DeleteRequestBuilderV2<CaseTest>;
  delete(keyPropertyStringOrEntity: any): DeleteRequestBuilderV2<CaseTest> {
    return new DeleteRequestBuilderV2(
      CaseTest,
      keyPropertyStringOrEntity instanceof CaseTest
        ? keyPropertyStringOrEntity
        : { KeyPropertyString: keyPropertyStringOrEntity! }
    );
  }
}
