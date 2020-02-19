/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import voca from 'voca';

// FIXME: this function has a side effect and it is not obvious that the cache is updated
const applySuffixOnConflict = (separator: string) => (name: string, previouslyGeneratedNames: string[]): string => {
  let newName = name;
  if (previouslyGeneratedNames.includes(name) || reservedVdmKeywords.has(name) || reservedObjectPrototypeKeywords.has(name)) {
    newName = `${name}${separator}${nextSuffix(name, previouslyGeneratedNames)}`;
  }
  previouslyGeneratedNames.push(newName);
  return newName;
};

const applyPrefixOnJSReservedWords = (prefix: string) => (param: string): string => {
  return reservedJSKeywords.has(param) ? prefix + voca.capitalize(param) : param;
};

export const applySuffixOnConflictUnderscore = applySuffixOnConflict('_');
export const applySuffixOnConflictDash = applySuffixOnConflict('-');
export const applyPrefixOnJsConfictParam = applyPrefixOnJSReservedWords('p');
export const applyPrefixOnJsConfictFunctionImports = applyPrefixOnJSReservedWords('f');

function nextSuffix(name: string, previouslyGeneratedNames: string[]): number {
  const sortedList = sortByIntegerSuffix(previouslyGeneratedNames.filter(n => n.startsWith(name)));
  const lastElem = last(sortedList);
  const match = lastElem ? lastElem.match(/(\d+)$/) : null;

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
    } else if (suffix2 > suffix1) {
      return -1;
    }
    return 0;
  });
}

function last<T>(array: T[]): T {
  return array[array.length - 1];
}

const reservedObjectPrototypeKeywords: Set<string> = new Set<string>(Object.getOwnPropertyNames(Object.prototype));
const reservedVdmKeywords: Set<string> = new Set<string>(['builder', 'entityBuilder', 'requestBuilder']);

const reservedJSKeywords: Set<string> = new Set<string>([
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'implements',
  'in',
  'instanceof',
  'let',
  'new',
  'null',
  'protected',
  'public',
  'return',
  'static',
  'super',
  'switch',
  'symbol',
  'this',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield'
]);
