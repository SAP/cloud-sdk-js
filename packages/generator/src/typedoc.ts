import { unixEOL, titleFormat } from '@sap-cloud-sdk/util';
import { endWithDot } from './generator-utils';
import {
  VdmComplexType,
  VdmEntity,
  VdmEnumType,
  VdmNavigationProperty,
  VdmProperty,
  VdmPropertyValueConstraints,
  VdmServiceMetadata
} from './vdm-types';
import { getServiceName } from './service-generator';
export function getFunctionDoc(
  description: string,
  tags: Partial<{
    typeparams: DocType[];
    params: NamedDocType[];
    returns: DocType;
  }>
): string {
  if (tags) {
    if (tags.typeparams) {
      tags.typeparams.forEach(typeparam => {
        description += tagToText(
          'typeparam',
          `${typeparam.type} ${typeparam.description}`
        );
      });
    }
    if (tags.params && tags.params.length) {
      tags.params.forEach(param => {
        description += tagToText('param', `${param.name} ${param.description}`);
      });
    }
    if (tags.returns) {
      description += tagToText('returns', `${tags.returns.description}`);
    }
  }
  return description;
}

export function getComplexTypeFieldDescription(
  complexType: VdmComplexType
): string {
  return `${complexType.fieldType}${unixEOL}@typeparam EntityT - Type of the entity the complex type field belongs to.`;
}

export function getPropertyDescription(
  property: VdmProperty,
  constraints: VdmPropertyValueConstraints = { nullable: false }
): string {
  return addConstraints(
    property.description ||
      endWithDot(titleFormat(property.instancePropertyName).trim()),
    constraints
  );
}

/**
 * Adds a leading \n to a documentation string so that the ts-morph makes a block comment out of it.
 * @param documentation text.
 * @returns documentation text with leading \n.
 */
export function addLeadingNewline(documentation: string): string {
  if (!documentation.startsWith(unixEOL)) {
    return unixEOL + documentation;
  }
  return documentation;
}

export function getNavPropertyDescription(
  property: VdmNavigationProperty
): string {
  return `${
    property.isCollection ? 'One-to-many' : 'One-to-one'
  } navigation property to the [[${
    property.toEntityClassName
  }]] entity.`.trim();
}

export function getComplexTypePropertyDescription(
  property: VdmProperty,
  complexTypeName: string
): string {
  return `Representation of the [[${complexTypeName}.${property.instancePropertyName}]] property for query construction.${unixEOL}Use to reference this property in query operations such as 'filter' in the fluent request API.`;
}

export function getStaticPropertyDescription(property: VdmProperty): string {
  return `Static representation of the [[${property.instancePropertyName}]] property for query construction.${unixEOL}Use to reference this property in query operations such as 'select' in the fluent request API.`;
}

export function getStaticNavPropertyDescription(
  property: VdmNavigationProperty
): string {
  return `Static representation of the ${
    property.isCollection ? 'one-to-many' : 'one-to-one'
  } navigation property [[${
    property.instancePropertyName
  }]] for query construction.${unixEOL}Use to reference this property in query operations such as 'select' in the fluent request API.`;
}

export function getEntityDescription(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string {
  let description = entityDescription(
    entity.entitySetName,
    getServiceName(service)
  );

  if (
    service.apiBusinessHubMetadata &&
    service.apiBusinessHubMetadata.communicationScenario
  ) {
    description = partOfCommunicationScenarios(
      service.apiBusinessHubMetadata.communicationScenario
    );
  }

  if (service.apiBusinessHubMetadata) {
    description = seeForMoreInformation(service.apiBusinessHubMetadata.url);
  }

  return description;
}

const entityDescription = (entitySetName: string, speakingModuleName: string) =>
  `This class represents the entity "${entitySetName}" of service "${speakingModuleName}".`;
const seeForMoreInformation = (url: string) =>
  `See ${url} for more information.`;

const partOfCommunicationScenarios = (communicationScenarios: string) =>
  `This service is part of the following communication scenarios: ${communicationScenarios}.`;
export function getRequestBuilderDescription(entity: VdmEntity): string {
  return `Request builder class for operations supported on the [[${entity.className}]] entity.`;
}

export function getLookupDescription(service: VdmServiceMetadata): string {
  return `Lookup class for finding the constructor for an entity of the [[${service.className}]] service.`;
}

function addConstraints(
  description: string,
  constraints: VdmPropertyValueConstraints
): string {
  if (constraints.maxLength) {
    description += `${unixEOL}Maximum length: ${constraints.maxLength}.`;
  }
  if (constraints.nullable) {
    description += `${unixEOL}@nullable`;
  }

  return description;
}

export interface DocType {
  type: string;
  description: string;
}

export interface NamedDocType extends DocType {
  name: string;
}

function tagToText(tag: string, descr = ''): string {
  return `${unixEOL}@${tag}` + (descr ? ` ${descr}` : '');
}

export function enumDocs(enumType: VdmEnumType): string {
  return [
    `This enum represents the enum type "[[${enumType.originalName}]]".`,
    `The members represent values of EDM type ${enumType.underlyingType}.`
  ].join(`${unixEOL}`);
}
