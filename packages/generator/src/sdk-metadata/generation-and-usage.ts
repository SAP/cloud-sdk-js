import { MultiLineText } from '@sap-cloud-sdk/generator-common/internal';
import { VdmServiceMetadata } from '../vdm-types';
import { entityCodeSample, operationImportCodeSample } from './code-samples';
import { sampleOperationImport, getODataEntity } from './code-sample-util';

/**
 * @internal
 */
export function getApiSpecificUsage(
  service: VdmServiceMetadata
): MultiLineText {
  if (service.entities?.length > 0) {
    const entity = getODataEntity(service.originalFileName, service.entities);
    return entityCodeSample(
      entity.className,
      service.className,
      service.serviceOptions.directoryName
    );
  }
  // Return function/action import usage if no entity is found.
  if (service.operationImports.length > 0) {
    const operationImport = sampleOperationImport(
      service.originalFileName,
      service.operationImports
    );
    return operationImportCodeSample(
      operationImport,
      `${service.serviceOptions.directoryName}/operation-imports`
    );
  }
  return '';
}
