/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Entity, OneToOneLink } from '@sap-cloud-sdk/core';
import {
  TestEntity,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/test-service';

// $ExpectType OneToOneLink<TestEntity, TestEntitySingleLink>
new OneToOneLink('TestEntitySingleLink', TestEntity, TestEntitySingleLink);

// $ExpectError
new OneToOneLink('SomeWrongLink', TestEntity, Entity);
