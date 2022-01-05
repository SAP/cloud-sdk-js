import { codeBlock } from '@sap-cloud-sdk/util';
import { Import, serializeImports } from '../../generator-common';
import { VdmServiceMetadata } from '../../vdm-types';
import { serviceBuilder, serviceClass } from './class';

export function serviceFile(service: VdmServiceMetadata): string {
  return codeBlock`${serializeImports(imports(service))}
  
${serviceBuilder(service.className, service.oDataVersion)} 
${serviceClass(service)}`;
}

export function imports(service: VdmServiceMetadata): Import[] {
  return [
    ...service.entities.map(entity => ({
      names: [`${entity.className}Api`],
      moduleIdentifier: `./${entity.className}Api`
    })),
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
  ].sort();
}
