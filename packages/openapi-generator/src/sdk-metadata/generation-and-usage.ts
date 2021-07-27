import { first } from '@sap-cloud-sdk/util';
import {
  GenerationAndUsage,
  getLinks,
  getSdkVersion,
  getGenerationSteps,
  Links,
  InstructionWithTextAndHeader,
  usageHeaderText
} from '@sap-cloud-sdk/generator-common';
import { OpenApiDocument } from '../openapi-types';
import { apiSpecificCodeSample, genericCodeSample } from './code-sample';

export async function getGenerationAndUsage(
  openApiDocument: OpenApiDocument
): Promise<GenerationAndUsage> {
  return {
    ...(await getGenericGenerationAndUsage()),
    apiSpecificUsage: getApiSpecificUsage(openApiDocument)
  };
}

// will be used to generate metadata for failed and unknown case.
export async function getGenericGenerationAndUsage(): Promise<GenerationAndUsage> {
  return {
    genericUsage: getGenericUsage(),
    apiSpecificUsage: undefined,
    links: getOpenApiLinks(),
    repository: 'npm',
    generationSteps: getGenerationSteps(
      'npm install -g @sap-cloud-sdk/openapi-generator',
      'openapi-generator --inputDir <inputDirectory> --outputDir <outputDirectory>',
      linkGenerationDocumentation
    ),
    generatorVersion: await getSdkVersion(),
    generatorRepositoryLink:
      'https://www.npmjs.com/package/@sap-cloud-sdk/openapi-generator'
  };
}

function getGenericUsage(): InstructionWithTextAndHeader {
  return {
    ...genericCodeSample(),
    header: usageHeaderText
  };
}

function getApiSpecificUsage(
  openApiDocument: OpenApiDocument
): InstructionWithTextAndHeader {
  const apiWithOperations = first(
    openApiDocument.apis.filter(api => api.operations.length > 0)
  );

  if (apiWithOperations) {
    const operation = first(apiWithOperations.operations)!;
    const instructions = apiSpecificCodeSample(
      apiWithOperations.name,
      operation.operationId,
      openApiDocument.serviceOptions.packageName
    );
    return {
      ...instructions,

      header: usageHeaderText
    };
  }
  return {
    instructions: '',
    text: '',
    header: usageHeaderText
  };
}

export const linkGenerationDocumentation =
  'https://sap.github.io/cloud-sdk/docs/js/features/openapi/generate-openapi-client';

export function getOpenApiLinks(): Links {
  return getLinks(
    'https://sap.github.io/cloud-sdk/docs/js/features/openapi/execute-openapi-request',
    'https://sap.github.io/cloud-sdk/docs/js/features/openapi/generate-openapi-client'
  );
}
