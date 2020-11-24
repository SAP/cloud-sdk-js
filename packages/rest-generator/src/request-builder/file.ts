import { toPascalCase } from '@sap-cloud-sdk/core';
import { codeBlock, flat } from '@sap-cloud-sdk/util';
import { OpenApiServiceMetadata } from '../open-api-types';
import { operationsVariable } from './operations';

export function requestBuilderSourceFile(
  serviceMetadata: OpenApiServiceMetadata
): string {
  return codeBlock`
import { RestRequestBuilder } from '@sap-cloud-sdk/core';
import { ${toPascalCase(serviceMetadata.apiName)}Api } from './open-api/api';
import { ${parameterTypes(serviceMetadata).join(
    ', '
  )} } from './open-api/model';
${operationsVariable(serviceMetadata)}
  `;
}

function parameterTypes(serviceMetadata: OpenApiServiceMetadata): string[] {
  return flat(
    serviceMetadata.paths.map(path =>
      flat(
        path.operations.map(operation =>
          operation.requestBodySchemaRefName
            ? [toPascalCase(operation.requestBodySchemaRefName)]
            : []
        )
      )
    )
  );
}
