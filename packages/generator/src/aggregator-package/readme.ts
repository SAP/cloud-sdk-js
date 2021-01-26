import { helpfulLinksSection } from '@sap-cloud-sdk/util';
import { VdmServiceMetadata } from '../vdm-types';

export function readme(
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
  ].join('\n');
}
