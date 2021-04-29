import { unixEOL } from '@sap-cloud-sdk/util';
import { OpenApiDocument } from '../openapi-types';
/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Generate the readme for an openapi client.
 * @param openApiDocument Parsed service.
 * @returns The readme contents.
 */
export function readme(openApiDocument: OpenApiDocument): string {
  return `# ${openApiDocument.serviceConfig.packageName}

This package contains the OpenAPI client for the ${openApiDocument.serviceName}.

${helpfulLinksSection().join(unixEOL)}
    
`;
}

// TODO 1728 move to a new package for reduce code duplication.
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
