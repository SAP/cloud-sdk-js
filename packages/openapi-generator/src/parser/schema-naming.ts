// Most likely this list is not complete
import { EOL } from 'os';
import { ParserOptions } from './options';

const illegalCharacterRegex = /[.#@/"'*%]+/g;
const startWithIntegerRegex = /^\d+/g;

function isValidSchemaName(name: string): boolean {
  if (name.match(startWithIntegerRegex)) {
    return false;
  }
  if (name.match(illegalCharacterRegex)) {
    return false;
  }
  return true;
}

function makeSchemaNameValid(name: string): string {
  if (name.match(illegalCharacterRegex)) {
    while (name.match(illegalCharacterRegex)) {
      name = name.replace(illegalCharacterRegex, '');
    }
  }
  if (name.match(startWithIntegerRegex)) {
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
export function ensureUValidSchemaNames(
  names: string[],
  options: ParserOptions
): string[] {
  const nonValidNames = names.filter(name => !isValidSchemaName(name));

  if (nonValidNames.length > 0) {
    if (options.strictNaming) {
      throw new Error(getNonValidNameErrorMessages(nonValidNames));
    }
    return names.map(name => makeSchemaNameValid(name));
  }
  return names;
}

function getNonValidNameErrorMessages(nonValidSchemaNames: string[]) {
  const header =
    "Your OpenApi definition contains the invalid schema names. The SDK generator can adjust such names automatically if you disable 'strictNaming' or you adjust the schema. The errors are:";
  const errors = nonValidSchemaNames.map(nonValidSchemaName =>
    getErrorMessage(nonValidSchemaName)
  );
  return [header, ...errors].join(EOL);
}

function getErrorMessage(nonValidSchemaName: string): string {
  if (nonValidSchemaName.match(startWithIntegerRegex)) {
    return `The schema ${nonValidSchemaName} starts with an integer.`;
  }

  if (nonValidSchemaName.match(illegalCharacterRegex)) {
    return `The schema ${nonValidSchemaName} contains an illegal character.`;
  }
  throw new Error(
    `The getErrorMessage function was called with ${nonValidSchemaName} but no violation was found.`
  );
}
