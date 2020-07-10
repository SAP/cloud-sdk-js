/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { helpfulLinksSection } from '../service';
import { VdmServiceMetadata } from '../edmx-to-vdm/vdm-types';

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
