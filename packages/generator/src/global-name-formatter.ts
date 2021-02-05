import { propertyExists, UniqueNameGenerator } from '@sap-cloud-sdk/util';
import { ServiceMapping, VdmMapping } from './service-mapping';

export class GlobalNameFormatter {
  private directoryNameGenerator = new UniqueNameGenerator('-');
  private npmPackageNameGenerator = new UniqueNameGenerator('-');
  private vdmMapping: VdmMapping;

  constructor(vdmMapping: VdmMapping | undefined) {
    this.vdmMapping = vdmMapping || {};
    this.directoryNameGenerator.addToUsedNames(
      ...Object.entries(this.vdmMapping).map(([, v]) => v.directoryName)
    );
    this.npmPackageNameGenerator.addToUsedNames(
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
    return this.directoryNameGenerator.generateAndSaveUniqueName(directoryName);
  }

  private transformAndCacheNpmPackageName(npmPackageName: string): string {
    return this.npmPackageNameGenerator.generateAndSaveUniqueName(
      npmPackageName
    );
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
