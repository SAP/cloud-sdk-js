import {
  edmToComplexPropertyType,
  edmToTsType,
  getFallbackEdmTypeIfNeeded,
  isNullableProperty
} from '../../generator-utils';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType, VdmMappedEdmType, VdmEnumType } from '../../vdm-types';
import { propertyDescription } from '../description-util';
import {
  checkCollectionKind,
  complexTypeFieldType,
  complexTypeName,
  isCollectionType,
  isComplexTypeOrEnumType,
  isEdmType,
  isEnumType,
  parseCollectionTypeName,
  typesForCollection
} from '../edmx-to-vdm-util';
import { EdmxComplexTypeBase } from '../../edmx-parser/common';
import { applyPrefixOnJsConflictParam } from '../../name-formatting-strategies';
import { enumTypeForName } from './entity';

/**
 * @internal
 */
export function transformComplexTypesBase(
  complexTypes: EdmxComplexTypeBase[],
  enumTypes: VdmEnumType[],
  formatter: ServiceNameFormatter
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
      fieldType: complexTypeFieldType(typeName),
      properties: c.Property.map(p => {
        checkCollectionKind(p);
        const instancePropertyName = formatter.originalToInstancePropertyName(
          c.Name,
          p.Name
        );
        const isCollection = isCollectionType(p.Type);
        const parsed = isCollection ? parseCollectionTypeName(p.Type) : p.Type;
        const isComplexOrEnum = isComplexTypeOrEnumType(parsed);
        const isEnum = isEnumType(parsed, enumTypes);
        const isComplex = isComplexOrEnum ? !isEnum : false;
        const typeMapping = getTypeMappingComplexProperties(
          p.Type,
          enumTypes,
          formattedTypes,
          isCollection,
          isEnum,
          isComplex
        );
        return {
          originalName: p.Name,
          instancePropertyName,
          staticPropertyName: formatter.originalToStaticPropertyName(
            c.Name,
            p.Name
          ),
          propertyNameAsParam:
            applyPrefixOnJsConflictParam(instancePropertyName),
          description: propertyDescription(p),
          technicalName: p.Name,
          nullable: isNullableProperty(p),
          edmType: typeMapping.edmType,
          jsType: typeMapping.jsType,
          fieldType: typeMapping.fieldType,
          isComplex,
          isEnum,
          isCollection
        };
      }),
      namespace: c.Namespace
    };
  });
}
/**
 * @internal
 */
export function getTypeMappingComplexProperties(
  typeName: string,
  enumTypes: VdmEnumType[],
  formattedTypes: Record<string, any>,
  isCollection: boolean,
  isEnum: boolean,
  isComplex: boolean
): VdmMappedEdmType {
  if (isEdmType(typeName)) {
    const edmFallback = getFallbackEdmTypeIfNeeded(typeName);
    return {
      edmType: edmFallback,
      jsType: edmToTsType(edmFallback),
      fieldType: edmToComplexPropertyType(edmFallback)
    };
  }

  if (isCollection) {
    return typesForCollection(typeName, enumTypes, undefined, formattedTypes);
  }

  if (isEnum) {
    return {
      edmType: 'Edm.Enum',
      jsType: enumTypeForName(typeName, enumTypes),
      fieldType: 'EnumField'
    };
  }

  if (isComplex) {
    const withoutPrefix = complexTypeName(typeName)!;
    return {
      edmType: typeName,
      jsType: formattedTypes[withoutPrefix],
      fieldType: complexTypeFieldType(formattedTypes[withoutPrefix])
    };
  }
  throw new Error(`No types found for ${typeName}`);
}
