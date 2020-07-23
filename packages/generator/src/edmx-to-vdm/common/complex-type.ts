/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger } from '@sap-cloud-sdk/util';
import {
  edmToComplexPropertyType,
  edmToTsType,
  isNullableProperty
} from '../../generator-utils';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType, VdmProperty } from '../../vdm-types';
import { applyPrefixOnJsConfictParam } from '../../name-formatting-strategies';
import { propertyDescription } from '../description-util';
import { EdmxComplexTypeBase } from '../../edmx-parser/common';
import {
  checkCollectionKind,
  filterUnknownEdmTypes,
  isCollectionType,
  isComplexType,
  parseType,
  parseTypeName
} from '../edmx-to-vdm-util';

const logger = createLogger({
  package: 'generator',
  messageContext: 'complex-type'
});

// TODO: this should be removed once Enum types are implemented
function filterUnknownPropertyTypes(p: VdmProperty): boolean {
  return !(p.isComplex && typeof p.jsType === 'undefined');
}

// TODO: this should be removed once the deprecated complex type factory is removed
export function includeFactoryName(
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  formatter: ServiceNameFormatter
): VdmComplexType[] {
  return complexTypes.map(c => ({
    ...c,
    factoryName: formatter.typeNameToFactoryName(c.typeName)
  }));
}

export function transformComplexTypesBase(
  complexTypes: EdmxComplexTypeBase[],
  formatter: ServiceNameFormatter
): Omit<VdmComplexType, 'factoryName'>[] {
  const formattedTypes = complexTypes.reduce(
    (formatted, c) => ({
      ...formatted,
      [c.Name]: formatter.originalToComplexTypeName(c.Name)
    }),
    {}
  );
  return complexTypes.map(c => {
    const typeName = formattedTypes[c.Name];
    return {
      typeName,
      originalName: c.Name,
      fieldType: complexTypeFieldType(typeName),
      properties: c.Property.filter(filterUnknownEdmTypes)
        .map(p => {
          checkCollectionKind(p);
          const instancePropertyName = formatter.originalToInstancePropertyName(
            c.Name,
            p.Name
          );
          const type = parseTypeName(p.Type);
          const isComplex = isComplexType(type);
          const isCollection = isCollectionType(p.Type);
          const parsedType = parseType(type);
          return {
            originalName: p.Name,
            instancePropertyName,
            staticPropertyName: formatter.originalToStaticPropertyName(
              c.Name,
              p.Name
            ),
            propertyNameAsParam: applyPrefixOnJsConfictParam(
              instancePropertyName
            ),
            description: propertyDescription(p),
            technicalName: p.Name,
            nullable: isNullableProperty(p),
            edmType: isComplex ? type : parsedType,
            jsType: isComplex ? formattedTypes[parsedType] : edmToTsType(type),
            fieldType: isCollection
              ? 'CollectionField'
              : isComplex
              ? formattedTypes[parsedType] + 'Field'
              : edmToComplexPropertyType(type),
            isComplex,
            isCollection: isCollectionType(p.Type)
          };
        })
        .filter(filterUnknownPropertyTypes)
    };
  });
}

function complexTypeFieldType(typeName: string) {
  return typeName + 'Field';
}
