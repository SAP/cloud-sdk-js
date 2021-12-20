import { v4 as uuid } from 'uuid';
import { defaultDeSerializers } from '@sap-cloud-sdk/odata-v4';
import {
  TestEntity,
  testService
} from '@sap-cloud-sdk/test-services/v2/test-service';
import {
  TestEntity as TestEntityV4,
  TestEntityWithEnumKey,
  testService as testServiceV4
} from '@sap-cloud-sdk/test-services/v4/test-service';
import { TestEnumType } from '@sap-cloud-sdk/test-services/v4/test-service/TestEnumType';
import { createUriConverter } from '@sap-cloud-sdk/odata-common/internal';

const { testEntityApi, testEntitySingleLinkApi, testEntityMultiLinkApi } =
  testService();
const {
  testEntityApi: testEntityApiV4,
  testEntityMultiLinkApi: testEntityMultiLinkApiV4,
  testEntitySingleLinkApi: testEntitySingleLinkApiV4,
  testEntityWithEnumKeyApi: testEntityWithEnumKeyApiV4
} = testServiceV4();
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
    Int16Property: 42,
    EnumProperty: 'Enum1'
  };
}

export function createOriginalTestEntityDataWithLinks() {
  return {
    KeyPropertyGuid: uuid(),
    KeyPropertyString: 'abcde',
    to_SingleLink: {
      KeyProperty: 'abc'
    },
    to_MultiLink: [
      {
        KeyProperty: 'def'
      }
    ]
  };
}

export function createTestEntity(originalData): TestEntity {
  const entity = testEntityApi
    .entityBuilder()
    .keyPropertyGuid(originalData.KeyPropertyGuid)
    .keyPropertyString(originalData.KeyPropertyString)
    .stringProperty(originalData.StringProperty)
    .booleanProperty(originalData.BooleanProperty)
    .int16Property(originalData.Int16Property)
    .build()
    .setOrInitializeRemoteState();
  if (originalData.to_SingleLink) {
    entity.toSingleLink = testEntitySingleLinkApi
      .entityBuilder()
      .keyProperty(originalData.to_SingleLink.KeyProperty)
      .build();
  }
  if (originalData.to_MultiLink) {
    entity.toMultiLink = originalData.to_MultiLink.map(ml =>
      testEntityMultiLinkApi.entityBuilder().keyProperty(ml.KeyProperty).build()
    );
  }
  return entity;
}

export function createTestEntityV4(originalData): TestEntityV4 {
  const entity = testEntityApiV4
    .entityBuilder()
    .keyPropertyGuid(originalData.KeyPropertyGuid)
    .keyPropertyString(originalData.KeyPropertyString)
    .stringProperty(originalData.StringProperty)
    .booleanProperty(originalData.BooleanProperty)
    .int16Property(originalData.Int16Property)
    .enumProperty(originalData.EnumProperty)
    .build()
    .setOrInitializeRemoteState();
  if (originalData.to_SingleLink) {
    entity.toSingleLink = testEntitySingleLinkApiV4
      .entityBuilder()
      .keyProperty(originalData.to_SingleLink.KeyProperty)
      .build();
  }
  if (originalData.to_MultiLink) {
    entity.toMultiLink = originalData.to_MultiLink.map(ml =>
      testEntityMultiLinkApiV4
        .entityBuilder()
        .keyProperty(ml.KeyProperty)
        .build()
    );
  }
  return entity;
}

export function testEntityResourcePath(
  guid,
  str,
  toUriFormat = createUriConverter(defaultDeSerializers),
  entityName = 'A_TestEntity'
): string {
  return `${entityName}(KeyPropertyGuid=${toUriFormat(
    guid,
    'Edm.Guid'
  )},KeyPropertyString='${str}')`;
}

export function createOriginalTestEntityWithEnumKeyData() {
  return {
    KeyPropertyEnum1: TestEnumType.Member1
  };
}

export function createTestEntityWithEnumKey(
  originalData
): TestEntityWithEnumKey {
  return testEntityWithEnumKeyApiV4
    .entityBuilder()
    .keyPropertyEnum1(originalData.KeyPropertyEnum1)
    .build()
    .setOrInitializeRemoteState();
}

// v4 toUriFormat
