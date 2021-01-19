/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  RequestBuilder,
  GetAllRequestBuilderV4,
  EntityV4, Constructable, DestinationOptions, DestinationNameAndJwt, Destination, DTMiddlewareInterface
} from '../../../../../src';
import { TestEntity as TestEntityTemporal, TestEntity } from './TestEntity';

/**
 * Request builder class for operations supported on the [[TestEntity]] entity.
 */
export class TestEntityRequestBuilder<T1 = string, T2 = number> extends RequestBuilder<TestEntity<T1, T2>> {
  // A new class is needed to solve the nested generic type
  getAll(): TestEntityGetAllRequestBuilder<TestEntity> {
    return new TestEntityGetAllRequestBuilder(TestEntity) as any;
  }
}

export class TestEntityGetAllRequestBuilder<
  EntityT extends EntityV4<T1, T2>,
  T1 = string,
  T2 = number
  > extends GetAllRequestBuilderV4<EntityT>{
  constructor(entityConstructor: Constructable<EntityT>) {
    super(entityConstructor);
  }

  transform<newT1, newT2>(
    middleware: DTMiddlewareInterface<newT1, newT2>
  ): TestEntityGetAllRequestBuilder<TestEntity<newT1, newT2>, newT1, newT2> {
    const res = new TestEntityGetAllRequestBuilder(TestEntity);
    res.dateTimeMiddleware = middleware as any;
    return res as any;
  }
}
