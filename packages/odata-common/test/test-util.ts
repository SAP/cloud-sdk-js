import { commonUriConverter } from '@sap-cloud-sdk/test-services-odata-common/common-request-config';

export function testEntityResourcePath(guid, str): string {
  return `A_CommonEntity(KeyPropertyGuid=${commonUriConverter(
    guid,
    'Edm.Guid'
  )},KeyPropertyString='${str}')`;
}
