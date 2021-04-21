import { UniqueNameGenerator, camelCase } from '@sap-cloud-sdk/util';

/**
 * Ensure uniqueness of names.
 * Takes a list of names and renames those that are duplicate.
 * @param names List of names to deduplicate.
 * @param options Object containing options to configure the transformation.
 * @param options.format Function to format the name. Defaults to camel case.
 * @param options.reservedWords Reserved words that should be handled as duplicates.
 * @returns Unique names in the given order.
 */
export function ensureUniqueNames(
  names: string[],
  options: {
    format?: (name: string) => string;
    reservedWords?: string[];
  } = {}
): string[] {
  const { format: format = camelCase, reservedWords = [] } = options;

  const correctNames = getCorrectNames(names, format, reservedWords);

  const nameGenerator = new UniqueNameGenerator('', [
    ...reservedWords,
    ...correctNames
  ]);

  return names.map(name => {
    if (correctNames.length && correctNames[0] === name) {
      correctNames.shift();
      return name;
    }
    return nameGenerator.generateAndSaveUniqueName(format(name));
  }, {});
}

/**
 * Get the names within a list of names that won't have to be renamed.
 * Those are the names that are unique and have a name that does not need to be formatted.
 * @param names Names to check.
 * @param format Function to format the name.
 * @param reservedWords Reserved words that should be handled as duplicates.
 * @returns A list of names that do not need to be renamed.
 */
function getCorrectNames(
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
