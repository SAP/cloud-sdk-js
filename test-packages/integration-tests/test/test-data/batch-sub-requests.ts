/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  TestEntity,
  TestEntityMultiLink
} from '@sap-cloud-sdk/test-services/v2/test-service';
import {
  testEntityKeyPropGuid,
  testEntityKeyPropString,
  testEntityMultiLinkKeyProp
} from './keys';

export const getAllRequest = TestEntity.requestBuilder().getAll();
export const getByKeyRequest = TestEntity.requestBuilder().getByKey(
  testEntityKeyPropGuid,
  testEntityKeyPropString
);

export const createRequest = TestEntity.requestBuilder().create(
  TestEntity.builder()
    .stringProperty('stringProp')
    .int16Property(16)
    .booleanProperty(false)
    .build()
);

export const createAsChildOfRequest = TestEntityMultiLink.requestBuilder()
  .create(
    TestEntityMultiLink.builder().stringProperty('multiLinkStringProp').build()
  )
  .asChildOf(
    TestEntity.builder()
      .keyPropertyGuid(testEntityKeyPropGuid)
      .keyPropertyString(testEntityKeyPropString)
      .build(),
    TestEntity.TO_MULTI_LINK
  );

export const patchRequest = TestEntityMultiLink.requestBuilder().update(
  TestEntityMultiLink.builder()
    .keyProperty(testEntityMultiLinkKeyProp)
    .stringProperty('multiLinkStringProp')
    .build()
);

export const testEntity = TestEntity.builder()
  .keyPropertyGuid(testEntityKeyPropGuid)
  .keyPropertyString(testEntityKeyPropString)
  .build()
  .setOrInitializeRemoteState();

testEntity.stringProperty = 'newStringProp';

export const putRequest = TestEntity.requestBuilder()
  .update(testEntity)
  .replaceWholeEntityWithPut();

export const deleteRequest = TestEntity.requestBuilder()
  .delete(
    TestEntity.builder()
      .keyPropertyGuid(testEntityKeyPropGuid)
      .keyPropertyString(testEntityKeyPropString)
      .build()
  )
  .ignoreVersionIdentifier();
