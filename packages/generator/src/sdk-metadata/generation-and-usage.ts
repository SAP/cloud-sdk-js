import { entityCodeSample, operationCodeSample } from './code-samples';
import { sampleOperation, getODataEntity } from './code-sample-util';
import type { MultiLineText } from '@sap-cloud-sdk/generator-common/internal';
import type { VdmServiceMetadata } from '../vdm-types';

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
  if (service.operations.length > 0) {
    const operation = sampleOperation(
      service.originalFileName,
      service.operations
    );
    return operationCodeSample(
      operation,
      `${service.serviceOptions.directoryName}/operations`
    );
  }
  return '';
}
