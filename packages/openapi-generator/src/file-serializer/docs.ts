import { OpenApiApi, OpenApiDocument, OpenApiOperation, OpenApiParameter } from '../openapi-types';
import { codeBlock } from '@sap-cloud-sdk/util';
import { documentationBlock } from '@sap-cloud-sdk/util/dist/documentation-block';
import { serializeSchema } from './schema';
import {EOL} from 'os'

export function apiDocumentation(api: OpenApiApi,document:OpenApiDocument):string{
  return documentationBlock`
  Representation of the ${api.name} API.
  This API is part of the ${document.serviceName} service.
  
  This API client has been created automatically using the SAP Cloud SDK - do not edit manually.
  `
}

export function operationDocumentation(operation:OpenApiOperation):string{
  const signature:string[] = []
  if(operation.pathParameters.length > 0){
    signature.push(...getSignatureOfPathParameter(operation.pathParameters))
  }
  if(operation.requestBody){
    throw new Error('Make nice description serialize type and consider required')
    signature.push('@param body Request body')
  }
  if(operation.queryParameters.length > 0){
    signature.push('@param queryParameters Optional object containing the query parameters.')
  }
  signature.push(`@returns ${serializeSchema(operation.response)}`)

  return documentationBlock`
  ${operation.description ? operation.description : getOperationDescriptionText(operation)}
  
  ${signature.join(EOL)}
  `
}

function getSignatureOfPathParameter(parameters:OpenApiParameter[]):string[]{
  return parameters.map(parameter=>`@parameter ${parameter.name} ${parameter.description || ''}`)
}

function getOperationDescriptionText(operation: OpenApiOperation):string {
  return `Makes a ${operation.method} request to the '${operation.pathPattern}' endpoint and returns a '${serializeSchema(operation.response)}'`;
}
