import { testService } from '@sap-cloud-sdk/test-services/v4/test-service';

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
