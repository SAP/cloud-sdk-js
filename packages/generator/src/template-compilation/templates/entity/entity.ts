/* eslint-disable prettier/prettier */

import { VdmEntity, VdmServiceMetadata } from '../../../vdm-types';
import { codeBlock } from '../general/common';
import { entityImports, otherEntityImports } from '../../entity';
import { copyRight } from '../general/copyright';
import { imports } from '../general/imports';
import { entityClass } from './class';
import { entityInterface } from './interface';
import { entityNamespace } from './namespace';

export const entityTemplate = (
  entity: VdmEntity,
  service: VdmServiceMetadata) =>
  codeBlock`
${copyRight()}
${imports(entityImports(entity, service.oDataVersion))}

${entityClass(service, entity)}

${imports(otherEntityImports(service, entity))}

${entityInterface(entity)}

${entityNamespace(service, entity)}
`;
