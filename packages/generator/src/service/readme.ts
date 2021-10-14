import { unixEOL } from '@sap-cloud-sdk/util';
import { getApiSpecificUsage } from '../sdk-metadata/generation-and-usage';
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

// TODO 1728 move to a new package for reduce code duplication.
/**
 * Build the helpful links section of the readme file.
 * @returns The content of the section.
 */
export function helpfulLinksSection(): string[] {
  return [
    '## Helpful Links',
    '',
    '- [SAP Cloud SDK](https://github.com/SAP/cloud-sdk-js)',
    '- [SAP Cloud SDK Documentation portal - Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)',
    '- [SAP Cloud SDK Documentation portal - API documentation](https://sap.github.io/cloud-sdk/docs/js/api)',
    '- [developers.sap.com - Product Overview](https://developers.sap.com/topics/cloud-sdk.html)',
    '- [developers.sap.com - Tutorials](https://developers.sap.com/tutorial-navigator.html?tag=software-product:technology-platform/sap-cloud-sdk&tag=tutorial:type/tutorial&tag=programming-tool:javascript)',
    '- [Release notes](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)',
    '- [SAP API Business Hub](https://api.sap.com/)'
  ];
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
    ...addUsageExample(service),
    ...helpfulLinksSection(),
    ''
  ].join(unixEOL);
}

function addUsageExample(service: VdmServiceMetadata): string[] {
  const usageText = getApiSpecificUsage(service);
  if (usageText.instructions) {
    return [
      `## ${usageText.header}`,
      '```',
      `${usageText.instructions}`,
      '```',
      ''
    ];
  }
  return [];
}
