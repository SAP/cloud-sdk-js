import { first } from '@sap-cloud-sdk/util';
import {
  GenerationAndUsage,
  InstructionWithText,
  getLinks,
  getSdkVersion,
  apiSpecificUsageText,
  genericUsageText,
  getGenerationSteps,
  Links
} from '@sap-cloud-sdk/generator-common';
import { OpenApiDocument } from '../openapi-types';
import { apiSpecificCodeSample, genericCodeSample } from './code-sample';

export async function getGenerationAndUsage(
  openApiDocument: OpenApiDocument
): Promise<GenerationAndUsage> {
  return {
    genericUsage: getGenericUsage(),
    apiSpecificUsage: getApiSpecificUsage(openApiDocument),
    links: getOpenApiLinks(),
    generationSteps: getGenerationSteps(
      'npm install -g @sap-cloud-sdk/openapi-generator',
      'generate-openapi-client --inputDir <inputDirectory> --outputDir <outputDirectory>',
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
      openApiDocument.serviceConfig.packageName
    );
    return { instructions, text: apiSpecificUsageText };
  }
  return { instructions: '', text: apiSpecificUsageText };
}

export const linkGenerationDocumentation =
  'https://sap.github.io/cloud-sdk/docs/js/features/openapi/generate-openapi-client';

export function getOpenApiLinks(): Links {
  return getLinks(
    'https://sap.github.io/cloud-sdk/docs/js/features/openapi/execute-openapi-request',
    'https://sap.github.io/cloud-sdk/docs/js/features/openapi/generate-openapi-client'
  );
}
