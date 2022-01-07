import { ImportDeclarationStructure } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import {
  complexTypeImportDeclarations,
  odataImportDeclaration,
  enumTypeImportDeclarations
} from '../imports';
import { VdmComplexType } from '../vdm-types';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function importDeclarations(
  complexType: VdmComplexType,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  return [
    ...complexTypeImportDeclarations(complexType.properties),
    ...enumTypeImportDeclarations(complexType.properties),
    odataImportDeclaration(
      [
        'DefaultDeSerializers',
        'DeSerializers',
        'Entity',
        'ComplexTypeField',
        'ConstructorOrField',
        'DeserializedType',
        'EdmTypeField',
        'FieldBuilder',
        'FieldOptions',
        'OrderableEdmTypeField',
        'PropertyMetadata',
        ...(oDataVersion === 'v4' ? ['CollectionField', 'EnumField'] : [])
      ],
      oDataVersion
    )
  ];
}
