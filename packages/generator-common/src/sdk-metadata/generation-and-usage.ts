import { InstructionWithText } from './sdk-metadata-types';

export function getGenerationSteps(
  installCommand: string,
  generateCommand: string,
  generationDocLink: string
): InstructionWithText {
  return {
    instructions: `<ul>
<li>Download the API specification to your local computer.</li>
<li>Install the generator <code>${installCommand}</code></li>
<li>Execute the generator <code>${generateCommand}</code></li>
</ul>
The steps above will generate a basic TypeScript client. For additional options like transpiling to JavaScript etc. visit our <a href="${generationDocLink}">documentation.</a>`,
    text: 'Follow the following generation steps to generate the client.'
  };
}

export const usageHeaderText = 'Sample code for using the client library';
