/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { and, asc, desc, or } from '@sap-cloud-sdk/core';
import {
  TestComplexType,
  TestEntity
} from '@sap-cloud-sdk/test-services/v2/test-service';

// $ExpectType TestComplexTypeField<TestEntity>
TestEntity.COMPLEX_TYPE_PROPERTY;

// $ExpectType ComplexTypeStringPropertyField<TestEntity, any>
TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty;

// $ExpectType TestComplexType
TestComplexType.build({ StringProperty: 'test-1', BooleanProperty: false });

// $ExpectType GetAllRequestBuilderV2<TestEntity>
const getAllTSE = TestEntity.requestBuilder().getAll();

// $ExpectType GetAllRequestBuilderV2<TestEntity>
getAllTSE.select(TestEntity.COMPLEX_TYPE_PROPERTY);

// $ExpectError
getAllTSE.select(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty);

// $ExpectType GetAllRequestBuilderV2<TestEntity>
getAllTSE.filter(
  TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test')
);

// $ExpectType GetAllRequestBuilderV2<TestEntity>
getAllTSE.filter(
  TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
  TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
);

// $ExpectType GetAllRequestBuilderV2<TestEntity>
getAllTSE.filter(
  and(
    TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
    TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
  )
);

// $ExpectType GetAllRequestBuilderV2<TestEntity>
getAllTSE.filter(
  or(
    TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
    TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
  )
);

// $ExpectType GetAllRequestBuilderV2<TestEntity>
getAllTSE.orderBy(asc(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty));

// $ExpectType GetAllRequestBuilderV2<TestEntity>
getAllTSE.orderBy(desc(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty));

// $ExpectType GetAllRequestBuilderV2<TestEntity>
getAllTSE.orderBy(
  asc(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty),
  desc(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty)
);

getAllTSE.orderBy(
  asc(TestEntity.COMPLEX_TYPE_PROPERTY) // $ExpectError
);
