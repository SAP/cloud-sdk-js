import { codeBlock } from '@sap-cloud-sdk/util';
import {
  serializeImports,
  Import
} from '@sap-cloud-sdk/generator-common/internal';
import { hasEntities } from '../../generator-utils';
import { VdmServiceMetadata } from '../../vdm-types';
import { serviceBuilder, serviceClass } from './class';

/**
 * @internal
 */
export function serviceFile(service: VdmServiceMetadata): string {
  return codeBlock`${serializeImports(imports(service))}
  
${serviceBuilder(service.className, service.oDataVersion)} 
${serviceClass(service)}`;
}

function getImports(service: VdmServiceMetadata): Import[] {
  const operationImports = service.functionImports.concat(
    service.actionImports || []
  );
  if (operationImports.length === 0) {
    return [];
  }
  const names = operationImports.map(
    actionFunctionImport => actionFunctionImport.name
  );
  const parameterNames = operationImports.map(
    actionFunctionImport => actionFunctionImport.parametersTypeName
  );
  return [
    {
      names: [...names, ...parameterNames],
      moduleIdentifier: './operations'
    }
  ];
}

/**
 * @internal
 */
export function imports(service: VdmServiceMetadata): Import[] {
  const operationImports = getImports(service);

  const serviceImports = [
    ...service.entities.map(entity => ({
      names: [`${entity.className}Api`],
      moduleIdentifier: `./${entity.className}Api`
    })),
    ...operationImports,
    {
      names: ['BigNumber'],
      moduleIdentifier: 'bignumber.js'
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

  if (hasEntities(service)) {
    serviceImports.push({
      names: ['batch', 'changeset'],
      moduleIdentifier: './BatchRequest'
    });
  }

  return serviceImports;
}
