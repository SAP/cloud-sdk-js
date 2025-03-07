import { unixEOL } from '@sap-cloud-sdk/util';
import {
  helpfulLinksSection,
  usageHeaderText
} from '@sap-cloud-sdk/generator-common/internal';
import { getApiSpecificUsage } from '../sdk-metadata';
import type { VdmServiceMetadata } from '../vdm-types';

function title(service: VdmServiceMetadata): string {
  return service.serviceOptions.packageName || service.speakingModuleName;
}

function serviceReference(service: VdmServiceMetadata): string {
  const ref = service.apiBusinessHubMetadata
    ? `[${service.speakingModuleName}](${service.apiBusinessHubMetadata.url})`
    : service.speakingModuleName;
  return ref;
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

/**
 * @internal
 */
export function readme(service: VdmServiceMetadata): string {
  return [
    `# ${title(service)}`,
    '',
    `This package contains the OData VDM for the ${serviceReference(service)}.`,
    ...communicationScenarioLine(service),
    ...businessDocumentationLine(service),
    '',
    ...addUsageExample(service),
    ...helpfulLinksSection(),
    ''
  ].join(unixEOL);
}

function addUsageExample(service: VdmServiceMetadata): string[] {
  const usageText = getApiSpecificUsage(service);
  if (usageText) {
    return [`## ${usageHeaderText}`, '```', `${usageText}`, '```', ''];
  }
  return [];
}
