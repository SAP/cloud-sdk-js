import { VdmEntity, VdmProperty } from '../../vdm-types';
import { getStaticPropertyDescription } from '../../typedoc';
import { documentationBlock, flat, unixEOL } from '@sap-cloud-sdk/util';
import { createPropertyFieldInitializerForEntity } from '../../entity';

export function getSchema(entity: VdmEntity): string{
  return `{ 
    ${flat(properties(entity)).join(unixEOL)} 
  }`
}

function properties(entity: VdmEntity): string[][] {
  return entity.properties.map(prop => property(prop));
}

function property(prop: VdmProperty): string[] {
  return [
    documentationBlock`${getStaticPropertyDescription(prop)}`,
    `${prop.staticPropertyName}: ${createPropertyFieldInitializerForEntity(prop, 'fieldBuilder')},`
  ];
}
