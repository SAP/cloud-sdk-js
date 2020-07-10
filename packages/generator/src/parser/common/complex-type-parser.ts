/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger } from '@sap-cloud-sdk/util';
import {
  edmToComplexPropertyType,
  edmToTsType,
  forceArray,
  isNullableProperty
} from '../../generator-utils';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../../vdm-types';
import {
  checkCollectionKind,
  filterUnknownEdmTypes,
  isCollection,
  isComplexType,
  parseType,
  parseTypeName
} from '../util/parser-util';
import { applyPrefixOnJsConfictParam } from '../../name-formatting-strategies';
import { propertyDescription } from '../util/description-util';
import { EdmxComplexTypeBase } from './edmx-types';

const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-complex-type-parser'
});

export function parseComplexTypesBase(root): EdmxComplexTypeBase[] {
  return forceArray(root.ComplexType).map(c => {
    c.Property = forceArray(c.Property);
    return c;
  });
}

export function transformComplexTypesBase(
  complexTypes: EdmxComplexTypeBase[],
  formatter: ServiceNameFormatter
  // reservedNames: Set<string>
): VdmComplexType[] {
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
      factoryName: formatter.typeNameToFactoryName(typeName),
      fieldType: complexTypeFieldType(typeName),
      properties: c.Property.filter(filterUnknownEdmTypes).map(p => {
        checkCollectionKind(p);
        const instancePropertyName = formatter.originalToInstancePropertyName(
          c.Name,
          p.Name
        );
        const type = parseTypeName(p.Type);
        const isComplex = isComplexType(type);
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
          fieldType: isComplex
            ? formattedTypes[parsedType] + 'Field'
            : edmToComplexPropertyType(type),
          isComplex,
          isCollection: isCollection(p.Type)
        };
      })
    };
  });
}

function complexTypeFieldType(typeName: string) {
  return typeName + 'Field';
}
