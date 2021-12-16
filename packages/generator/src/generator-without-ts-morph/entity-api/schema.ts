import { documentationBlock } from '@sap-cloud-sdk/util';
import { VdmEntity, VdmProperty } from '../../vdm-types';
import { addLeadingNewline, getStaticPropertyDescription } from '../../typedoc';
import { createPropertyFieldInitializerForEntity } from '../../entity';

/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function getSchema(entity: VdmEntity): string {
  return `{ 
    ${[
      ...properties(entity),
      '...this.navigationPropertyFields',
      // ...navigationProperties(entity, service),
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

function allFieldsSelector(entity: VdmEntity): string {
  return [
    documentationBlock`${addLeadingNewline('All fields selector.')}`,
    `ALL_FIELDS: new AllFields('*', ${entity.className})`
  ].join('\n');
}
