import voca from 'voca';
import { reservedJsKeywords } from './reserved-words';

const applyPrefixOnJSReservedWords =
  (prefix: string) =>
  (param: string): string =>
    reservedJsKeywords.includes(param)
      ? prefix + voca.capitalize(param)
      : param;

/**
 * @internal
 */
export const applyPrefixOnJsConflictParam = applyPrefixOnJSReservedWords('p');

/**
 * @internal
 */
export const applyPrefixOnJsConflictFunctionImports =
  applyPrefixOnJSReservedWords('f');
