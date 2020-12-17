import {
  codeBlock,
  createLogger,
  partition,
  unique
} from '@sap-cloud-sdk/util';
import { OpenApiDocument, OpenApiOperation } from '../openapi-types';
const logger = createLogger('openapi-generator');
/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Get the content of the SAP Cloud SDK API wrapper.
 * @param openApiDocument Parsed service.
 * @returns The generated code for the SDK API wrapper.
 */
export function apiFile(openApiDocument: OpenApiDocument): string {
  const requestBodyTypes = getRequestBodyReferenceTypes(openApiDocument);
  return codeBlock`
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { DefaultApi } from './openapi/api';
${
  requestBodyTypes
    ? `import { ${requestBodyTypes} } from './openapi/model';`
    : ''
}

export const ${openApiDocument.apiName} = {
  ${getOperations(openApiDocument)}
};
`;
}

/**
 * Get the reference types for all request body types in the given service.
 * @param openApiDocument Parsed service metadata.
 * @returns The list of body types as a string.
 */
function getRequestBodyReferenceTypes(
  openApiDocument: OpenApiDocument
): string {
  const bodyTypes = openApiDocument.operations
    .map(operation => operation.requestBody?.parameterType)
    .filter(requestBody => typeof requestBody !== 'undefined')
    .map(requestBody => getGenericTypeFromArray(requestBody!))
    .filter(requestBody => !isKnownTSType(requestBody!)) as string[];

  return unique(bodyTypes).join(', ');
}

/**
 * Recursively get the deepest generic type of an array type.
 * @param type The given type.
 * @returns The deepest generic type.
 */
export function getGenericTypeFromArray(type: string): string {
  const match = /^Array<(.*?)>$/.exec(type);
  return !!match ? getGenericTypeFromArray(match[1]) : type;
}

const knownTSTypes = ['number', 'string', 'boolean', 'object', 'any'];

/**
 * Check whether a given type is a built-in TS type.
 * @param type The type to be checked
 * @returns True if the type is a built-in TS type, false otherwise.
 */
function isKnownTSType(type: string): boolean {
  return knownTSTypes.includes(type);
}

/**
 * Get all operation representations for the given service.
 * @param openApiDocument Parsed service.
 * @returns All operations as a string.
 */
function getOperations(openApiDocument: OpenApiDocument): string {
  return openApiDocument.operations
    .map(operation => getOperation(operation))
    .join(',\n');
}

/**
 * Get the string representation of one operation.
 * @param operation Operation to serialize.
 * @returns The operation as a string.
 */
function getOperation(operation: OpenApiOperation): string {
  const params = getParams(operation);
  const argsQuestionMark = params.every(param => !param.required) ? '?' : '';
  const paramsArg = params.length
    ? codeBlock`args${argsQuestionMark}: {
  ${params
    .map(param => `${param.name}${param.required ? '' : '?'}: ${param.type}`)
    .join(',\n')}
}`
    : '';
  const requestBuilderParams = [
    'DefaultApi',
    `'${operation.operationName}'`,
    ...params.map(param => `args${argsQuestionMark}.${param.name}`)
  ];

  return codeBlock`
${
  operation.operationName
}: (${paramsArg}) => new OpenApiRequestBuilder<DefaultApi, '${
    operation.operationName
  }'>(
  ${requestBuilderParams.join(',\n')}
)`;
}

interface Parameter {
  type: string;
  name: string;
  required?: boolean;
}

function getParams(operation: OpenApiOperation): Parameter[] {
  const parameters = [
    ...operation.parameters,
    ...getRequestBodyParams(operation)
  ];

  const [required, optional] = partition(parameters, param => !!param.required);
  return [...required, ...optional];
}

function getRequestBodyParams(operation: OpenApiOperation): Parameter[] {
  return operation.requestBody
    ? [
        {
          name: operation.requestBody.parameterName,
          type: operation.requestBody.parameterType,
          required: operation.requestBody.required
        }
      ]
    : [];
}
