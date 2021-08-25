import { InstructionWithTextAndHeader } from './sdk-metadata-types';

export function getGenerationSteps(
  installCommand: string,
  generateCommand: string,
  generationDocLink: string,
  apiType: 'OData' | 'OpenAPI'
): InstructionWithTextAndHeader {
  const anchor =
    apiType === 'OData' ? '#options' : '#options-of-the-openapi-cli';

  return {
    header: 'Installation & Generation Steps',
    instructions: `<ul>
<li>Install <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">Node and npm</a>. We recommend the use of the LTS version.</li>
<li>Download the API specification from the Overview -&gt; API Specification section. ${
      apiType === 'OData' ? 'Choose EDMX format.' : 'Choose JSON format.'
    }</li>
<li>Generate a typed client by running <code><b>${installCommand}</b></code> to install the generator.</li>
<li>Execute the generator <code><b>${generateCommand}</b></code></li>
<li>You should now find generated classes in the output directory specified in step 4.</li>
<li>By default we generate TypeScript only. If you need to transpile it to JavaScript, check the <a href="${generationDocLink}${anchor}"> CLI options in the documentation</a>.</li>
<li>If you encounter issues during generation, carefully check your configuration and refer to the <a href="${generationDocLink}">extended documentation</a> on generating ${apiType} clients</a>.</li>
<li>Congratulations! Check the usage example below to import and use your generated ${apiType} client library.</li>
</ul>`.replace(/\n/g, ''),
    text: `You can generate a typed OData client for this service on your own. Follow the instructions below to install the SAP Cloud SDK ${apiType} generator and complete the generation steps:`
  };
}

export const usageHeaderText = 'Usage Example';
