import { EdmxDocumented, SwaggerDescribed } from './parser-types';
import { endWithDot, ensureString } from '../../generator-utils';

export function longDescription(
  documented: EdmxDocumented,
  described?: SwaggerDescribed
): string {
  let docs = '';
  if (documented.Documentation) {
    const summmary = ensureString(documented.Documentation.Summary);
    const longDesc = ensureString(documented.Documentation.LongDescription);
    docs = `${summmary}\n${longDesc}`.trim();
  }
  if (!docs && described) {
    docs = ensureString(described.description);
  }
  return endWithDot(docs.trim());
}

export function parseType(type: string): string {
  return type.startsWith('Edm')
    ? type
    : type.split('.')[type.split('.').length - 1];
}
