import { first } from '@sap-cloud-sdk/util';
import {
  GenerationAndUsage,
  InstructionWithText
} from '../common/sdk-metadata-types';
import { getLinks } from '../common/links';
import { getSdkVersion } from '../common/util';
import {
  apiSpecificUsageText,
  genericUsageText,
  getGenerationSteps
} from '../common/generation-and-usage';
import { OpenApiDocument } from '../openapi-types';
import { apiSpecificCodeSample, genericCodeSample } from './code-sample';

export async function getGenerationAndUsage(
  openApiDocument: OpenApiDocument
): Promise<GenerationAndUsage> {
  return {
    genericUsage: getGenericUsage(),
    apiSpecificUsage: getApiSpecificUsage(openApiDocument),
    links: getLinks(),
    generationSteps: getGenerationSteps(
      installCommand,
      generateCommand,
      linkGenerationDocumentation
    ),
    generatorVersion: await getSdkVersion(),
    generatorRepositoryLink:
      'https://www.npmjs.com/package/@sap-cloud-sdk/openapi-generator'
  };
}

function getGenericUsage(): InstructionWithText {
  return {
    instructions: genericCodeSample(),
    text: genericUsageText
  };
}

function getApiSpecificUsage(
  openApiDocument: OpenApiDocument
): InstructionWithText {
  const apiWithOperations = first(
    openApiDocument.apis.filter(api => api.operations.length > 0)
  );

  if (apiWithOperations) {
    const operation = first(apiWithOperations.operations)!;
    const instructions = apiSpecificCodeSample(
      apiWithOperations.name,
      operation.operationId,
      openApiDocument.npmPackageName
    );
    return { instructions, text: apiSpecificUsageText };
  }
  return { instructions: '', text: apiSpecificUsageText };
}

const installCommand = '';
const generateCommand = '';
const linkGenerationDocumentation =
  'https://sap.github.io/cloud-sdk/docs/js/features/openapi/generate-openapi-client';
