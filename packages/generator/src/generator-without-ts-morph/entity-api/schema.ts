import { documentationBlock } from '@sap-cloud-sdk/util';
import {
  VdmEntity,
  VdmNavigationProperty,
  VdmProperty,
  VdmServiceMetadata
} from '../../vdm-types';
import {
  addLeadingNewline,
  getStaticNavPropertyDescription,
  getStaticPropertyDescription
} from '../../typedoc';
import { createPropertyFieldInitializerForEntity } from '../../entity';
import { linkClass } from '../../generator-utils';

/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function getSchema(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string {
  return `{ 
    ${[
      ...properties(entity),
      ...navigationProperties(entity, service),
      allFieldsSelector(entity)
    ].join(',\n')} 
  }`;
}

function properties(entity: VdmEntity): string[] {
  return entity.properties.map(prop => property(prop));
}

function property(prop: VdmProperty): string {
  return [
    documentationBlock`${getStaticPropertyDescription(prop)}`,
    `${prop.staticPropertyName}: ${createPropertyFieldInitializerForEntity(
      prop,
      'fieldBuilder'
    )}`
  ].join('\n');
}

function navigationProperties(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string[] {
  return entity.navigationProperties.map(navProp =>
    navigationProperty(navProp, service)
  );
}

function navigationProperty(
  navProp: VdmNavigationProperty,
  service: VdmServiceMetadata
): string {
  const matchedEntity = service.entities.find(
    e => e.entitySetName === navProp.to
  );
  if (!matchedEntity) {
    throw Error(
      `Failed to find the entity from the service: ${JSON.stringify(
        service
      )} for nav property ${navProp}`
    );
  }

  const toEntity = matchedEntity.className;

  return [
    documentationBlock`${getStaticNavPropertyDescription(navProp)}`,
    `${navProp.staticPropertyName}: new ${linkClass(
      navProp,
      service.oDataVersion
    )}('${navProp.originalName}', this, new ${toEntity}Api(deSerializers))`
  ].join('\n');
}

function allFieldsSelector(entity: VdmEntity): string {
  return [
    documentationBlock`${addLeadingNewline('All fields selector.')}`,
    `ALL_FIELDS: new AllFields('*', ${entity.className})`
  ].join('\n');
}
