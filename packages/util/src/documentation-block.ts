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
  const textIndentation = getIndentation(strings.raw);
  const argsWithIndentation = addIndentationToArgumnets(args, textIndentation);

  let content = zip(strings.raw as string[], argsWithIndentation).join('');
  if (!content) {
    return '';
  }
  content = maskProblematicCharacters(content);
  const lines = content.split(EOL);
  const withIndentation = adjustIndentation(lines, textIndentation);
  const withStars = withIndentation.join(`${EOL} * `);

  const result = ['/**', ` * ${withStars}`, ' */'].join(EOL);
  return result;
}

/*
 The arguments do not contain any indentation so this is added here.
 */
function addIndentationToArgumnets(
  args: string[],
  textIndentation: number
): string[] {
  const argsWithIndentation = args.map(arg =>
    arg.replace(/\n/g, EOL + ' '.repeat(textIndentation))
  );
  return argsWithIndentation;
}

/*
 Takes the first text line as reference and does indentation with respect to this line.
 */
function adjustIndentation(lines: string[], textIndentation: number): string[] {
  return lines.map(str => str.slice(textIndentation));
}

/*
Searches for the first line containing text and returns the number of white spaces
 */
function getIndentation(strings: readonly string[]): number {
  const firstLineWithText = strings[0];
  const removeStarting = firstLineWithText?.replace(/^\n*/g, '');
  const countEmptySpaces = removeStarting?.search(/\S/);
  return countEmptySpaces > 0 ? countEmptySpaces : 0;
}

function maskProblematicCharacters(str: string): string {
  if (str.includes('*/')) {
    logger.warn(
      `The documentation block ${str}'
      )} contained */ in the text will be masked as \\*\\/.`
    );
  }
  return str.replace(/\*\//g, '\\*\\/');
}
