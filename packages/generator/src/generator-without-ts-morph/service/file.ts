import { codeBlock } from '@sap-cloud-sdk/util';
import { Import, serializeImports } from '../../generator-common';
import { VdmServiceMetadata } from '../../vdm-types';
import { serviceClass } from './class';

export function serviceFile(service: VdmServiceMetadata): string {
  return codeBlock`${serializeImports(imports(service))}
  
${serviceClass(service)}`;
}

export function imports(service: VdmServiceMetadata): Import[] {
  return [
    ...service.entities.map(entity => ({
      names: [`${entity.className}Api`],
      moduleIdentifier: `./${entity.className}Api`
    })),
    {
      names: ['Time'],
      moduleIdentifier: '@sap-cloud-sdk/odata-common/internal'
    },
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
        'mergeDefaultDeSerializersWith'
      ],
      moduleIdentifier: `@sap-cloud-sdk/odata-${service.oDataVersion}`
    }
  ];
}
