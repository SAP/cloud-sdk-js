import { VdmServiceMetadata } from '@sap-cloud-sdk/generator/src/vdm-types';
import { OpenApiDocument } from '@sap-cloud-sdk/openapi-generator/src/openapi-types';

/**
 * @internal
 */
export function packageDescription(
  data: VdmServiceMetadata | OpenApiDocument
): string {
  const serviceReference = isODataMetaData(data)
    ? data.speakingModuleName
    : data.serviceOptions.packageName;
  return `SAP Cloud SDK for JavaScript: Generated client for service ${serviceReference}`;
}
