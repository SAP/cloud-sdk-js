import { OpenAPIV3 } from 'openapi-types';
import SwaggerParser, {
  $Refs,
  parse,
  resolve
} from '@apidevtools/swagger-parser';

/**
 * These to methods are a workaround until the swagger-parser is updated: https://github.com/APIDevTools/swagger-parser/issues/186
 * In the parser the `this` context is used for exported methods of a module.
 * TypeScript has tightened the rules for this in version 4.4.: https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#typescript-44.
 * In order to update the TypeScript version we introduce these methods to set the `this` pointer explicitly.
 * Once the swagger parser updates we can remove this.
 */

/**
 * Resolves a document.
 * @param document - document to be resolved
 * @returns resolve document
 * @internal
 */
export async function resolveBound(
  document: OpenAPIV3.Document
): Promise<$Refs> {
  return resolve.bind(SwaggerParser)(document);
}

/**
 * Parses a document
 * @param content - content to be parsed
 * @returns resolve document
 * @internal
 */
export async function parseBound(content: any): Promise<any> {
  return parse.bind(SwaggerParser)(content);
}
