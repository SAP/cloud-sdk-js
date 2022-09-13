import { codeBlock, documentationBlock } from '@sap-cloud-sdk/util';
import { linkClass } from '../../generator-utils';
import { getStaticNavPropertyDescription } from '../../typedoc';
import {
  VdmEntity,
  VdmServiceMetadata,
  VdmNavigationProperty
} from '../../vdm-types';
import { matchEntity } from './match-entity';

/**
 * @internal
 */
export function navigationPropertyFieldsVariable(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string {
  return codeBlock`private navigationPropertyFields!: {
    ${navigationPropertyTypes(entity, service).join(',\n')}
  };`;
}

/**
 * @internal
 */
export function addNavigationPropertyFieldsFunction(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string {
  return codeBlock`_addNavigationProperties(
    linkedApis: [
      ${navigationPropertyApiTypes(entity, service).join(',')}
    ]): this {
      this.navigationPropertyFields = {
        ${navigationProperties(entity, service).join(',\n')}
      };
      return this;
    }`;
}

function navigationProperties(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string[] {
  return entity.navigationProperties.map((navProp, i) =>
    navigationProperty(navProp, service, i)
  );
}

function navigationProperty(
  navProp: VdmNavigationProperty,
  service: VdmServiceMetadata,
  index: number
): string {
  return `${navProp.staticPropertyName}: new ${linkClass(
    navProp,
    service.oDataVersion
  )}(
    '${navProp.originalName}',
    this,
    linkedApis[${index}]
  )`;
}

/**
 * @internal
 */
export function navigationPropertyTypes(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string[] {
  return entity.navigationProperties.map(navProp =>
    navigationPropertyType(navProp, entity, service)
  );
}

function navigationPropertyType(
  navProp: VdmNavigationProperty,
  entity: VdmEntity,
  service: VdmServiceMetadata
): string {
  const toEntity = matchEntity(navProp, service).className;

  return [
    documentationBlock`${getStaticNavPropertyDescription(navProp)}`,
    `${navProp.staticPropertyName}: ${linkClass(navProp, service.oDataVersion)}<
      ${entity.className}<DeSerializersT>,
      DeSerializersT,
      ${toEntity}Api<DeSerializersT>
    >`
  ].join('\n');
}

function navigationPropertyApiTypes(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string[] {
  return entity.navigationProperties.map(navProp =>
    navigationPropertyApiType(navProp, service)
  );
}

function navigationPropertyApiType(
  navProp: VdmNavigationProperty,
  service: VdmServiceMetadata
): string {
  const toEntity = matchEntity(navProp, service).className;
  return `${toEntity}Api<DeSerializersT>`;
}
