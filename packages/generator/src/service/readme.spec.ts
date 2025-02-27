import { getExpectedHelpfulLinks } from '../../test/test-util/readme-util';
import { readme } from './readme';
import type {
  ApiBusinessHubMetadata,
  VdmOperation,
  VdmServiceMetadata
} from '../vdm-types';

const packageName = 'business-partner-service';
const speakingModuleName = 'Business Partner Service';
const apiHubUrl = 'https://api.sap.com/api/API_BUSINESS_PARTNER';
const communicationScenario = 'Things, stuff and codings (SAP_COM_1234)';

describe('service readme', () => {
  it("returns the content of the package's README.md file", () => {
    expect(
      readme({
        serviceOptions: {
          packageName
        },
        speakingModuleName,
        apiBusinessHubMetadata: {
          url: apiHubUrl,
          communicationScenario,
          businessDocumentationUrl: 'https://example.com'
        },
        operations: [] as VdmOperation[]
      } as VdmServiceMetadata)
    ).toBe(
      `# business-partner-service

This package contains the OData VDM for the [Business Partner Service](https://api.sap.com/api/API_BUSINESS_PARTNER).
This service is part of the following communication scenarios: Things, stuff and codings (SAP_COM_1234).
You can find additional documentation for this service on [help.sap.com](https://example.com).

${getExpectedHelpfulLinks()}
`
    );
  });

  it('does not reference communication scenarios if non are defined', () => {
    expect(
      readme({
        serviceOptions: {
          packageName
        },
        speakingModuleName,
        apiBusinessHubMetadata: {
          url: apiHubUrl,
          communicationScenario: null
        } as ApiBusinessHubMetadata,
        operations: [] as VdmOperation[]
      } as VdmServiceMetadata)
    ).toBe(
      `# business-partner-service

This package contains the OData VDM for the [Business Partner Service](https://api.sap.com/api/API_BUSINESS_PARTNER).

${getExpectedHelpfulLinks()}
`
    );
  });

  it('does not create a link if no apiBusinessHubMetadata is defined', () => {
    expect(
      readme({
        serviceOptions: {
          packageName
        },
        speakingModuleName,
        operations: [] as VdmOperation[]
      } as VdmServiceMetadata)
    ).toBe(
      `# business-partner-service

This package contains the OData VDM for the Business Partner Service.

${getExpectedHelpfulLinks()}
`
    );
  });

  it('does not create usage example if none exist', () => {
    expect(
      readme({
        serviceOptions: {
          packageName
        },
        speakingModuleName,
        operations: [] as VdmOperation[]
      } as VdmServiceMetadata)
    ).toBe(
      `# business-partner-service

This package contains the OData VDM for the Business Partner Service.

${getExpectedHelpfulLinks()}
`
    );
  });
});
