import { EdmxComplexTypeBase, EdmxMetadataBase, EdmxNamed, EdmxProperty, SwaggerProperty } from './parser-types';
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
import { longDescription } from './description-util';



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

const complexTypeFieldType = (typeName: string) => typeName + 'Field';

function checkCollectionKind(property: EdmxProperty) {
  if (property.hasOwnProperty('CollectionKind')) {
    logger.warn(
      `"CollectionKind" attribute found in the "${property.Name}" property. Currently, handling collection of properties is not supported by the generator.`
    );
  }
}

function propertyDescription(
  property: EdmxProperty,
  swaggerProperty?: SwaggerProperty
): string {
  const short = shortPropertyDescription(property, swaggerProperty);
  const long = longDescription(property, swaggerProperty);
  return `${short}\n${long}`.trim();
}


function shortPropertyDescription(
  property: EdmxProperty,
  swaggerProperty?: SwaggerProperty
): string {
  let desc = '';
  if (property['sap:quickinfo']) {
    desc = property['sap:quickinfo'];
  } else if (property['sap:label']) {
    desc = property['sap:label'];
  } else if (swaggerProperty && swaggerProperty.title) {
    desc = swaggerProperty.title;
  }
  return endWithDot(desc.trim());
}
