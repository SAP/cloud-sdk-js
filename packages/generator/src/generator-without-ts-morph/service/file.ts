import { codeBlock } from '@sap-cloud-sdk/util';
import { Import, serializeImports } from '../../generator-common';
import { VdmServiceMetadata } from '../../vdm-types';
import { serviceBuilder, serviceClass } from './class';
/* eslint-disable valid-jsdoc */
/**
 * @internal
 */
export function serviceFile(service: VdmServiceMetadata): string {
  return codeBlock`${serializeImports(imports(service))}
  
${serviceBuilder(service.className, service.oDataVersion)} 
${serviceClass(service)}`;
}

function getImports(
  actionFunctionImports:
    | { name: string; parametersTypeName: string }[]
    | undefined,
  moduleIdentifier: 'function-imports' | 'action-imports'
): Import[] {
  if (actionFunctionImports === undefined) {
    return [];
  }
  const names = actionFunctionImports.map(
    actionFunctionImport => actionFunctionImport.name
  );
  const parameterNames = actionFunctionImports.map(
    actionFunctionImport => actionFunctionImport.parametersTypeName
  );
  return [
    {
      names: [...names, ...parameterNames],
      moduleIdentifier: `./${moduleIdentifier}`
    }
  ];
}

/**
 * @internal
 */
export function imports(service: VdmServiceMetadata): Import[] {
  const functionImports = getImports(
    service.functionImports,
    'function-imports'
  );

  const actionImports = getImports(service.actionImports, 'action-imports');
  return [
    ...service.entities.map(entity => ({
      names: [`${entity.className}Api`],
      moduleIdentifier: `./${entity.className}Api`
    })),
    ...functionImports,
    ...actionImports,
    {
      names: ['BigNumber'],
      moduleIdentifier: 'bignumber.js'
    },
    {
      names: ['batch', 'changeset'],
      moduleIdentifier: './BatchRequest'
    },
    {
      names:
        service.oDataVersion === 'v2' ? ['Moment'] : ['Moment', 'Duration'],
      moduleIdentifier: 'moment'
    },
    {
      names: [
        'defaultDeSerializers',
        'DeSerializers',
        'DefaultDeSerializers',
        'mergeDefaultDeSerializersWith',
        'Time'
      ],
      moduleIdentifier: `@sap-cloud-sdk/odata-${service.oDataVersion}`
    }
  ];
}
