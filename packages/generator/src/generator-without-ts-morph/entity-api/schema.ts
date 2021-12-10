import { documentationBlock, flat, unixEOL } from '@sap-cloud-sdk/util';
import { VdmEntity, VdmProperty } from '../../vdm-types';
import { getStaticPropertyDescription } from '../../typedoc';
import { createPropertyFieldInitializerForEntity } from '../../entity';

/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function getSchema(entity: VdmEntity): string {
  return `{ 
    ${flat(properties(entity)).join(unixEOL)} 
  }`;
}

function properties(entity: VdmEntity): string[][] {
  return entity.properties.map(prop => property(prop));
}

function property(prop: VdmProperty): string[] {
  return [
    documentationBlock`${getStaticPropertyDescription(prop)}`,
    `${prop.staticPropertyName}: ${createPropertyFieldInitializerForEntity(
      prop,
      'fieldBuilder'
    )},`
  ];
}
