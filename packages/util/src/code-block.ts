import { unixEOL } from './string-formatter';
import { zip } from './array';
import { trim, trimRight } from './string';
/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Transform strings and arguments to a string formatted as a code block, keeping the indentation of sub code blocks.
 * Use in tagged templates, e. g.:
 * ```
 * codeBlock`Code with ${arguments} and more code;`
 * ```
 * @param strings - Strings in the tagged template. In the example above that would be ['Code with ', ' and more code;'].
 * @param args -  Arguments in the tagged template. In the example above that would be the resolved value for `arguments`;
 * @returns A string formatted as code block.
 */
export function codeBlock(
  strings: TemplateStringsArray,
  ...args: any[]
): string {
  const pre = strings.slice(0, -1).map(string => {
    const trimmed = trimRight(string);
    return trimmed.length === string.length ? string : trimmed + unixEOL;
  });
  pre.push(strings[strings.length - 1]);

  const indents = strings.slice(0, -1).map(s => {
    const indentation = s.split(unixEOL).pop()!;
    return !indentation.trim() ? indentation : '';
  });
  const post = args.map((arg, i) =>
    ('' + arg)
      .split(unixEOL)
      .map(subArg => indents[i] + subArg)
      .join(unixEOL)
  );

  const zipped = zip(pre, post);
  return trim(zipped.join(''));
}
