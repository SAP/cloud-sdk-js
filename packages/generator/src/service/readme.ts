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

// todo 1728 move to a new package for reduce code duplication.
/**
 * Build the helpful links section of the readme file.
 * @returns The content of the section.
 */
export function helpfulLinksSection(): string[] {
  return [
    '### Helpful Links',
    '',
    '- [SAP Cloud SDK](https://github.com/SAP/cloud-sdk-js)',
    '- [Tutorials on developers.sap.com](https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk&tag=topic:javascript)',
    '- [SAP Cloud SDK on StackOverflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk?tab=Newest)',
    '- [SAP Cloud SDK on answers.sap.com](https://answers.sap.com/tags/73555000100800000895)',
    '- [Release notes](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)',
    '- [All versions of this documentation](https://help.sap.com/viewer/product/SAP_CLOUD_SDK/1.0/en-US)',
    '- [Product page of the SAP Cloud SDK](https://developers.sap.com/topics/cloud-sdk.html)',
    '- [SAP Cloud SDK Continuous Delivery Toolkit](https://github.com/SAP/cloud-s4-sdk-pipeline)',
    '- [Example Applications using the SAP Cloud SDK](https://github.com/SAP/cloud-s4-sdk-examples)'
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
    ...helpfulLinksSection(),
    ''
  ].join('\n');
}
