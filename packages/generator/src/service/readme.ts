import { helpfulLinksSection } from '@sap-cloud-sdk/util';
import { VdmServiceMetadata } from '../vdm-types';

function title(service: VdmServiceMetadata): string {
  return service.npmPackageName || service.speakingModuleName;
}

function serviceReference(
  service: VdmServiceMetadata,
  s4hanaCloud: boolean
): string {
  const ref = service.apiBusinessHubMetadata
    ? `[${service.speakingModuleName}](${service.apiBusinessHubMetadata.url})`
    : service.speakingModuleName;
  return s4hanaCloud ? `${ref} of SAP S/4HANA Cloud` : `${ref}`;
}

function communicationScenarioLine(service: VdmServiceMetadata): string[] {
  return service.apiBusinessHubMetadata &&
    service.apiBusinessHubMetadata.communicationScenario
    ? [
        `This service is part of the following communication scenarios: ${service.apiBusinessHubMetadata.communicationScenario}.`
      ]
    : [];
}

function businessDocumentationLine(service: VdmServiceMetadata): string[] {
  return service.apiBusinessHubMetadata &&
    service.apiBusinessHubMetadata.businessDocumentationUrl
    ? [
        `You can find additional documentation for this service on [help.sap.com](${service.apiBusinessHubMetadata.businessDocumentationUrl}).`
      ]
    : [];
}

export function readme(
  service: VdmServiceMetadata,
  s4hanaCloud = false
): string {
  return [
    `# ${title(service)}`,
    '',
    `This package contains the OData VDM for the ${serviceReference(
      service,
      s4hanaCloud
    )}.`,
    ...communicationScenarioLine(service),
    ...businessDocumentationLine(service),
    '',
    ...helpfulLinksSection(),
    ''
  ].join('\n');
}
