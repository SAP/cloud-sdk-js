/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { filterFunctions } from '@sap-cloud-sdk/core/v4';
import { TestEntity } from '@sap-cloud-sdk/test-services/v4/test-service';

// $ExpectType Filter<TestEntity, string>
filterFunctions
  .substring(TestEntity.STRING_PROPERTY, TestEntity.INT_16_PROPERTY)
  .equals('test');

// $ExpectType Filter<TestEntity, boolean>
filterFunctions.contains(TestEntity.STRING_PROPERTY, 'test').equals(true);
