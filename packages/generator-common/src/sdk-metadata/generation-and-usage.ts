import { InstructionWithTextAndHeader } from './sdk-metadata-types';

export function getGenerationSteps(
  installCommand: string,
  generateCommand: string,
  generationDocLink: string,
  apiType: 'OData' | 'OpenApi'
): InstructionWithTextAndHeader {
  return {
    header: 'Installation & Generation Steps',
    instructions: `<ul>
<li>Install <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">Node and npm</a>. The use of the LTS version is preferred.</li>
<li>Download the API specification from Overview -&gt; API Specification section. ${
      apiType === 'OData' ? 'Chose EDMX format.' : 'Chose JSON format.'
    }</li>
<li>Generate a typed client by running <code>${installCommand}</code> to install the code generator.</li>
<li>Execute the generator <code>${generateCommand}</code></li>
<li>You should now find generated classes in the output directory specified in step 4.</li>
<li>By default we generate TypeScript only. If you need to transpile it to JavaScript, check the <a href="https://sap.github.io/cloud-sdk/docs/js/features/odata/generate-odata-client#options">code generator CLI parameters in the documentation</a>.</li>
<li>In case of any issues, carefully check your configuration and refer to our <a href="https://sap.github.io/cloud-sdk/docs/js/features/odata/generate-odata-client">extended typed client generation manual</a>.</li>
<li>Congratulations! Check the usage example below to import and invoke your typed OData client library.</li>
</ul>`,
    text: 'You can generate a typed OData client for this service yourself. Follow the instructions below to install the tooling and complete the generation steps:'
  };
}

export const usageHeaderText = 'Usage Example';
