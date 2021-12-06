import { ODataVersion, unixEOL } from '@sap-cloud-sdk/util';
import { Import, serializeImports } from '../../generator-common';
import { VdmEntity, VdmServiceMetadata } from '../../vdm-types';
import {
  navPropertyFieldTypeImportNames,
  propertyFieldTypeImportNames,
  propertyTypeImportNames
} from '../../imports';
import { odataCommonImport, odataImport, complexTypeImports, externalImports, enumTypeImports } from './imports';
import { classContent } from './class';

export function file(entity: VdmEntity, service: VdmServiceMetadata): string{
  const imports = serializeImports(getImports(entity, service.oDataVersion));
  const content = classContent(entity);
  return [imports, content].join(unixEOL);
}

function getImports(entity: VdmEntity, oDataVersion: ODataVersion): Import[] {
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
    ...externalImports(entity.properties),
    ...complexTypeImports(entity.properties),
    // todo test odata v4
    ...enumTypeImports(entity.properties),
    odataImport(['defaultDeSerializers',
      'DeSerializers',
      'mergeDefaultDeSerializersWith'], oDataVersion),
    odataCommonImport(
    [
      ...propertyTypeImportNames(entity.properties),
      ...propertyFieldTypeImportNames(entity.properties),
      ...navPropertyFieldTypeImportNames(
        entity.navigationProperties,
        oDataVersion
      ),
      'AllFields',
      'EntityBuilderType',
      'EntityApi',
      'FieldBuilder'
    ])
    ];
}
