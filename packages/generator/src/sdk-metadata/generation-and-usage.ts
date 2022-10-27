import { MultiLineText } from '@sap-cloud-sdk/generator-common/internal';
import { VdmServiceMetadata } from '../vdm-types';
import {
  actionImportCodeSample,
  entityCodeSample,
  functionImportCodeSample
} from './code-samples';
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
      service.directoryName
    );
  }
  // Return function/action import usage if no entity is found.
  if (service.functionImports?.length > 0) {
    const functionImport = sampleOperationImport(
      service.originalFileName,
      service.functionImports
    );
    return functionImportCodeSample(
      functionImport,
      `${service.directoryName}/function-imports`
    );
  }
  if (service.actionImports) {
    const actionImport = sampleOperationImport(
      service.originalFileName,
      service.actionImports
    );
    return actionImportCodeSample(
      actionImport,
      `${service.directoryName}/action-imports`
    );
  }
  return '';
}
