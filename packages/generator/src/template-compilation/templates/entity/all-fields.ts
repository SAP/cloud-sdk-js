import { VdmEntity, VdmServiceMetadata } from '../../../vdm-types';
import { allFieldTypes } from '../../entity';
import { codeBlock } from '../general/common';

export const allFields = (
  service: VdmServiceMetadata,
  entity: VdmEntity
) => codeBlock`
/**
 * All fields of the ${entity.className} entity.
 */
export const _allFields: Array<${allFieldTypes(service, entity).join(
  ' | '
)}> = [
  ${[...entity.properties, ...entity.navigationProperties]
    .map(property => `${entity.className}.${property.staticPropertyName}`)
    .join(',\n')}
];
`;
