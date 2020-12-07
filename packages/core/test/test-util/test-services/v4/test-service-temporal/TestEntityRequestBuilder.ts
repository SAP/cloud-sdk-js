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
  DeleteRequestBuilderV4,
  EntityV4, Constructable, DestinationOptions, DestinationNameAndJwt, Destination
} from '../../../../../src';
import { TestEntity as TestEntityTemporal, TestEntity } from './TestEntity';
import { DateTime } from '../../../../../src/temporal-deserializers';

/**
 * Request builder class for operations supported on the [[TestEntity]] entity.
 */
export class TestEntityRequestBuilder extends RequestBuilder<TestEntity> {
  /**
   * Returns a request builder for retrieving one `TestEntity` entity based on its keys.
   * @param keyPropertyGuid Key property. See [[TestEntity.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[TestEntity.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity` entity based on its keys.
   */
  getByKey(keyPropertyGuid: string, keyPropertyString: string): GetByKeyRequestBuilderV4<TestEntity<DateTime>> {
    return new GetByKeyRequestBuilderV4(TestEntity, {
      KeyPropertyGuid: keyPropertyGuid,
      KeyPropertyString: keyPropertyString
    });
  }

  /**
   * Returns a request builder for querying all `TestEntity` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntity<DateTime>, DateTime> {
    return new GetAllRequestBuilderV4(TestEntity);
  }

  getAllV2(): TestEntityGetAllRequestBuilder<TestEntity<DateTime>, DateTime> {
    return new TestEntityGetAllRequestBuilder(TestEntity);
  }

  /**
   * Returns a request builder for creating a `TestEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity`.
   */
  create(entity: TestEntity): CreateRequestBuilderV4<TestEntity<DateTime>> {
    return new CreateRequestBuilderV4(TestEntity, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity`.
   */
  update(entity: TestEntity): UpdateRequestBuilderV4<TestEntity<DateTime>> {
    return new UpdateRequestBuilderV4(TestEntity, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param keyPropertyGuid Key property. See [[TestEntity.keyPropertyGuid]].
   * @param keyPropertyString Key property. See [[TestEntity.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity`.
   */
  delete(keyPropertyGuid: string, keyPropertyString: string): DeleteRequestBuilderV4<TestEntity>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity` by taking the entity as a parameter.
   */
  delete(entity: TestEntity): DeleteRequestBuilderV4<TestEntity>;
  delete(keyPropertyGuidOrEntity: any, keyPropertyString?: string): DeleteRequestBuilderV4<TestEntity<DateTime>> {
    return new DeleteRequestBuilderV4(TestEntity, keyPropertyGuidOrEntity instanceof TestEntity ? keyPropertyGuidOrEntity : {
      KeyPropertyGuid: keyPropertyGuidOrEntity!,
      KeyPropertyString: keyPropertyString!
    });
  }
}

export class TestEntityGetAllRequestBuilder<
  EntityT extends EntityV4<DateTimeT>,
  DateTimeT extends DateTime
  > extends GetAllRequestBuilderV4<EntityT, DateTimeT>{
  constructor(entityConstructor: Constructable<EntityT>) {
    super(entityConstructor);
  }

  transformV4<targetDateTimeT extends DateTime>(
    dateTimeMiddleware: targetDateTimeT
  ): TestEntityGetAllRequestBuilder<TestEntity<targetDateTimeT>, targetDateTimeT> {
    const res = new TestEntityGetAllRequestBuilder(TestEntity);
    res.dateTimeMiddleware = dateTimeMiddleware;
    return res as unknown as TestEntityGetAllRequestBuilder<TestEntity<targetDateTimeT>, targetDateTimeT>;
  }

  async executeV4(destination: Destination | DestinationNameAndJwt, options?: DestinationOptions): Promise<TestEntity<DateTimeT>[]> {
    return super.execute(destination, options) as unknown as Promise<TestEntity<DateTimeT>[]>;
  }
}
