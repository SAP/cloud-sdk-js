/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { existsSync, PathLike, readFileSync } from 'fs';
import { GeneratorOptions } from './generator-options';
import { VdmServiceMetadata } from './vdm-types';

export const VALUE_IS_UNDEFINED = 'VALUE_IS_UNDEFINED';

export interface VdmMapping {
  [fileName: string]: ServiceMapping;
}

export interface ServiceMapping {
  directoryName: string;
  servicePath: string;
  npmPackageName: string;
}

function readJSON(path: PathLike): { [key: string]: any } {
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, 'utf8'));
  }
  return {};
}

export function readServiceMapping(options: GeneratorOptions): VdmMapping {
  return (options.serviceMapping && (readJSON(options.serviceMapping) as VdmMapping)) || {};
}

export function serviceMapping(services: VdmServiceMetadata[]): VdmMapping {
  return services.reduce((vdmMapping, service) => {
    vdmMapping[service.originalFileName] = {
      directoryName: service.directoryName,
      servicePath: service.servicePath,
      npmPackageName: service.npmPackageName
    };

    return vdmMapping;
  }, {});
}

export function serviceMappingFile(services: VdmServiceMetadata[]): string {
  return JSON.stringify(serviceMapping(services), null, 2) + '\n';
}
