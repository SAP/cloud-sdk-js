import { unixEOL } from '@sap-cloud-sdk/util';
import { Import, serializeImports } from '../../generator-common';
import { VdmEntity, VdmServiceMetadata } from '../../vdm-types';
import {
  navPropertyFieldTypeImportNames,
  propertyFieldTypeImportNames,
  propertyTypeImportNames
} from '../../imports';
import { odataImport, complexTypeImports, enumTypeImports } from './imports';
import { classContent } from './class';

/**
 * @internal
 */
export function entityApiFile(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string {
  const imports = serializeImports(getImports(entity, service));
  const content = classContent(entity, service);
  return [imports, content].join(unixEOL);
}

// todo Use this function instead the one above, when the todo of "de-serializers.ts" is solved, so that unnecessary external dependencies are not imported.
// export function file(entity: VdmEntity, service: VdmServiceMetadata): string {
//   const imports = serializeImports([...getImports(entity, service), ...externalImports(entity.properties)]);
//   const content = classContent(entity, service);
//   return [
//     imports,
//     content
//   ].join(unixEOL);
// }

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
    ...complexTypeImports(entity.properties),
    ...enumTypeImports(entity.properties),
    odataImport(
      [
        'CustomField',
        'defaultDeSerializers',
        'DefaultDeSerializers',
        'DeSerializers',
        'AllFields',
        'entityBuilder',
        'EntityBuilderType',
        'EntityApi',
        'FieldBuilder',
        ...propertyTypeImportNames(entity.properties),
        ...propertyFieldTypeImportNames(entity.properties),
        ...navPropertyFieldTypeImportNames(
          entity.navigationProperties,
          service.oDataVersion
        )
      ],
      service.oDataVersion
    )
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
    .flatMap(name => otherEntityImports(name));
}

function otherEntityImports(name: string): Import[] {
  return [
    {
      names: [`${name}Api`],
      moduleIdentifier: `./${name}Api`
    }
  ];
}
