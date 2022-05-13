import { VdmServiceMetadata } from '../vdm-types';
import { GeneratorOptions } from '../generator-options';
import {
  genericDescription,
  s4hanaCloudDescription
} from '../package-description';

/**
 * @internal
 */
export function getServiceDescription(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): string {
  return options.s4hanaCloud
    ? s4hanaCloudDescription(service.directoryName)
    : genericDescription(service.directoryName);
}
