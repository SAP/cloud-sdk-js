import {
  VdmEntity,
  VdmNavigationProperty,
  VdmProperty,
  VdmServiceMetadata
} from '../../../vdm-types';
import { codeBlock } from '../general/common';
import { allFields } from './all-fields';

export const entityNamespace = (
  service: VdmServiceMetadata,
  entity: VdmEntity
) => codeBlock`
export namespace ${entity.className} {
  ${entity.properties
    .map(property => staticProperty(entity, property))
    .join('\n')}
  ${entity.navigationProperties
    .map(navigationProperty =>
      staticNavigationProperty(entity, navigationProperty)
    )
    .join('\n')}
  ${allFields(service, entity)}
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<${
    entity.className
  }> = new AllFields('*', ${entity.className});
  /**
   * All key fields of the ${entity.className} entity.
   */
  export const _keyFields: Array<Field<${
    entity.className
  }>> = [${entity.keys
  .map(key => `${entity.className}.${key.staticPropertyName}`)
  .join(', ')}];
  /**
   * Mapping of all key field names to the respective static field property ${
     entity.className
   }.
   */
  export const _keys: { [keys: string]: Field<${entity.className}> } = ${
  entity.className
}._keyFields.reduce((acc: { [keys: string]: Field<${
  entity.className
}> }, field: Field<${entity.className}>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}

`;

const staticProperty = (entity: VdmEntity, property: VdmProperty) => codeBlock`
/**
 * Static representation of the [[${
   property.instancePropertyName
 }]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
export const ${property.staticPropertyName}: ${
  property.fieldType
}<${genericParameters(entity, property).join(', ')}> = new ${
  property.fieldType
}(${parameters(entity, property).join(', ')});
`;

const genericParameters = (
  entity: VdmEntity,
  property: VdmProperty
): string[] => {
  const params = [entity.className];
  if (property.isCollection) {
    if (property.isComplex) {
      return [...params, property.jsType];
    }
    if (property.isEnum) {
      return [...params, "'Edm.Enum'"];
    }
    return [...params, `'${property.edmType}'`];
  }

  return [...params];
};

const parameters = (entity: VdmEntity, property: VdmProperty): string[] => {
  const params = [`'${property.originalName}'`, entity.className];
  if (property.isCollection) {
    if (property.isComplex) {
      return [...params, property.jsType];
    }
    if (property.isEnum) {
      return [...params, "'Edm.Enum'"];
    }
    return [...params, `'${property.edmType}'`];
  }
  return property.isComplex || property.isEnum
    ? params
    : [...params, `'${property.edmType}'`];
};

const staticNavigationProperty = (
  entity: VdmEntity,
  navigationProperty: VdmNavigationProperty
) => codeBlock`
/**
 * Static representation of the ${
   navigationProperty.isCollection ? 'one-to-many' : 'one-to-one'
 } navigation property [[${
  navigationProperty.instancePropertyName
}]] for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
export const ${navigationProperty.staticPropertyName}: ${linkClass(
  navigationProperty
)}<${entity.className}, ${
  navigationProperty.toEntityClassName
}> = new ${linkClass(navigationProperty)}('${
  navigationProperty.originalName
}', ${entity.className}, ${navigationProperty.toEntityClassName});
`;

const linkClass = (navigationProperty: VdmNavigationProperty) =>
  navigationProperty.isCollection ? 'OneToManyLink' : 'OneToOneLink';
