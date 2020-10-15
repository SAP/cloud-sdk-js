export const indent = (string, indentation) =>
  string
    .split('\n')
    .map(subString => `${indentation}${subString}`)
    .join('\n');

export const trimLeft = string => {
  let subStrings = string.split('\n');
  if (!subStrings[0].trim()) {
    subStrings = subStrings.slice(1);
  }
  return subStrings.join('\n');
};

export const trimRight = string => {
  let subStrings = string.split('\n');
  if (!subStrings[subStrings.length - 1].trim()) {
    subStrings = subStrings.slice(0, -1);
  }
  return subStrings.join('\n');
};

export const trim = string => trimRight(trimLeft(string));

export const zip = (arr1, arr2) => {
  if (arr1.length !== arr2.length + 1) {
    throw Error();
  }
  return arr1
    .map((item, i) => [item, arr2[i]])
    .reduce((zipped, items) => [...zipped, ...items], [])
    .slice(0, -1);
};

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
