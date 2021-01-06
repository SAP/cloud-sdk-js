import { propertyExists } from '@sap-cloud-sdk/util';
import { ServiceMapping, VdmMapping } from './service-mapping';
import { UniqueNameFinder } from './unique-name-finder';

export class GlobalNameFormatter {
  private directoryNameFinder: UniqueNameFinder = new UniqueNameFinder('-');
  private npmPackageNameFinder: UniqueNameFinder = new UniqueNameFinder('-');
  private vdmMapping: VdmMapping;

  constructor(vdmMapping: VdmMapping | undefined) {
    this.vdmMapping = vdmMapping || {};
    this.directoryNameFinder.addToUsedNames(
      ...Object.entries(this.vdmMapping).map(([, v]) => v.directoryName)
    );
    this.npmPackageNameFinder.addToUsedNames(
      ...Object.entries(this.vdmMapping).map(([, v]) => v.npmPackageName)
    );
  }

  public uniqueDirectoryName(
    directoryName: string,
    originalFileName: string
  ): string {
    return (
      this.directoryNameFromMapping(originalFileName) ||
      this.transformAndCacheDirectoryName(directoryName)
    );
  }

  public uniqueNpmPackageName(
    npmPackageName: string,
    originalFileName: string
  ): string {
    return (
      this.npmPackageNameFromMapping(originalFileName) ||
      this.transformAndCacheNpmPackageName(npmPackageName)
    );
  }

  private transformAndCacheDirectoryName(directoryName: string): string {
    const newName = this.directoryNameFinder.findUniqueName(directoryName);
    this.directoryNameFinder.addToUsedNames(newName);
    return newName;
  }

  private transformAndCacheNpmPackageName(npmPackageName: string): string {
    const newName = this.npmPackageNameFinder.findUniqueName(npmPackageName);
    this.npmPackageNameFinder.addToUsedNames(newName);
    return newName;
  }

  private directoryNameFromMapping(
    originalFileName: string
  ): string | undefined {
    return this.fromMapping(originalFileName, 'directoryName');
  }

  private npmPackageNameFromMapping(
    originalFileName: string
  ): string | undefined {
    return this.fromMapping(originalFileName, 'npmPackageName');
  }

  private fromMapping(
    originalFileName: string,
    key: keyof ServiceMapping
  ): string | undefined {
    return propertyExists(this.vdmMapping, originalFileName, key)
      ? this.vdmMapping[originalFileName][key]
      : undefined;
  }
}
