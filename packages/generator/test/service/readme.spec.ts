/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { readme } from '../../src/service';
import {
  ApiBusinessHubMetadata,
  VdmServiceMetadata
} from '../../src/vdm-types';

const npmPackageName = 'business-partner-service';
const speakingModuleName = 'Business Partner Service';
const apiHubUrl = 'https://api.sap.com/api/API_BUSINESS_PARTNER';
const communicationScenario = 'Things, stuff and codings (SAP_COM_1234)';

describe('service readme', () => {
  it("returns the content of the package's README.md file", () => {
    expect(
      readme({
        npmPackageName,
        speakingModuleName,
        apiBusinessHubMetadata: {
          url: apiHubUrl,
          communicationScenario,
          businessDocumentationUrl: 'https://example.com'
        }
      } as VdmServiceMetadata)
    ).toBe(
      `# business-partner-service

This package contains the OData VDM for the [Business Partner Service](https://api.sap.com/api/API_BUSINESS_PARTNER).
This service is part of the following communication scenarios: Things, stuff and codings (SAP_COM_1234).
You can find additional documentation for this service on [help.sap.com](https://example.com).

### Helpful Links

- [Tutorials on developers.sap.com](https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk&tag=topic:javascript)
- [SAP Cloud SDK on StackOverflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk?tab=Newest)
- [SAP Cloud SDK on answers.sap.com](https://answers.sap.com/tags/73555000100800000895)
- [Release notes](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)
- [All versions of this documentation](https://help.sap.com/viewer/product/SAP_CLOUD_SDK/1.0/en-US)
- [Product page of the SAP Cloud SDK](https://developers.sap.com/topics/cloud-sdk.html)
- [SAP Cloud SDK Continuous Delivery Toolkit](https://github.com/SAP/cloud-s4-sdk-pipeline)
- [Example Applications using the SAP Cloud SDK](https://github.com/SAP/cloud-s4-sdk-examples)
`
    );
  });

  it('does not reference communication scenarios if non are defined', () => {
    expect(
      readme({
        npmPackageName,
        speakingModuleName,
        apiBusinessHubMetadata: {
          url: apiHubUrl,
          communicationScenario: null
        } as ApiBusinessHubMetadata
      } as VdmServiceMetadata)
    ).toBe(
      `# business-partner-service

This package contains the OData VDM for the [Business Partner Service](https://api.sap.com/api/API_BUSINESS_PARTNER).

### Helpful Links

- [Tutorials on developers.sap.com](https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk&tag=topic:javascript)
- [SAP Cloud SDK on StackOverflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk?tab=Newest)
- [SAP Cloud SDK on answers.sap.com](https://answers.sap.com/tags/73555000100800000895)
- [Release notes](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)
- [All versions of this documentation](https://help.sap.com/viewer/product/SAP_CLOUD_SDK/1.0/en-US)
- [Product page of the SAP Cloud SDK](https://developers.sap.com/topics/cloud-sdk.html)
- [SAP Cloud SDK Continuous Delivery Toolkit](https://github.com/SAP/cloud-s4-sdk-pipeline)
- [Example Applications using the SAP Cloud SDK](https://github.com/SAP/cloud-s4-sdk-examples)
`
    );
  });

  it('does not create a link if no apiBusinessHubMetada is defined', () => {
    expect(
      readme({
        npmPackageName,
        speakingModuleName
      } as VdmServiceMetadata)
    ).toBe(
      `# business-partner-service

This package contains the OData VDM for the Business Partner Service.

### Helpful Links

- [Tutorials on developers.sap.com](https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk&tag=topic:javascript)
- [SAP Cloud SDK on StackOverflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk?tab=Newest)
- [SAP Cloud SDK on answers.sap.com](https://answers.sap.com/tags/73555000100800000895)
- [Release notes](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)
- [All versions of this documentation](https://help.sap.com/viewer/product/SAP_CLOUD_SDK/1.0/en-US)
- [Product page of the SAP Cloud SDK](https://developers.sap.com/topics/cloud-sdk.html)
- [SAP Cloud SDK Continuous Delivery Toolkit](https://github.com/SAP/cloud-s4-sdk-pipeline)
- [Example Applications using the SAP Cloud SDK](https://github.com/SAP/cloud-s4-sdk-examples)
`
    );
  });
});
