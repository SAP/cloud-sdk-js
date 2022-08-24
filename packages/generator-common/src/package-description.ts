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
