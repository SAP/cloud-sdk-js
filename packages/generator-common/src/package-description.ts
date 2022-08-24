import { OpenApiDocument } from '@sap-cloud-sdk/openapi-generator/src/openapi-types';
import { VdmServiceMetadata } from '@sap-cloud-sdk/generator/src/vdm-types';

/**
 * @internal
 */
const isOData = (
  metadata: VdmServiceMetadata | OpenApiDocument
): metadata is VdmServiceMetadata =>
  !!(metadata as VdmServiceMetadata).apiBusinessHubMetadata;

/**
 * @internal
 */
export function packageDescription(
  metaData: VdmServiceMetadata | OpenApiDocument
): string {
  const packageName = isOData(metaData)
    ? metaData.speakingModuleName
    : metaData.serviceOptions.packageName;
  return `SAP Cloud SDK for JavaScript: Generated client for service ${packageName}`;
}
