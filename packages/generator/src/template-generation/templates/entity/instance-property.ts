import { VdmNavigationProperty, VdmProperty } from '../../../vdm-types';
import { codeBlock } from '../general/common';
import { titleFormat } from '../general/title-format';

const maxLengthLine = (propertyData: VdmProperty) =>
  propertyData.maxLength
    ? `
 * Maximum length: ${propertyData.maxLength}.`
    : '';
const nullableLine = (propertyData: VdmProperty) =>
  propertyData.nullable
    ? `
 * @nullable`
    : '';
export const instanceProperty = (property: VdmProperty) => codeBlock`
/**
 * ${
   property.description || titleFormat(property.instancePropertyName) + '.'
 }${maxLengthLine(property)}${nullableLine(property)}
 */
${property.instancePropertyName}${property.nullable ? '?' : '!'}: ${
  property.jsType
}${property.isCollection ? '[]' : ''};
`;

export const instanceNavigationProperty = (
  navigationProperty: VdmNavigationProperty
) => `
/**
 * ${
   navigationProperty.isCollection ? 'One-to-many' : 'One-to-one'
 } navigation property to the [[${
  navigationProperty.toEntityClassName
}]] entity.
 */
${navigationProperty.instancePropertyName}!: ${
  navigationProperty.toEntityClassName
}${navigationProperty.isCollection ? '[]' : ''};
`;
