import { unixEOL } from '@sap-cloud-sdk/util';
import { Import, serializeImports } from '../../generator-common';
import { VdmEntity, VdmServiceMetadata } from '../../vdm-types';
import {
  navPropertyFieldTypeImportNames,
  propertyFieldTypeImportNames,
  propertyTypeImportNames
} from '../../imports';
import {
  odataCommonImport,
  odataImport,
  complexTypeImports,
  enumTypeImports
} from './imports';
import { classContent } from './class';

export function file(entity: VdmEntity, service: VdmServiceMetadata): string {
  const imports = serializeImports(getImports(entity, service));
  const content = classContent(entity, service);
  return [
    imports,
    "import { BigNumber } from 'bignumber.js';",
    "import { Moment } from 'moment';",
    content
  ].join(unixEOL);
}

function getImports(entity: VdmEntity, service: VdmServiceMetadata): Import[] {
  return [
    {
      names: [`${entity.className}`],
      moduleIdentifier: `./${entity.className}`,
      typeOnly: false
    },
    {
      names: [`${entity.className}RequestBuilder`],
      moduleIdentifier: `./${entity.className}RequestBuilder`,
      typeOnly: false
    },
    ...otherEntityApiImports(entity, service),
    // ...externalImports(entity.properties),
    ...complexTypeImports(entity.properties),
    // todo test odata v4
    ...enumTypeImports(entity.properties),
    odataImport(
      [
        'CustomField',
        'defaultDeSerializers',
        'DeSerializers',
        'mergeDefaultDeSerializersWith'
      ],
      service.oDataVersion
    ),
    odataCommonImport([
      ...propertyTypeImportNames(entity.properties),
      ...propertyFieldTypeImportNames(entity.properties),
      ...navPropertyFieldTypeImportNames(
        entity.navigationProperties,
        service.oDataVersion
      ),
      'AllFields',
      'entityBuilder',
      'EntityBuilderType',
      'EntityApi',
      'FieldBuilder',
      'Time'
    ])
  ];
}

function otherEntityApiImports(
  entity: VdmEntity,
  service: VdmServiceMetadata
): Import[] {
  return Array.from(new Set(entity.navigationProperties.map(n => n.to)))
    .map(to => {
      const matchedEntity = service.entities.find(e => e.entitySetName === to);
      if (!matchedEntity) {
        throw Error(
          `Failed to find the entity from the service: ${JSON.stringify(
            service
          )} for entity ${entity}`
        );
      }
      return matchedEntity.className;
    })
    .filter(name => name !== entity.className)
    .map(name => otherEntityApiImport(name));
}

function otherEntityApiImport(name: string): Import {
  return {
    names: [`${name}Api`],
    moduleIdentifier: `./${name}Api`
  };
}
