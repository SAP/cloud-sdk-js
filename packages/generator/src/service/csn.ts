/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import edm2csn = require('@sap/edm-converters/lib/edmToCsn/lib/main');
import fs = require('fs');
import { VdmServiceMetadata } from '../edmx-to-vdm/vdm-types';

export async function csn(service: VdmServiceMetadata): Promise<string> {
  const xmlString = fs.readFileSync(service.edmxPath, 'utf8');
  return edm2csn.generateCSN(xmlString, false, true);
}
