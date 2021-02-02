/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, CreateRequestBuilderV4, UpdateRequestBuilderV4, DeleteRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { TestEntitySharesEntityType } from './TestEntitySharesEntityType';

/**
 * Request builder class for operations supported on the [[TestEntitySharesEntityType]] entity.
 */
export class TestEntitySharesEntityTypeRequestBuilder extends RequestBuilder<TestEntitySharesEntityType> {
  /**
   * Returns a request builder for retrieving one `TestEntitySharesEntityType` entity based on its keys.
   * @param keyPropertyGuid Key property. See [[TestEntitySharesEntityType.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[TestEntitySharesEntityType.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntitySharesEntityType` entity based on its keys.
   */
  getByKey(keyPropertyGuid: string, keyPropertyString: string): GetByKeyRequestBuilderV4<TestEntitySharesEntityType> {
    return new GetByKeyRequestBuilderV4(TestEntitySharesEntityType, {
      KeyPropertyGuid: keyPropertyGuid,
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `TestEntitySharesEntityType` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntitySharesEntityType` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntitySharesEntityType> {
    return new GetAllRequestBuilderV4(TestEntitySharesEntityType);
  }

  /**
   * Returns a request builder for creating a `TestEntitySharesEntityType` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntitySharesEntityType`.
   */
  create(entity: TestEntitySharesEntityType): CreateRequestBuilderV4<TestEntitySharesEntityType> {
    return new CreateRequestBuilderV4(TestEntitySharesEntityType, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntitySharesEntityType`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntitySharesEntityType`.
   */
  update(entity: TestEntitySharesEntityType): UpdateRequestBuilderV4<TestEntitySharesEntityType> {
    return new UpdateRequestBuilderV4(TestEntitySharesEntityType, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntitySharesEntityType`.
   * @param keyPropertyGuid Key property. See [[TestEntitySharesEntityType.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[TestEntitySharesEntityType.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntitySharesEntityType`.
   */
  delete(keyPropertyGuid: string, keyPropertyString: string): DeleteRequestBuilderV4<TestEntitySharesEntityType>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntitySharesEntityType`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntitySharesEntityType` by taking the entity as a parameter.
   */
  delete(entity: TestEntitySharesEntityType): DeleteRequestBuilderV4<TestEntitySharesEntityType>;
  delete(keyPropertyGuidOrEntity: any, keyPropertyString?: string): DeleteRequestBuilderV4<TestEntitySharesEntityType> {
    return new DeleteRequestBuilderV4(TestEntitySharesEntityType, keyPropertyGuidOrEntity instanceof TestEntitySharesEntityType ? keyPropertyGuidOrEntity : {
      KeyPropertyGuid: keyPropertyGuidOrEntity!,
      KeyPropertyString: keyPropertyString!
    });
  }
}
