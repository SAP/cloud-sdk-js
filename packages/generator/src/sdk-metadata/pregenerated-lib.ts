import { packageDescription } from '@sap-cloud-sdk/generator-common/internal';
import { VdmServiceMetadata } from '../vdm-types';

/**
 * @internal
 */
export function getServiceDescription(service: VdmServiceMetadata): string {
  return packageDescription(service.directoryName);
}
