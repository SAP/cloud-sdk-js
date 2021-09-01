import {
  getSdkVersion,
  getLinks,
  getGenerationSteps,
  Links,
  InstructionWithTextAndHeader,
  usageHeaderText
} from '@sap-cloud-sdk/generator-common';
import type { GenerationAndUsage } from '@sap-cloud-sdk/generator-common';
import levenstein from 'fast-levenshtein';
import voca from 'voca';
import {
  VdmEntity,
  VdmServiceMetadata,
  VdmFunctionImport,
  VdmActionImport
} from '../vdm-types';
import {
  actionImportCodeSample,
  entityCodeSample,
  functionImportCodeSample,
  genericEntityCodeSample
} from './code-samples';

const distanceThreshold = 5;

export async function getGenerationAndUsage(
  service: VdmServiceMetadata
): Promise<GenerationAndUsage> {
  return {
    ...(await getGenericGenerationAndUsage()),
    apiSpecificUsage: getApiSpecificUsage(service)
  };
}

export const linkGenerationDocumentation =
  'https://sap.github.io/cloud-sdk/docs/js/features/odata/generate-odata-client';

// will be used to generate metadata for failed and unknown case.
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

export function getODataLinks(): Links {
  return getLinks(
    'https://sap.github.io/cloud-sdk/docs/js/features/odata/execute-odata-request',
    linkGenerationDocumentation,
    'OData'
  );
}

function getODataEntity(
  serviceName: string,
  vdmEntities: VdmEntity[]
): VdmEntity {
  let closestEntity: VdmEntity | undefined;
  let minDistance = distanceThreshold;

  // remove special char from service name
  const serviceNameFormatted = getWordWithoutSpecialChars(serviceName);
  vdmEntities.forEach(entity => {
    const distance = getLevensteinDistance(
      serviceNameFormatted,
      getWordWithoutSpecialChars(entity.className)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestEntity = entity;
    }
  });

  if (closestEntity) {
    return closestEntity!;
  }
  // If no closest entity found, return the entity with shortest name
  return vdmEntities.sort((a, b) =>
    a.className.length < b.className.length ? -1 : 1
  )[0];
}

function getActionFunctionImport(
  serviceName: string,
  actionFunctionImports: VdmFunctionImport[] | VdmActionImport[]
): VdmFunctionImport | VdmActionImport {
  if (actionFunctionImports.length === 1) {
    return actionFunctionImports[0];
  }

  return (
    getLevensteinClosestFunction(serviceName, actionFunctionImports) ||
    getFunctionWithoutParameters(actionFunctionImports) ||
    getFunctionWithMinParameters(actionFunctionImports)
  );
}

// Gets function having minimum Levenstein distance with the service name. Returns undefined if distance is greater than threshhold.
function getLevensteinClosestFunction(
  serviceName: string,
  actionFunctionImports: VdmFunctionImport[] | VdmActionImport[]
): VdmFunctionImport | VdmActionImport | undefined {
  let closestFunc: VdmFunctionImport | VdmActionImport | undefined;
  let minDistance = distanceThreshold;
  actionFunctionImports.forEach(func => {
    const distance = getLevensteinDistance(serviceName, func.name);
    if (distance < minDistance) {
      minDistance = distance;
      closestFunc = func;
    }
  });

  return closestFunc;
}

function getFunctionWithoutParameters(
  actionFunctionImports: VdmFunctionImport[] | VdmActionImport[]
): VdmFunctionImport | VdmActionImport | undefined {
  return actionFunctionImports.find(func => func.parameters?.length === 0);
}

// Sorts and gets a function import having minimum input parameters.
function getFunctionWithMinParameters(
  actionFunctionImports: VdmFunctionImport[] | VdmActionImport[]
): VdmFunctionImport | VdmActionImport {
  const getFunctions = actionFunctionImports.filter(
    func => func.httpMethod.toLowerCase() === 'get'
  );
  if (getFunctions) {
    actionFunctionImports = getFunctions;
  }
  const sortedfunctions = actionFunctionImports.sort((funcA, funcB) =>
    funcA.parameters?.length < funcB.parameters?.length ? -1 : 1
  );
  return sortedfunctions[0];
}

/**
 * Calculate levenshtein distance of the two strings.
 * @param stringA - The first string.
 * @param stringB - The second string.
 * @returns The levenshtein distance (0 and above).
 */
function getLevensteinDistance(stringA: string, stringB: string): number {
  return levenstein.get(stringA.toLowerCase(), stringB.toLowerCase());
}

function getWordWithoutSpecialChars(text: string): string {
  return voca.words(text).join();
}
