import {
  getSdkVersion,
  getLinks,
  getGenerationSteps,
  Links,
  InstructionWithTextAndHeader,
  usageHeaderText
} from '@sap-cloud-sdk/generator-common';
import type { GenerationAndUsage } from '@sap-cloud-sdk/generator-common';
import { VdmServiceMetadata } from '../vdm-types';
import {
  actionImportCodeSample,
  entityCodeSample,
  functionImportCodeSample,
  genericEntityCodeSample
} from './code-samples';
import { getActionFunctionImport, getODataEntity } from './code-sample-util';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export async function getGenerationAndUsage(
  service: VdmServiceMetadata
): Promise<GenerationAndUsage> {
  return {
    ...(await getGenericGenerationAndUsage()),
    apiSpecificUsage: getApiSpecificUsage(service)
  };
}
/**
 * @internal
 */
export const linkGenerationDocumentation =
  'https://sap.github.io/cloud-sdk/docs/js/features/odata/generate-odata-client';

// will be used to generate metadata for failed and unknown case.
/**
 * @internal
 */
export async function getGenericGenerationAndUsage(): Promise<GenerationAndUsage> {
  return {
    genericUsage: genericEntityCodeSample(),
    repository: 'npm',
    apiSpecificUsage: undefined,
    links: getODataLinks(),
    generationSteps: getGenerationSteps(
      'npm install -g @sap-cloud-sdk/generator',
      'generate-odata-client --inputDir path/to/specification/ --outputDir path/to/client/',
      linkGenerationDocumentation,
      'OData'
    ),
    generatorVersion: await getSdkVersion(),
    generatorRepositoryLink:
      'https://www.npmjs.com/package/@sap-cloud-sdk/generator'
  };
}
/**
 * @internal
 */
export function getApiSpecificUsage(
  service: VdmServiceMetadata
): InstructionWithTextAndHeader {
  if (service.entities?.length > 0) {
    const entity = getODataEntity(service.originalFileName, service.entities);
    return {
      ...entityCodeSample(entity.className, service.npmPackageName),
      header: usageHeaderText
    };
  }
  // Return function/action import usage if no entity is found.
  if (service.functionImports?.length > 0) {
    const functionImport = getActionFunctionImport(
      service.originalFileName,
      service.functionImports
    );
    return {
      ...functionImportCodeSample(
        functionImport,
        `${service.npmPackageName}/function-imports`
      ),
      header: usageHeaderText
    };
  }
  if (service.actionsImports) {
    const actionImport = getActionFunctionImport(
      service.originalFileName,
      service.actionsImports
    );
    return {
      ...actionImportCodeSample(
        actionImport,
        `${service.npmPackageName}/action-imports`
      ),
      header: usageHeaderText
    };
  }
  return {
    instructions: '',
    text: '',
    header: usageHeaderText
  };
}
/**
 * @internal
 */
export function getODataLinks(): Links {
  return getLinks(
    'https://sap.github.io/cloud-sdk/docs/js/features/odata/execute-odata-request',
    linkGenerationDocumentation,
    'OData'
  );
}
