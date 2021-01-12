/**
 * Holds state on already used names and provides new names if there are naming conflicts.
 */
export class UniqueNameFinder {
  private static readonly MAXIMUM_NUMBER_OF_SUFFIX = 1000;

  private static getNameForComparison(
    name: string,
    caseSensitive: boolean
  ): string {
    return caseSensitive ? name : name.toLowerCase();
  }

  private usedNames: string[] = [];

  /**
   * Creates an instance of UniqueNameFinder.
   * @param separator The separator to be used when adding suffixes.
   * @param usedNames Sets the already used names considered in the finding process.
   */
  public constructor(
    private separator = '_',
    usedNames: readonly string[] = []
  ) {
    this.addToUsedNames(...usedNames);
  }

  /**
   * Adds the name(s) to the already used names.
   * @param names Names to be added
   */
  public addToUsedNames(...names: string[]) {
    this.usedNames.push(...names);
  }

  /**
   * Find a unique name by appending a number suffix seperated by the [[separator]] if necessary, e. g. if `MyName` is already taken `MyName_1` will be found by default.
   * If the name is already unique nothing is appended.
   * @param name The name to get a unique name from.
   * @param caseSensitive Whether to check the already used names in a case sensitive manner.
   * @returns A unique name
   */
  public findUniqueName(name: string, caseSensitive = true): string {
    return this.findUniqueNameWithSuffixes(name, [], caseSensitive)[0];
  }

  /**
   * Find a unique name by appending a number suffix seperated by the [[separator]] if necessary, while respecting the given suffixes.
   * If the name is already unique nothing is appended.
   * Each given suffix is appended to the unique name in the result.
   * The resulting names are also checked for uniqueness.
   * All names in the result have the same number suffix.
   * Example: if `MyName` and `MyName_1MySuffix` is already taken, `[MyName_2, MyName_2MySuffix]` will be found by default.
   *
   * @param name The name to get a unique name from
   * @param suffixes Additional name of suffixes to be considered for the finding process, as well as the output.
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
    return names.some(name =>
      usedNames
        .map(usedName =>
          UniqueNameFinder.getNameForComparison(usedName, caseSensitive)
        )
        .includes(UniqueNameFinder.getNameForComparison(name, caseSensitive))
    );
  }

  private addSuffixes(
    name: string,
    suffix: number,
    nameSuffixes: string[]
  ): string[] {
    const nameWithoutSuffix = this.getNameWithoutSuffix(name);
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
    const modifiedName = this.getNameWithoutSuffix(name);
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

  private getNameWithoutSuffix(name: string): string {
    return name.replace(new RegExp(`${this.separator}\\d+$`), '');
  }
}
