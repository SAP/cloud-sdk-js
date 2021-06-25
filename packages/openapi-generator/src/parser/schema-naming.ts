// Most likely this list is not complete
import { ParserOptions } from './options';

const illegalCharacterRegex = /[.#@/"'*%]+/g;
const startsWithNumberRegex = /^\d+/g;

function makeSchemaNameValid(name: string): string {
  while (name.match(illegalCharacterRegex)) {
    name = name.replace(illegalCharacterRegex, '');
  }
  if (name.match(startsWithNumberRegex)) {
    name = `schema${name}`;
  }
  return name;
}

/**
 *  This method takes a list of names and adjusts them so that they are allowed as schema names.
 *  For example in TypeScript a type definition must not start with integer.
 *  The order of the input values is contained in the changing process.
 *
 * @param names List of names to be adjusted.
 * @param options Parser options.
 * @returns A list of strings which are possible for schema names.
 */
export function ensureValidSchemaNames(
  names: string[],
  options: ParserOptions
): string[] {
  if (options.strictNaming) {
    validateSchemaNames(names);
  }

  return names.map(name => makeSchemaNameValid(name));
}

function validateSchemaNames(names: string[]): void {
  const namesStartingWithNumber = names.filter(name =>
    name.match(startsWithNumberRegex)
  );
  const namesContainingIllegalChars = names.filter(name =>
    name.match(illegalCharacterRegex)
  );

  const hasInvalidNames =
    namesStartingWithNumber.length || namesContainingIllegalChars.length;

  if (hasInvalidNames) {
    throw new Error(
      getErrorMessage(namesStartingWithNumber, namesContainingIllegalChars)
    );
  }
}

function getErrorMessage(
  namesStartingWithNumber: string[],
  namesContainingIllegalChars: string[]
): string {
  let message =
    'The service specification contains invalid schema names. Adjust the definition file or enable automatic name adjustment with `skipValidation`.';

  if (namesStartingWithNumber.length) {
    message += `\n\tInvalid names starting with a number: ${namesStartingWithNumber.map(
      name => `'${name}'`
    )}`;
  }
  if (namesContainingIllegalChars.length) {
    message += `\n\tInvalid names containing illegal characters: ${namesContainingIllegalChars.map(
      name => `'${name}'`
    )}`;
  }

  return message;
}
