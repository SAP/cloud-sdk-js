/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  reservedObjectPrototypeKeywords,
  reservedVdmKeywords
} from './name-formatting-reserved-key-words';

type Separator = '-' | '_';

export interface UniqueName {
  uniqueName: string;
  relatedUniqueNames: string[];
}
export class UniqueNameFinder {
  private static readonly MAXIMUM_NUMBER_OF_SUFFIX = 1000;

  public static getInstance(): UniqueNameFinder {
    return new UniqueNameFinder();
  }

  private separator: Separator = '_';
  private alreadyUsedNames: string[] = [];

  /**
   * Changes the default separator "_" to a different value.
   * @param separator The separator to be used
   * @returns The instance of the finder.
   */
  public withSeparator(separator: Separator): UniqueNameFinder {
    this.separator = separator;
    return this;
  }

  /**
   * Sets the already used names considered in the finding process. Reserved TS keywords are always checked.
   * @param names List of already used names
   * @returns The instance of the finder.
   */
  public withAlreadyUsedNames(names: string[]) {
    this.alreadyUsedNames = names;
    return this;
  }
  /**
   * In some cases a name is related to a set of names. For example an entity with name "MyEntity" will also need the name "MyEntityType" to be free.
   * This method creates all names related to a given input. Per default (s:string)=>[] is considered.
   * @param relatedNamesGetter Method returning the related names to a given one.
   * @returns The instance of the finder.
   */
  public withRelatedNames(relatedNamesGetter: (s: string) => string[]) {
    this.relatedNamesGetter = relatedNamesGetter;
    return this;
  }

  /**
   * Find a unique name by appending a suffix of the form this.separator\d+ if necessary. If the name is already unique nothing is appended.
   * The result contains also the addiotional related names with respect to the input with suffix if needed.
   * @param name The name to get a unique name from
   * @returns Unique name
   */
  public findUniqueName(name: string): UniqueName {
    const relevantAlreadyUsedNames = this.removeUnnecessaryUsedNames(name);
    if (this.isNameUnique(name, relevantAlreadyUsedNames)) {
      return this.toUniqueName(name);
    }
    const suffix = this.getUniqueNameUsingSuffix(
      name,
      relevantAlreadyUsedNames
    );
    return this.toUniqueName(this.addSuffix(name, suffix));
  }

  private relatedNamesGetter: (s: string) => string[] = (s: string) => [];

  private getNameWithRelatedNames(name: string): string[] {
    return [name, ...this.relatedNamesGetter(name)];
  }

  private toUniqueName(name: string): UniqueName {
    return {
      uniqueName: name,
      relatedUniqueNames: this.relatedNamesGetter(name)
    };
  }

  private isNameUnique(name: string, alreadyUsedNames: string[]): boolean {
    const names = this.getNameWithRelatedNames(name);

    return !names.some(
      nameToTest =>
        alreadyUsedNames.includes(nameToTest) ||
        reservedVdmKeywords.has(nameToTest) ||
        reservedObjectPrototypeKeywords.has(nameToTest)
    );
  }

  private removeSuffixIfPresent(name: string): string {
    const nameSuffixRemoved = name.replace(new RegExp('_\\d+$'), '');
    return nameSuffixRemoved;
  }

  private addSuffix(name: string, suffix: number): string {
    const nameWithoutSuffix = this.removeSuffixIfPresent(name);
    return `${nameWithoutSuffix}${this.separator}${suffix}`;
  }

  private removeUnnecessaryUsedNames(name: string): string[] {
    const nameSuffixRemoved = this.removeSuffixIfPresent(name);
    const relatedNames = this.getNameWithRelatedNames(nameSuffixRemoved);
    return relatedNames.reduce(
      (collected, current) => [
        ...collected,
        ...this.alreadyUsedNames.filter(used => used.startsWith(current))
      ],
      []
    );
  }

  private getUniqueNameUsingSuffix(
    name: string,
    alreadyUsedNames: string[]
  ): number {
    let suffix = 1;

    // This algorithm has order N**2 for N identical names. With a sort you could get it down to N*log(N)
    // However with the related items in mind this is much easier and N should be small anyway.
    while (suffix < this.MAXIMUM_NUMBER_OF_SUFFIX) {
      const newName = this.addSuffix(name, suffix);
      if (this.isNameUnique(newName, alreadyUsedNames)) {
        return suffix;
      }
      suffix++;
    }
    throw new Error(
      `Unable to find a unique name for ${name} within the range of 1000 suffixes.`
    );
  }
}
