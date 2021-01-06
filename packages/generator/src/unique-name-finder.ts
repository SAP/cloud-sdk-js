import {
  reservedObjectPrototypeKeywords,
  reservedVdmKeywords
} from './name-formatting-reserved-key-words';

type Separator = '-' | '_';

/**
 * Holds state on already used names and provides new names if there are naming conflicts.
 */
export class UniqueNameFinder {
  private static readonly MAXIMUM_NUMBER_OF_SUFFIX = 1000;

  private static removeSuffixIfPresent(name: string): string {
    return name.replace(new RegExp('_\\d+$'), '');
  }

  private static getNameForComparison(
    name: string,
    caseSensitive: boolean
  ): string {
    return caseSensitive ? name : name.toLowerCase();
  }

  private usedNames: string[] = [];

  /**
   * Creates an instance of UniqueNameFinder.
   * @param separator The separator to be used
   * @param usedNames Sets the already used names considered in the finding process. Reserved TS keywords are always checked.
   */
  public constructor(
    private separator: Separator = '_',
    usedNames: string[] = []
  ) {
    this.addToUsedNames(...usedNames);
  }

  /**
   * Adds the name(s) to the already used names.
   * @param names Names to be added
   * @returns The instance of the finder.
   */
  public addToUsedNames(...names: string[]): this {
    this.usedNames.push(...names);
    return this;
  }

  /**
   * Find a unique name by appending a suffix of the form this.separator\d+ if necessary. If the name is already unique nothing is appended.
   * @param name The name to get a unique name from.
   * @param caseSensitive Whether to check the already used names in a case sensitive manner.
   * @returns A unique name
   */
  public findUniqueName(name: string, caseSensitive = true): string {
    return this.findUniqueNameWithSuffixes(name, [], caseSensitive)[0];
  }

  /**
   * Find a unique name by appending a suffix of the form this.separator\d+ if necessary. If the name is already unique nothing is appended.
   * The suffixes are a list of strings appended to the name and these build names are also checked for uniqueness.
   *
   * @param name The name to get a unique name from
   * @param suffixes Additional name suffixed to be considered
   * @param caseSensitive Whether to check the already used names in a case sensitive manner.
   * @returns A list of unique names. The length of this array is one plus the number of suffixes provided. The first entry corresponds to the given name.
   */
  public findUniqueNameWithSuffixes(
    name: string,
    suffixes: string[],
    caseSensitive = true
  ): string[] {
    const relevantUsedNames = this.getUsedNamesStartingWith(
      name,
      caseSensitive
    );
    if (
      !this.areNamesUsed(
        this.getAllNames(name, suffixes),
        relevantUsedNames,
        caseSensitive
      )
    ) {
      return [name, ...this.getAllNames(name, suffixes)];
    }
    const suffix = this.getUniqueNameUsingSuffix(
      name,
      relevantUsedNames,
      suffixes,
      caseSensitive
    );
    return this.addSuffixes(name, suffix, suffixes);
  }

  private getUsedNamesForComparison(caseSensitive: boolean): string[] {
    return this.usedNames.map(name =>
      UniqueNameFinder.getNameForComparison(name, caseSensitive)
    );
  }

  private areNamesUsed(
    names: string[],
    usedNames: string[],
    caseSensitive: boolean
  ): boolean {
    return names.some(
      name =>
        usedNames
          .map(usedName =>
            UniqueNameFinder.getNameForComparison(usedName, caseSensitive)
          )
          .includes(
            UniqueNameFinder.getNameForComparison(name, caseSensitive)
          ) ||
        reservedVdmKeywords.has(name) ||
        reservedObjectPrototypeKeywords.has(name)
    );
  }

  private addSuffixes(
    name: string,
    suffix: number,
    nameSuffixes: string[]
  ): string[] {
    const nameWithoutSuffix = UniqueNameFinder.removeSuffixIfPresent(name);
    const numberSuffix = `${nameWithoutSuffix}${this.separator}${suffix}`;
    return this.getAllNames(numberSuffix, nameSuffixes);
  }

  private getAllNames(name: string, suffixes: string[]): string[] {
    return [name, ...suffixes.map(nameSuffix => `${name}${nameSuffix}`)];
  }

  private getUsedNamesStartingWith(
    name: string,
    caseSensitive: boolean
  ): string[] {
    const modifiedName = UniqueNameFinder.removeSuffixIfPresent(name);
    return this.getUsedNamesForComparison(caseSensitive).filter(used =>
      used.startsWith(
        UniqueNameFinder.getNameForComparison(modifiedName, caseSensitive)
      )
    );
  }

  private getUniqueNameUsingSuffix(
    name: string,
    usedNames: string[],
    nameSuffixes: string[],
    caseSensitive: boolean
  ): number {
    let suffix = 1;

    // This algorithm has order N**2 for N identical names. With a sort you could get it down to N*log(N)
    // However with the related items in mind this is much easier and N should be small anyway.
    while (suffix < UniqueNameFinder.MAXIMUM_NUMBER_OF_SUFFIX) {
      const newNames = this.addSuffixes(name, suffix, nameSuffixes);
      if (!this.areNamesUsed(newNames, usedNames, caseSensitive)) {
        return suffix;
      }
      suffix++;
    }
    throw new Error(
      `Unable to find a unique name for ${name} within the range of ${UniqueNameFinder.MAXIMUM_NUMBER_OF_SUFFIX} suffixes.`
    );
  }
}
