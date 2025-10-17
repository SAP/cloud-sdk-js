import { codeBlock } from '@sap-cloud-sdk/util';
import { serializeImports } from '@sap-cloud-sdk/generator-common/internal';
import { hasEntities } from '../../generator-utils';
import { serviceBuilder, serviceClass } from './class';
import type { VdmServiceMetadata } from '../../vdm-types';
import type {
  Import,
  CreateFileOptions
} from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export function serviceFile(
  service: VdmServiceMetadata,
  options?: CreateFileOptions
): string {
  return codeBlock`${serializeImports(imports(service, options))}
  
${serviceBuilder(service.className, service.oDataVersion)} 
${serviceClass(service)}`;
}

function getImports(
  service: VdmServiceMetadata,
  options?: CreateFileOptions
): Import[] {
  const operations = service.operations;
  if (!operations.length) {
    return [];
  }
  const names = operations.map(
    actionFunctionImport => actionFunctionImport.name
  );
  const parameterNames = operations.map(
    actionFunctionImport => actionFunctionImport.parametersTypeName
  );
  return [
    {
      names: [...names, ...parameterNames],
      moduleIdentifier: options?.generateESM
        ? './operations.js'
        : './operations'
    }
  ];
}

/**
 * @internal
 */
export function imports(
  service: VdmServiceMetadata,
  options?: CreateFileOptions
): Import[] {
  const operations = getImports(service, options);

  const serviceImports = [
    ...service.entities.map(entity => ({
      names: [`${entity.className}Api`],
      moduleIdentifier: options?.generateESM
        ? `./${entity.className}Api.js`
        : `./${entity.className}Api`
    })),
    ...operations,
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
      moduleIdentifier: options?.generateESM
        ? './BatchRequest.js'
        : './BatchRequest'
    });
  }

  return serviceImports;
}
