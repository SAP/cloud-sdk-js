import { testService } from '@sap-cloud-sdk/test-services/v2/test-service';

export const {
  testEntityApi,
  testEntityCircularLinkChildApi,
  testEntityCircularLinkParentApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} = testService();
