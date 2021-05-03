import { last } from '@sap-cloud-sdk/util';
import voca from 'voca';
import { defaultReservedWords, reservedJsKeywords } from './reserved-words';

// FIXME: this function has a side effect and it is not obvious that the cache is updated
const applySuffixOnConflict = (separator: string) => (
  name: string,
  previouslyGeneratedNames: string[]
): string => {
  let newName = name;
  if ([...previouslyGeneratedNames, ...defaultReservedWords].includes(name)) {
    newName = `${name}${separator}${nextSuffix(
      name,
      previouslyGeneratedNames
    )}`;
  }
  previouslyGeneratedNames.push(newName);
  return newName;
};

const applyPrefixOnJSReservedWords = (prefix: string) => (
  param: string
): string =>
  reservedJsKeywords.includes(param) ? prefix + voca.capitalize(param) : param;

/**
 * @deprecated Since v1.22.0. This method changes the 'previouslyGeneratedNames' passed to it. Use [[UniqueNameGenerator]] instead.
 */
export const applySuffixOnConflictUnderscore = applySuffixOnConflict('_');

/**
 * @deprecated  Since v1.22.0. This method changes the 'previouslyGeneratedNames' passed to it. Use [[UniqueNameGenerator]] instead.
 */
export const applySuffixOnConflictDash = applySuffixOnConflict('-');

export const applyPrefixOnJsConflictParam = applyPrefixOnJSReservedWords('p');
/**
 * @deprecated  Since v1.25.0. Use [[applyPrefixOnJsConflictParam]] instead.
 */
export const applyPrefixOnJsConfictParam = applyPrefixOnJsConflictParam;
export const applyPrefixOnJsConflictFunctionImports = applyPrefixOnJSReservedWords(
  'f'
);
/**
 * @deprecated  Since v1.25.0. Use [[applyPrefixOnJsConflictFunctionImports]] instead.
 */
export const applyPrefixOnJsConfictFunctionImports = applyPrefixOnJsConflictFunctionImports;

function nextSuffix(name: string, previouslyGeneratedNames: string[]): number {
  const sortedList = sortByIntegerSuffix(
    previouslyGeneratedNames.filter(n => n.startsWith(name))
  );
  const lastElem = last(sortedList);
  const match = lastElem ? lastElem.match(/(\d+)$/) : null;
  const test1 = lastElem ? lastElem.match(/(?<!\d)(\d+)$/) : null;
  const test2 = lastElem ? lastElem.match(/(\d+)$/) : null;

  return match ? parseInt(match[1], 10) + 1 : 1;
}

function sortByIntegerSuffix(array: string[]): string[] {
  return array.slice().sort((e1, e2) => {
    const matched1 = e1.match(/(\d+)$/);
    const matched2 = e2.match(/(\d+)$/);
    if (matched1 && !matched2) {
      return 1;
    }
    if (!matched1 && matched2) {
      return -1;
    }
    if (!matched1 && !matched2) {
      return 0;
    }

    const suffix1 = matched1 ? parseInt(matched1[1]) : 0;
    const suffix2 = matched2 ? parseInt(matched2[1]) : 0;

    if (suffix1 > suffix2) {
      return 1;
    }
    if (suffix2 > suffix1) {
      return -1;
    }
    return 0;
  });
}
