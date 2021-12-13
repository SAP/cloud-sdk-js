import {
  TestEntityApi,
  TestEntityCircularLinkChildApi,
  TestEntityCircularLinkParentApi,
  TestEntityLvl2MultiLinkApi,
  TestEntityMultiLinkApi,
  TestEntitySingleLinkApi,
  TestEntityWithEnumKeyApi
} from '@sap-cloud-sdk/test-services/v4/test-service';

export const testEntityApi = new TestEntityApi();
export const testEntityMultiLinkApi = new TestEntityMultiLinkApi();
export const testEntitySingleLinkApi = new TestEntitySingleLinkApi();
export const testEntityLvl2MultiLinkApi = new TestEntityLvl2MultiLinkApi();
export const testEntityWithEnumKeyApi = new TestEntityWithEnumKeyApi();
export const testEntityCircularLinkParentApi = new TestEntityCircularLinkParentApi();
export const testEntityCircularLinkChildApi = new TestEntityCircularLinkChildApi();
