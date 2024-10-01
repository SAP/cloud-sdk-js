import { createUriConverter } from '@sap-cloud-sdk/odata-common/internal';
import { testService } from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import { customTestDeSerializers } from '../../../../test-resources/test/test-util';
import { defaultDeSerializers } from '../../src';
import type {
  TestEntity,
  TestEntityWithEnumKey
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';

export const {
  testEntityApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi,
  testEntityLvl2MultiLinkApi,
  testEntityLvl2SingleLinkApi,
  testEntityWithEnumKeyApi,
  testEntityCircularLinkParentApi,
  testEntityCircularLinkChildApi
} = testService();

export const { testEntityApi: testEntityApiCustom } = testService(
  customTestDeSerializers
);

export function createTestEntity(originalData): TestEntity {
  const entity = testEntityApi
    .entityBuilder()
    .keyPropertyGuid(originalData.KeyPropertyGuid)
    .keyPropertyString(originalData.KeyPropertyString)
    .keyDateProperty(originalData.KeyDateProperty)
    .stringProperty(originalData.StringProperty)
    .booleanProperty(originalData.BooleanProperty)
    .int16Property(originalData.Int16Property)
    .enumProperty(originalData.EnumProperty)
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

export function createTestEntityWithEnumKey(
  originalData
): TestEntityWithEnumKey {
  return testEntityWithEnumKeyApi
    .entityBuilder()
    .keyPropertyEnum1(originalData.KeyPropertyEnum1)
    .build()
    .setOrInitializeRemoteState();
}

export function testEntityResourcePath(guid, str, date): string {
  return `A_TestEntity(KeyPropertyGuid=${createUriConverter(
    defaultDeSerializers
  )(
    guid,
    'Edm.Guid'
  )},KeyPropertyString='${str}',KeyDateProperty=${createUriConverter(
    defaultDeSerializers
  )(date, 'Edm.Date')})`;
}
