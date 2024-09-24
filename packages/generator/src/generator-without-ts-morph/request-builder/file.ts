import { serializeImports } from '@sap-cloud-sdk/generator-common/internal';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import { unixEOL } from '@sap-cloud-sdk/util';
import type { VdmEntity } from '../../vdm-types';
import { requestBuilderClass } from './class';
import { requestBuilderImportDeclarations } from './imports';

/**
 * @internal
 */
export function requestBuilderSourceFile(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): string {
  const imports = serializeImports(
    requestBuilderImportDeclarations(entity, oDataVersion)
  );
  const content = requestBuilderClass(entity);
  return [imports, content].join(unixEOL);
}
