import { documentationBlock } from '@sap-cloud-sdk/util';
import { addLeadingNewline, getStaticPropertyDescription } from '../../typedoc';
import { createPropertyFieldInitializerForEntity } from '../../entity';
import type {
  VdmEntity,
  VdmProperty,
  VdmServiceMetadata
} from '../../vdm-types';

/**
 * @internal
 */
export function getSchema(
  entity: VdmEntity,
  service?: VdmServiceMetadata
): string {
  return `{ 
    ${[
      ...properties(entity, service),
      '...this.navigationPropertyFields',
      // ...navigationProperties(entity, service),
      allFieldsSelector(entity)
    ].join(',\n')} 
  }`;
}

function properties(entity: VdmEntity, service?: VdmServiceMetadata): string[] {
  return entity.properties.map(prop => property(prop, service));
}

function property(prop: VdmProperty, service?: VdmServiceMetadata): string {
  return [
    documentationBlock`${getStaticPropertyDescription(prop)}`,
    `${prop.staticPropertyName}: ${createPropertyFieldInitializerForEntity(
      prop,
      'fieldBuilder',
      service
    )}`
  ].join('\n');
}

function allFieldsSelector(entity: VdmEntity): string {
  return [
    documentationBlock`${addLeadingNewline('All fields selector.')}`,
    `ALL_FIELDS: new AllFields('*', ${entity.className})`
  ].join('\n');
}
