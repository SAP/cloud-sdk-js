import { OpenApiDocument } from '@sap-cloud-sdk/openapi-generator/src/openapi-types';
import { VdmServiceMetadata } from '@sap-cloud-sdk/generator/src/vdm-types';

/**
 * @internal
 */
const isODataMetaData = (
  data: VdmServiceMetadata | OpenApiDocument
): data is VdmServiceMetadata =>
  !!(data as VdmServiceMetadata).apiBusinessHubMetadata;

/**
 * @internal
 */
export function packageDescription(
  data: VdmServiceMetadata | OpenApiDocument
): string {
  const serviceName = isODataMetaData(data)
    ? data.speakingModuleName
    : data.serviceOptions.packageName;
  return `SAP Cloud SDK for JavaScript: Generated client for service ${serviceName}`;
}
