import { serializeImports } from '@sap-cloud-sdk/generator-common/internal';
import { unixEOL } from '@sap-cloud-sdk/util';
import { requestBuilderClass } from './class';
import { requestBuilderImportDeclarations } from './imports';
import type { VdmEntity } from '../../vdm-types';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export function requestBuilderSourceFile(
  entity: VdmEntity,
  oDataVersion: ODataVersion,
  options?: CreateFileOptions
): string {
  const imports = serializeImports(
    requestBuilderImportDeclarations(entity, oDataVersion, options)
  );
  const content = requestBuilderClass(entity);
  return [imports, content].join(unixEOL);
}
