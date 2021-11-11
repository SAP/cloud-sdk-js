/* eslint-disable import/no-internal-modules */
import {
  GenerationAndUsage,
  getLinks,
  getSdkVersion,
  getGenerationSteps,
  Links,
  InstructionWithTextAndHeader,
  usageHeaderText
} from '@sap-cloud-sdk/generator-common/internal';
/* eslint-enable import/no-internal-modules */
import { OpenApiDocument } from '../openapi-types';
import { apiSpecificCodeSample, genericCodeSample } from './code-sample';
import { getMainApi, getMainOperation } from './code-sample-util';

export async function getGenerationAndUsage(
  openApiDocument: OpenApiDocument
): Promise<GenerationAndUsage> {
  return {
    ...(await getGenericGenerationAndUsage()),
    apiSpecificUsage: getApiSpecificUsage(openApiDocument)
  };
}

export const linkGenerationDocumentation =
  'https://sap.github.io/cloud-sdk/docs/js/features/openapi/generate-openapi-client';

// will be used to generate metadata for failed and unknown case.
export async function getGenericGenerationAndUsage(): Promise<GenerationAndUsage> {
  return {
    genericUsage: getGenericUsage(),
    apiSpecificUsage: undefined,
    links: getOpenApiLinks(),
    repository: 'npm',
    generationSteps: getGenerationSteps(
      'npm install -g @sap-cloud-sdk/openapi-generator',
      'openapi-generator --inputDir path/to/specification/ --outputDir path/to/client/',
      linkGenerationDocumentation,
      'OpenAPI'
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

export function getApiSpecificUsage(
  openApiDocument: OpenApiDocument
): InstructionWithTextAndHeader {
  const apisWithOperations = openApiDocument.apis.filter(
    api => api.operations?.length > 0
  );

  if (apisWithOperations.length > 0) {
    const mainApi = getMainApi(openApiDocument.serviceName, apisWithOperations);
    const operation = getMainOperation(mainApi);

    const instructions = apiSpecificCodeSample(
      mainApi.name,
      operation,
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

export function getOpenApiLinks(): Links {
  return getLinks(
    'https://sap.github.io/cloud-sdk/docs/js/features/openapi/execute-openapi-request',
    linkGenerationDocumentation,
    'OpenAPI'
  );
}
