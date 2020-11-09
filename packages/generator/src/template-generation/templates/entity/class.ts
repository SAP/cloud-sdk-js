import { VdmEntity, VdmServiceMetadata } from '../../../vdm-types';
import { codeBlock } from '../general/common';
import {
  instanceNavigationProperty,
  instanceProperty
} from './instance-property';

const communicationScenarioLine = (service: VdmServiceMetadata) =>
  service?.apiBusinessHubMetadata?.communicationScenario
    ? `
  * This service is part of the following communication scenarios: ${service.apiBusinessHubMetadata.communicationScenario}.`
    : '';
const moreInformationLine = (service: VdmServiceMetadata) =>
  service?.apiBusinessHubMetadata?.url
    ? `
  * See ${service.apiBusinessHubMetadata.url} for more information.`
    : '';
const oDataVersionSuffix = (service: VdmServiceMetadata) =>
  service.oDataVersion.toUpperCase();

export const entityClass = (
  service: VdmServiceMetadata,
  entity: VdmEntity
) => codeBlock`
/**
 * This class represents the entity "${entity.entitySetName}" of service "${
  service.namespace
}".${communicationScenarioLine(service)}${moreInformationLine(service)}
 */
export class ${entity.className} extends Entity${oDataVersionSuffix(
  service
)} implements ${entity.className}Type {
  /**
   * Technical entity name for ${entity.className}.
   */
  static _entityName = '${entity.entitySetName}';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for ${entity.className}.
   */
  static _serviceName = '${service.namespace}';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '${service.servicePath}';
  ${entity.properties.map(property => instanceProperty(property)).join('\n')}
  ${entity.navigationProperties
    .map(navigationProperty => instanceNavigationProperty(navigationProperty))
    .join('\n')}

  /**
   * Returns an entity builder to construct instances \`${entity.className}\`.
   * @returns A builder that constructs instances of entity type \`${
     entity.className
   }\`.
   */
  static builder(): EntityBuilderType<${entity.className}, ${
  entity.className
}Type> {
    return Entity${oDataVersionSuffix(service)}.entityBuilder(${
  entity.className
});
  }

  /**
   * Returns a request builder to construct requests for operations on the \`${
     entity.className
   }\` entity type.
   * @returns A \`${entity.className}\` request builder.
   */
  static requestBuilder(): ${entity.className}RequestBuilder {
    return new ${entity.className}RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity \`${
     entity.className
   }\`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type \`${
     entity.className
   }\`.
   */
  static customField(fieldName: string): CustomField${oDataVersionSuffix(
    service
  )}<${entity.className}> {
    return Entity${oDataVersionSuffix(
      service
    )}.customFieldSelector(fieldName, ${entity.className});
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}
`;
