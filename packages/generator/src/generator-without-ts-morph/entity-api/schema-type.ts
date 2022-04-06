import { VdmEntity, VdmProperty, VdmServiceMetadata } from '../../vdm-types';
import { createPropertyFieldType } from '../../entity';
import { navigationPropertyTypes } from './navigation-properties';

/**
 * @internal
 */
export function getSchemaType(
  entity: VdmEntity,
  service: VdmServiceMetadata
): string {
  return `{
    ${[
      ...propertyTypes(entity),
      ...navigationPropertyTypes(entity, service),
      allFieldsType(entity.className)
    ].join(',\n')}
  }`;
}

function propertyTypes(entity: VdmEntity): string[] {
  return entity.properties.map(prop => propertyType(entity.className, prop));
}

function propertyType(className: string, prop: VdmProperty): string {
  return [
    `${prop.staticPropertyName}: ${createPropertyFieldType(className, prop)}`
  ].join('\n');
}

function allFieldsType(className: string): string {
  return [`ALL_FIELDS: AllFields<${className}<DeSerializers>>`].join('\n');
}
