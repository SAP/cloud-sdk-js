/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { v4 as uuid } from 'uuid';
import { convertToUriFormat } from '../../src';
import { TestEntity } from './test-services/v2/test-service';

export function createOriginalTestEntityData1() {
  return {
    KeyPropertyGuid: uuid(),
    KeyPropertyString: 'ABCDE',
    StringProperty: 'FGHIJ',
    BooleanProperty: false,
    Int16Property: 13
  };
}

export function createOriginalTestEntityData2() {
  return {
    KeyPropertyGuid: uuid(),
    KeyPropertyString: '12345',
    StringProperty: '6789',
    BooleanProperty: true,
    Int16Property: 42
  };
}

export function createTestEntity(originalData): TestEntity {
  return TestEntity.builder()
    .keyPropertyGuid(originalData.KeyPropertyGuid)
    .keyPropertyString(originalData.KeyPropertyString)
    .stringProperty(originalData.StringProperty)
    .booleanProperty(originalData.BooleanProperty)
    .int16Property(originalData.Int16Property)
    .build()
    .setOrInitializeRemoteState();
}

export function testEntityResourcePath(guid, str): string {
  return `A_TestEntity(KeyPropertyGuid=${convertToUriFormat(
    guid,
    'Edm.Guid'
  )},KeyPropertyString='${str}')`;
}
