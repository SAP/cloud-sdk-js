import { v4 as uuid } from 'uuid';
import { uriConverter } from '../../src/odata-v2';
import {
  TestEntity,
  TestEntitySingleLink,
  TestEntityMultiLink
} from './test-services/v2/test-service';
import {
  TestEntity as TestEntityV4,
  TestEntityMultiLink as TestEntityMultiLinkV4,
  TestEntitySingleLink as TestEntitySingleLinkV4
} from './test-services/v4/test-service';

const { convertToUriFormat } = uriConverter;

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
  const entity = TestEntity.builder()
    .keyPropertyGuid(originalData.KeyPropertyGuid)
    .keyPropertyString(originalData.KeyPropertyString)
    .stringProperty(originalData.StringProperty)
    .booleanProperty(originalData.BooleanProperty)
    .int16Property(originalData.Int16Property)
    .build()
    .setOrInitializeRemoteState();
  if (originalData.to_SingleLink) {
    entity.toSingleLink = TestEntitySingleLink.builder()
      .keyProperty(originalData.to_SingleLink.KeyProperty)
      .build();
  }
  if (originalData.to_MultiLink) {
    entity.toMultiLink = originalData.to_MultiLink.map(ml =>
      TestEntityMultiLink.builder().keyProperty(ml.KeyProperty).build()
    );
  }
  return entity;
}

export function createTestEntityV4(originalData): TestEntityV4 {
  const entity = TestEntityV4.builder()
    .keyPropertyGuid(originalData.KeyPropertyGuid)
    .keyPropertyString(originalData.KeyPropertyString)
    .stringProperty(originalData.StringProperty)
    .booleanProperty(originalData.BooleanProperty)
    .int16Property(originalData.Int16Property)
    .enumProperty(originalData.EnumProperty)
    .build()
    .setOrInitializeRemoteState();
  if (originalData.to_SingleLink) {
    entity.toSingleLink = TestEntitySingleLinkV4.builder()
      .keyProperty(originalData.to_SingleLink.KeyProperty)
      .build();
  }
  if (originalData.to_MultiLink) {
    entity.toMultiLink = originalData.to_MultiLink.map(ml =>
      TestEntityMultiLinkV4.builder().keyProperty(ml.KeyProperty).build()
    );
  }
  return entity;
}

export function testEntityResourcePath(
  guid,
  str,
  toUriFormat = convertToUriFormat
): string {
  return `A_TestEntity(KeyPropertyGuid=${toUriFormat(
    guid,
    'Edm.Guid'
  )},KeyPropertyString='${str}')`;
}

// v4 toUriFormat
