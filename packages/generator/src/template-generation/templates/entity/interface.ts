import {
  VdmEntity,
  VdmNavigationProperty,
  VdmProperty
} from '../../../vdm-types';
import { codeBlock } from '../general/common';

export const entityInterface = (entity: VdmEntity) => codeBlock`
export interface ${entity.className}Type {
  ${entity.properties.map(property => interfaceProperty(property)).join('\n')}
  ${entity.navigationProperties
    .map(navigationProperty => interfaceNavigationProperty(navigationProperty))
    .join('\n')}
}
`;

const interfaceProperty = (property: VdmProperty) =>
  `${property.instancePropertyName}${property.nullable ? '?' : ''}: ${
    property.jsType
  }${property.isCollection ? '[]' : ''}${property.nullable ? ' | null' : ''};`;

const interfaceNavigationProperty = (property: VdmNavigationProperty) =>
  `${property.instancePropertyName}: ${property.toEntityClassName}Type${
    property.isCollection ? '[]' : ''
  };`;
