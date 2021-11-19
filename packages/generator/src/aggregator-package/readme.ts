import { unixEOL } from '@sap-cloud-sdk/util';
import { helpfulLinksSection } from '../service';
import { VdmServiceMetadata } from '../vdm-types';

// eslint-disable-next-line valid-jsdoc
/**
 * @internal
 */
export function aggregatorReadme(
  services: VdmServiceMetadata[],
  npmPackageName: string
): string {
  return [
    `# ${npmPackageName}`,
    '',
    'This package is an aggregation of the following packages:',
    ...services.map(p => `* ${p.npmPackageName}`),
    '',
    ...helpfulLinksSection(),
    ''
  ].join(unixEOL);
}
