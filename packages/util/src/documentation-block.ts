import { EOL } from 'os';
import { zip } from './array';
import { createLogger } from './logger';

const logger = createLogger('documentation-block');
/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Transform strings and arguments to a string formatted as a documentation block.
 * The formatting is block like so no leading or trailing spaces.
 * New lines in the beginning and end are also removed.
 * Use in tagged templates, e. g.:
 * ```
 * documentationBlock`Docs with ${arguments} and more content;`
 * ```
 * @param strings Strings in the tagged template. In the example above that would be ['Docs with ', ' and more content;'].
 * @param args Arguments in the tagged template. In the example above that would be the resolved value for `arguments`;
 * @returns A string formatted as documentation block.
 */
export function documentationBlock(
  strings: TemplateStringsArray,
  ...args: string[]
): string {
  if (isCodeBlockEmpty(strings.raw, args)) {
    return '';
  }

  let adjustedStrings = strings.raw as string[];
  adjustedStrings = removeSpaceNewLineStartAndEnd(adjustedStrings);
  adjustedStrings = removeWhiteSpaceAroundNewLine(adjustedStrings);
  adjustedStrings = addStarAfterNewLine(adjustedStrings);
  adjustedStrings = maskProblematicCharacters(adjustedStrings);

  let adjustedArgs = maskProblematicCharacters(args);
  adjustedArgs = addStarAfterNewLine(adjustedArgs);

  const content = zip(adjustedStrings, adjustedArgs).join('');
  return ['/**', ` * ${content}`, ' */'].join(EOL);
}

/*
This trimming ensures that if there are new lines in the beginning and end of a code block these are removed.
 */
function removeSpaceNewLineStartAndEnd(strings: string[]): string[] {
  const trimmed = [...strings];
  if (trimmed.length) {
    trimmed[0] = trimmed[0].trimStart();
    const lastIndex = trimmed.length - 1;
    trimmed[lastIndex] = trimmed[lastIndex].trimEnd();
  }
  return trimmed;
}

function isCodeBlockEmpty(strings: readonly string[], args: string[]): boolean {
  const stringsHaveContent = strings.some(
    str => str.replace(/\s*/g, '') !== ''
  );
  const argsHaveContent = args.some(arg => arg.replace(/\s*/g, '') !== '');
  return !stringsHaveContent && !argsHaveContent;
}

function addStarAfterNewLine(strings: string[]): string[] {
  return strings.map(str => str.replace(/\n/g, `${EOL} * `));
}

function removeWhiteSpaceAroundNewLine(strings: string[]): string[] {
  return strings.map(str => str.replace(/ *\n */g, `${EOL}`));
}

function replaceAllWhiteSpacesBySingleOne(strings: string[]): string[] {
  return strings.map(str => str.replace(/ +/g, ' '));
}

function maskProblematicCharacters(strings: string[]): string[] {
  if (strings.some(str => str.includes('*/'))) {
    logger.warn(
      `The documentation block ${strings.join(
        ''
      )} contained */ in the text will be masked as \\*\\/.`
    );
  }
  return strings.map(str => str.replace(/\*\//g, '\\*\\/'));
}
