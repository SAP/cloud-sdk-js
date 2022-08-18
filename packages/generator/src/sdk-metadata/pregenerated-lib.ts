import { packageDescription } from '@sap-cloud-sdk/generator-common/internal';
import { GeneratorOptions } from '../generator-options';
import { VdmServiceMetadata } from '../vdm-types';

/**
 * @internal
 */
export function getServiceDescription(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): string {
  return options.s4hanaCloud
    ? packageDescription(service.directoryName, (packageName: string) =>
        packageName.split('-').join(' ')
      )
    : packageDescription(service.directoryName);
}
