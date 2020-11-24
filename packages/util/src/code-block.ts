import { zip } from './array';
import { trim, trimRight } from './string';

export const codeBlock = (strings, ...args) => {
  const pre = strings.slice(0, -1).map(string => {
    const trimmed = trimRight(string);
    return trimmed.length === string.length ? string : trimmed + '\n';
  });
  pre.push(strings[strings.length - 1]);

  const indents = strings.slice(0, -1).map(string => {
    const indentation = string.split('\n').pop();
    return !indentation.trim() ? indentation : '';
  });
  const post = args.map((arg, i) =>
    arg
      .toString()
      .split('\n')
      .map(subArg => indents[i] + subArg)
      .join('\n')
  );

  const zipped = zip(pre, post);
  return trim(zipped.join(''));
};
