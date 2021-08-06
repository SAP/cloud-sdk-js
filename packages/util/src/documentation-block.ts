import { zip } from './array';
import { createLogger } from './logger';
import { unixEOL } from './string-formatter';

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
 * @param strings - Strings in the tagged template. In the example above that would be ['Docs with ', ' and more content;'].
 * @param args -  Arguments in the tagged template. In the example above that would be the resolved value for `arguments`;
 * @returns A string formatted as documentation block.
 */
export function documentationBlock(
  strings: TemplateStringsArray,
  ...args: string[]
): string {
  const firstLineTrimmed = removeLeadingEmptyLines(strings.raw[0]);
  const textIndentation = getIndentation(firstLineTrimmed);
  const argsWithIndentation = addIndentationToArgumnets(args, textIndentation);

  let content = zip(
    [firstLineTrimmed, ...strings.raw.slice(1)],
    argsWithIndentation
  ).join('');

  // If no text is given return just empty string.
  if (!content.match(/\w/)) {
    return '';
  }
  content = maskProblematicCharacters(content);
  let lines = content.split(unixEOL);
  lines = adjustIndentation(lines, textIndentation);
  content = lines.join(`${unixEOL} * `);

  const result = ['/**', ` * ${content}`, ' */'].join(unixEOL);
  return result;
}

/*
New lines at the beginning are mainly unintentional when you make documentationBlock`
myContent
`
 */
function removeLeadingEmptyLines(firstLine: string): string {
  const lines = firstLine.split(unixEOL);
  const indexFirstNonEmpty = lines.findIndex(str => str.match(/\w/)) || 0;
  return lines.splice(indexFirstNonEmpty).join(unixEOL);
}

/*
 The arguments do not contain any indentation so this is added via this method.
 */
function addIndentationToArgumnets(
  args: string[],
  textIndentation: number
): string[] {
  const argsWithIndentation = args.map(arg =>
    arg.replace(/\n/g, unixEOL + ' '.repeat(textIndentation))
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
 Searches for the first line containing text and returns the number of white spaces in that line.
 */
function getIndentation(firstLine: string): number {
  const removeStarting = firstLine?.replace(/^\n*/g, '');
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
