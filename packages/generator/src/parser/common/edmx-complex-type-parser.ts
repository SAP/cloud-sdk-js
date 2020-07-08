import {  EdmxNamed, EdmxProperty, SwaggerProperty } from './parser-types';
import {
  edmToComplexPropertyType,
  edmToTsType,
  endWithDot,
  forceArray,
  isNullableProperty
} from '../../generator-utils';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../../vdm-types';
import { isCollection, parseTypeName } from '../parser-util';
import { applyPrefixOnJsConfictParam } from '../../name-formatting-strategies';
import { createLogger } from '@sap-cloud-sdk/util';
import {
  checkCollectionKind,
  filterUnknownEdmTypes,
  isComplexType, parseType,
  propertyDescription
} from './some-util-find-good-name';
import { EdmxMetadataBase } from '../edmx-parser';



const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-complex-type-parser'
});

export interface EdmxComplexType extends EdmxNamed {
  Property: EdmxProperty[];
}

export function parseComplexTypesBase(root): EdmxComplexType[] {
  return forceArray(root.ComplexType).map(c => {
    c.Property = forceArray(c.Property);
    return c;
  });
}

export function getComplexTypeNames(edmxData:EdmxMetadataBase):string[]{
  throw new Error('Not yet implemented')
}


export function transformComplexTypesBase(
  complexTypes: EdmxComplexType[],
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

const complexTypeFieldType = (typeName: string) => typeName + 'Field';



