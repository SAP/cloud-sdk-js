import { createUriConverter } from '@sap-cloud-sdk/odata-common/internal';
import {
  TestEntity,
  testService
} from '@sap-cloud-sdk/test-services/v2/test-service';
import { defaultDeSerializers } from '../../src';

export const {
  testEntityApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi,
  testEntityLvl2MultiLinkApi,
  testEntityLvl2SingleLinkApi
} = testService();

export function createTestEntity(
  originalData: Record<string, any>
): TestEntity {
  const entityBuilder = testEntityApi.entityBuilder();

  if ('KeyPropertyGuid' in originalData) {
    entityBuilder.keyPropertyGuid(originalData.KeyPropertyGuid);
  }
  if ('KeyPropertyString' in originalData) {
    entityBuilder.keyPropertyString(originalData.KeyPropertyString);
  }
  if ('StringProperty' in originalData) {
    entityBuilder.stringProperty(originalData.StringProperty);
  }
  if ('BooleanProperty' in originalData) {
    entityBuilder.booleanProperty(originalData.BooleanProperty);
  }
  if ('Int16Property' in originalData) {
    entityBuilder.int16Property(originalData.Int16Property);
  }
  const entity = entityBuilder.build().setOrInitializeRemoteState();

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

export function testEntityResourcePath(guid, str): string {
  return `A_TestEntity(KeyPropertyGuid=${createUriConverter(
    defaultDeSerializers
  )(guid, 'Edm.Guid')},KeyPropertyString='${str}')`;
}
