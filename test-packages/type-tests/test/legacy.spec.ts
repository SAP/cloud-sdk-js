/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service-legacy';

// $ExpectType GetAllRequestBuilder<TestEntity>
TestEntity.requestBuilder()
  .getAll()
  .select(
    TestEntity.STRING_PROPERTY,
    TestEntity.TO_MULTI_LINK,
    TestEntity.TO_SINGLE_LINK
  );
