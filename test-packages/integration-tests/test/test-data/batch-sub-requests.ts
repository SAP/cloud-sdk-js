import { testEntityApi, testEntityMultiLinkApi } from '../v2/test-util';
import {
  testEntityKeyPropGuid,
  testEntityKeyPropString,
  testEntityMultiLinkKeyProp
} from './keys';

export const getAllRequest = testEntityApi.requestBuilder().getAll();
export const getByKeyRequest = testEntityApi
  .requestBuilder()
  .getByKey(testEntityKeyPropGuid, testEntityKeyPropString);

export const createRequest = testEntityApi
  .requestBuilder()
  .create(
    testEntityApi
      .entityBuilder()
      .stringProperty('stringProp')
      .int16Property(16)
      .booleanProperty(false)
      .build()
  );

export const createAsChildOfRequest = testEntityMultiLinkApi
  .requestBuilder()
  .create(
    testEntityMultiLinkApi
      .entityBuilder()
      .stringProperty('multiLinkStringProp')
      .build()
  )
  .asChildOf(
    testEntityApi
      .entityBuilder()
      .keyPropertyGuid(testEntityKeyPropGuid)
      .keyPropertyString(testEntityKeyPropString)
      .build(),
    testEntityApi.schema.TO_MULTI_LINK
  );

export const patchRequest = testEntityMultiLinkApi
  .requestBuilder()
  .update(
    testEntityMultiLinkApi
      .entityBuilder()
      .keyProperty(testEntityMultiLinkKeyProp)
      .stringProperty('multiLinkStringProp')
      .build()
  );

export const testEntity = testEntityApi
  .entityBuilder()
  .keyPropertyGuid(testEntityKeyPropGuid)
  .keyPropertyString(testEntityKeyPropString)
  .build()
  .setOrInitializeRemoteState();

testEntity.stringProperty = 'newStringProp';

export const putRequest = testEntityApi
  .requestBuilder()
  .update(testEntity)
  .replaceWholeEntityWithPut();

export const deleteRequest = testEntityApi
  .requestBuilder()
  .delete(
    testEntityApi
      .entityBuilder()
      .keyPropertyGuid(testEntityKeyPropGuid)
      .keyPropertyString(testEntityKeyPropString)
      .build()
  )
  .ignoreVersionIdentifier();

export const createRequestWithAppendPath = testEntityApi
  .requestBuilder()
  .create(
    testEntityApi
      .entityBuilder()
      .stringProperty('stringProp')
      .withCustomFields({ customPropKey: 'customPropVal' })
      .build()
  )
  .appendPath('/$links', '/to_MultiLink');
