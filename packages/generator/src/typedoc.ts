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

/**
 * @internal
 */
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
          'typeParam',
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
/**
 * @internal
 */
export function getComplexTypeFieldDescription(
  complexType: VdmComplexType
): string {
  return `${complexType.fieldType}${unixEOL}@typeParam EntityT - Type of the entity the complex type field belongs to.`;
}
/**
 * @internal
 */
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
 * Adds a leading `\n` to a documentation string so that the ts-morph makes a block comment out of it.
 * @param documentation - Documentation text.
 * @returns Documentation text with leading `\n`.
 * @internal
 */
export function addLeadingNewline(documentation: string): string {
  if (!documentation.startsWith(unixEOL)) {
    return unixEOL + documentation;
  }
  return documentation;
}
/**
 * @internal
 */
export function getNavPropertyDescription(
  property: VdmNavigationProperty
): string {
  return `${
    property.isCollection ? 'One-to-many' : 'One-to-one'
  } navigation property to the {@link ${
    property.toEntityClassName
  }} entity.`.trim();
}
/**
 * @internal
 */
export function getComplexTypePropertyDescription(
  property: VdmProperty,
  complexTypeName: string
): string {
  return `Representation of the {@link ${complexTypeName}.${property.instancePropertyName}} property for query construction.${unixEOL}Use to reference this property in query operations such as 'filter' in the fluent request API.`;
}
/**
 * @internal
 */
export function getStaticPropertyDescription(property: VdmProperty): string {
  return `Static representation of the {@link ${property.instancePropertyName}} property for query construction.${unixEOL}Use to reference this property in query operations such as 'select' in the fluent request API.`;
}
/**
 * @internal
 */
export function getStaticNavPropertyDescription(
  property: VdmNavigationProperty
): string {
  return `Static representation of the ${
    property.isCollection ? 'one-to-many' : 'one-to-one'
  } navigation property {@link ${
    property.instancePropertyName
  }} for query construction.${unixEOL}Use to reference this property in query operations such as 'select' in the fluent request API.`;
}
/**
 * @internal
 */
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
/**
 * @internal
 */
export function getRequestBuilderDescription(entity: VdmEntity): string {
  return `Request builder class for operations supported on the {@link ${entity.className}} entity.`;
}
/**
 * @internal
 */
export function getLookupDescription(service: VdmServiceMetadata): string {
  return `Lookup class for finding the constructor for an entity of the {@link ${service.className}} service.`;
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
/**
 * @internal
 */
export interface DocType {
  /**
   * @internal
   */
  type: string;
  /**
   * @internal
   */
  description: string;
}
/**
 * @internal
 */
export interface NamedDocType extends DocType {
  /**
   * @internal
   */
  name: string;
}

function tagToText(tag: string, description = ''): string {
  return `${unixEOL}@${tag}` + (description ? ` ${description}` : '');
}
/**
 * @internal
 */
export function enumDocs(enumType: VdmEnumType): string {
  return [
    `This enum represents the enum type "{@link ${enumType.originalName}}".`,
    `The members represent values of EDM type ${enumType.underlyingType}.`
  ].join(`${unixEOL}`);
}
