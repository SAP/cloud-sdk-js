/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { propertyExists } from '@sap-cloud-sdk/util';
import { pipe } from 'rambda';
import { applySuffixOnConflictDash } from './name-formatting-strategies';
import { ServiceMapping, VdmMapping } from './service-mapping';

export class GlobalNameFormatter {
  private directoryNamesCache: string[] = [];
  private npmPackageNamesCache: string[] = [];
  private vdmMapping: VdmMapping;

  constructor(vdmMapping: VdmMapping | undefined) {
    this.vdmMapping = vdmMapping || {};
    this.directoryNamesCache = Object.entries(this.vdmMapping).map(([k, v]) => v.directoryName);
    this.npmPackageNamesCache = Object.entries(this.vdmMapping).map(([k, v]) => v.npmPackageName);
  }

  public uniqueDirectoryName(directoryName: string, originalFileName: string): string {
    return this.directoryNameFromMapping(originalFileName) || this.transformAndCacheDirectoryName(directoryName);
  }

  public uniqueNpmPackageName(npmPackageName: string, originalFileName: string): string {
    return this.npmPackageNameFromMapping(originalFileName) || this.transformAndCacheNpmPackageName(npmPackageName);
  }

  private transformAndCacheDirectoryName(directoryName: string): string {
    return this.transformAndCache(directoryName, this.directoryNamesCache);
  }

  private transformAndCacheNpmPackageName(npmPackageName: string): string {
    return this.transformAndCache(npmPackageName, this.npmPackageNamesCache);
  }

  private transformAndCache(name: string, cache: string[]): string {
    return pipe(this.transformIfNecessary(cache), this.addToCache(cache))(name);
  }

  private addToCache = (cache: string[]) => (name: string): string => {
    cache.push(name);
    return name;
  };

  private transformIfNecessary = (cache: string[]) => (name: string): string =>
    cache.includes(name) ? applySuffixOnConflictDash(name, cache) : name;

  private directoryNameFromMapping(originalFileName: string): string | undefined {
    return this.fromMapping(originalFileName, 'directoryName');
  }

  private npmPackageNameFromMapping(originalFileName: string): string | undefined {
    return this.fromMapping(originalFileName, 'npmPackageName');
  }

  private fromMapping(originalFileName: string, key: keyof ServiceMapping): string | undefined {
    return propertyExists(this.vdmMapping, originalFileName, key) ? this.vdmMapping[originalFileName][key] : undefined;
  }
}
