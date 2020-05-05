/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { v4 as uuid } from 'uuid';
import { convertToUriFormat } from '../../src';
import { TestEntity } from './test-services/test-service';
import { Person } from './test-services/test-service-odata-v4';

export function createPersonJson1() {
  return {
    UserName: 'user1',
    Emails: ['user1@example1.com', 'user1@example2.com']
  };
}

export function createPersonJson2() {
  return {
    UserName: 'user2',
    Emails: ['user2@example1.com', 'user2@example2.com']
  };
}

export function createPeople(originalData): Person {
  return Person.builder()
    .userName(originalData.UserName)
    .emails(originalData.Emails)
    .build()
    .setOrInitializeRemoteState();
}

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
