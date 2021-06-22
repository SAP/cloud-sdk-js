import { UniqueNameGenerator, camelCase, unique } from '@sap-cloud-sdk/util';
import { ParserOptions } from './options';

/**
 * Format names and ensure uniqueness of names.
 * With `strictNaming` enabled, duplicate names lead to an error.
 * With `strictNaming` disabled, duplicate names are renamed.
 * The formatted (and renamed) list of names has the same order and length as the original list.
 * @param names List of names to ensure uniqueness for.
 * @param options Parser options.
 * @param namingOptions Object containing options to configure the transformation.
 * @param options.format Function to format the name. Defaults to camel case.
 * @param options.reservedWords Reserved words that should be handled as duplicates.
 * @param options.separator Character between index and original name
 * @returns Unique names in the given order.
 */
export function ensureUniqueNames(
  names: string[],
  options: ParserOptions,
  namingOptions?: {
    format?: (name: string) => string;
    reservedWords?: string[];
    separator?: string;
  }
): string[] {
  const {
    format = camelCase,
    reservedWords = [],
    separator = ''
  } = namingOptions || {};

  if (options.strictNaming) {
    const formattedNames = names.map(originalName => format(originalName));
    validateUniqueness(names, formattedNames, reservedWords);
    return formattedNames;
  }
  return deduplicateNames(names, { format, reservedWords, separator });
}

/**
 * Validate uniqueness of names.
 * Takes a list of names and throws an error if there are duplicates after formatting.
 * @param names List of names to ensure uniqueness for.
 * @param formattedNames Original transformed names.
 * @param reservedWords Reserved words that should be handled as duplicates.
 */
export function validateUniqueness(
  names: string[],
  formattedNames: string[],
  reservedWords: string[] = []
): void {
  if (
    hasDuplicates(formattedNames) ||
    hasReservedWords(formattedNames, reservedWords)
  ) {
    throw new Error(
      getDuplicateErrorMessage(names, formattedNames, reservedWords)
    );
  }
}

/**
 * Deduplicate names.
 * Takes a list of names and renames those that are duplicate.
 * The renamed list has the same order as the original list.
 * @param names List of names to deduplicate.
 * @param namingOptions Object containing options to configure the transformation.
 * @param namingOptions.format Function to format the name.
 * @param namingOptions.reservedWords Reserved words that should be handled as duplicates.
 * @returns Unique names in the given order.
 */
export function deduplicateNames(
  names: string[],
  namingOptions?: {
    format?: (name: string) => string;
    reservedWords?: string[];
    separator?: string;
  }
): string[] {
  const {
    format = camelCase,
    reservedWords = [],
    separator = ''
  } = namingOptions || {};
  const nonConflictingNames = getNonConflictingNames(
    names,
    format,
    reservedWords
  );

  const nameGenerator = new UniqueNameGenerator(separator, [
    ...reservedWords,
    ...nonConflictingNames
  ]);

  return names.map(name => {
    if (nonConflictingNames.length && nonConflictingNames[0] === name) {
      nonConflictingNames.shift();
      return name;
    }
    return nameGenerator.generateAndSaveUniqueName(format(name));
  }, {});
}

/**
 * Get the names within a list of names that won't have to be renamed.
 * Those are the names that are unique and don't need to be formatted.
 * @param names Names to check.
 * @param format Function to format the name.
 * @param reservedWords Reserved words that should be handled as duplicates.
 * @returns A list of names that do not need to be renamed.
 */
function getNonConflictingNames(
  names: string[],
  format: (name: string) => string,
  reservedWords: string[]
): string[] {
  return names.reduce(
    (correctNames, name) =>
      isReserved(name, reservedWords) ||
      isDuplicate(name, correctNames) ||
      !isFormatted(name, format)
        ? correctNames
        : [...correctNames, name],
    []
  );
}

function isReserved(name: string, reservedWords: string[]): boolean {
  return reservedWords.includes(name);
}

function isDuplicate(name: string, correctNames: string[]): boolean {
  return correctNames.some(correctName => correctName === name);
}

function isFormatted(name: string, format: (name: string) => string): boolean {
  return format(name) === name;
}

function hasDuplicates(names: string[]): boolean {
  const uniqueNames = unique(names);
  return uniqueNames.length !== names.length;
}

function hasReservedWords(names: string[], reservedWords: string[]): boolean {
  return !!reservedWords.find(reservedWord => names.includes(reservedWord));
}

function getDuplicateErrorMessage(
  names: string[],
  formattedNames: string[],
  reservedWords: string[]
): string {
  const uniqueNames = unique(formattedNames);

  let errorMessage = '';

  if (hasDuplicates(formattedNames)) {
    errorMessage += `Some names are not unique after formatting.\n${getDuplicateErrorLines(
      names,
      formattedNames,
      uniqueNames,
      1
    )}`;
  }

  if (hasReservedWords(formattedNames, reservedWords)) {
    errorMessage += `Some names are reserved words after formatting.\n${getDuplicateErrorLines(
      names,
      formattedNames,
      reservedWords,
      0
    )}`;
  }

  return errorMessage;
}

/**
 * Get the formatted error output.
 * @param originalNames The original names, that contain duplicates after formatting.
 * @param formattedNames Original transformed names.
 * @param uniqueNames The unique formatted names.
 * @param threshold Number of occurrences allowed.
 * @returns Formatted output for an error with duplicates.
 */
function getDuplicateErrorLines(
  originalNames: string[],
  formattedNames: string[],
  uniqueNames: string[],
  threshold: number
): string {
  const duplicatesByName: Record<string, string[]> = uniqueNames.reduce(
    (duplicates, formattedName) => {
      const duplicateNames = originalNames.filter(
        (_, i) => formattedNames[i] === formattedName
      );
      return duplicateNames.length > threshold
        ? {
            ...duplicates,
            [formattedName]: duplicateNames
          }
        : duplicates;
    },
    {}
  );

  return Object.entries(duplicatesByName)
    .map(
      ([formattedName, duplicateNames]) =>
        `\tFormatted name: '${formattedName}', original names: ${duplicateNames
          .map(duplicate => `'${duplicate}'`)
          .join(', ')}.`
    )
    .join('\n');
}
