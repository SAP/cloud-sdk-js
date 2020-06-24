/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  reservedObjectPrototypeKeywords,
  reservedVdmKeywords
} from './name-formatting-reserved-key-words';

type Separator = '-' | '_';

export class UniqueNameFinder {
  private static readonly MAXIMUM_NUMBER_OF_SUFFIX = 1000;

  /**
   *
   * @param separator The separator to be used
   * @param alreadyUsedNames Sets the already used names considered in the finding process. Reserved TS keywords are always checked.
   */
  public constructor(
    private separator: Separator = '_',
    private alreadyUsedNames: string[] = []
  ) {
    this.alreadyUsedNames = alreadyUsedNames.slice();
  }

  /**
   * Adds the name(s) to the already used names.
   * @param nameOrnames Names to be added
   * @returns The instance of the finder.
   */ public addToAlreadyUsedNames(...names: string[]) {
    this.alreadyUsedNames.push(...names);
    return this;
  }

  /**
   * Find a unique name by appending a suffix of the form this.separator\d+ if necessary. If the name is already unique nothing is appended.
   * @param name The name to get a unique name from
   * @returns Unique name
   */
  public findUniqueName(name: string): string {
    return this.findUniqueNameWithSuffixes(name, [])[0];
  }

  /**
   * Find a unique name by appending a suffix of the form this.separator\d+ if necessary. If the name is already unique nothing is appended.
   * The suffixes are a list of strings appended to the name and these build names are also checked for uniqueness.
   *
   * @param name The name to get a unique name from
   * @param suffixes Additional name suffixed to be considered
   * @returns Unique names. The length of this array is one plus the number of suffixes provided. The first entry corresponds to the given name.
   */
  public findUniqueNameWithSuffixes(
    name: string,
    suffixes: string[]
  ): string[] {
    const relevantAlreadyUsedNames = this.removeUnnecessaryUsedNames(name);
    if (
      !this.areNamesAlreadyUsed(
        this.getAllNames(name, suffixes),
        relevantAlreadyUsedNames
      )
    ) {
      return [name, ...this.getAllNames(name, suffixes)];
    }
    const suffix = this.getUniqueNameUsingSuffix(
      name,
      relevantAlreadyUsedNames,
      suffixes
    );
    return this.addSuffixes(name, suffix, suffixes);
  }

  private areNamesAlreadyUsed(
    names: string[],
    alreadyUsedNames: string[]
  ): boolean {
    return names.some(
      name =>
        alreadyUsedNames.includes(name) ||
        reservedVdmKeywords.has(name) ||
        reservedObjectPrototypeKeywords.has(name)
    );
  }

  private removeSuffixIfPresent(name: string): string {
    return name.replace(new RegExp('_\\d+$'), '');
  }

  private addSuffixes(
    name: string,
    suffix: number,
    nameSuffixes: string[]
  ): string[] {
    const nameWithoutSuffix = this.removeSuffixIfPresent(name);
    const numberSuffix = `${nameWithoutSuffix}${this.separator}${suffix}`;
    return this.getAllNames(numberSuffix, nameSuffixes);
  }

  private getAllNames(name: string, suffixes: string[]): string[] {
    return [name, ...suffixes.map(nameSuffix => `${name}${nameSuffix}`)];
  }

  private removeUnnecessaryUsedNames(name: string): string[] {
    const nameSuffixRemoved = this.removeSuffixIfPresent(name);
    return this.alreadyUsedNames.filter(used =>
      used.startsWith(nameSuffixRemoved)
    );
  }

  private getUniqueNameUsingSuffix(
    name: string,
    alreadyUsedNames: string[],
    nameSuffixes: string[]
  ): number {
    let suffix = 1;

    // This algorithm has order N**2 for N identical names. With a sort you could get it down to N*log(N)
    // However with the related items in mind this is much easier and N should be small anyway.
    while (suffix < UniqueNameFinder.MAXIMUM_NUMBER_OF_SUFFIX) {
      const newNames = this.addSuffixes(name, suffix, nameSuffixes);
      if (!this.areNamesAlreadyUsed(newNames, alreadyUsedNames)) {
        return suffix;
      }
      suffix++;
    }
    throw new Error(
      `Unable to find a unique name for ${name} within the range of ${UniqueNameFinder.MAXIMUM_NUMBER_OF_SUFFIX} suffixes.`
    );
  }
}
