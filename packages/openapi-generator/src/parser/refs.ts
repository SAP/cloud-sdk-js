import { OpenAPIV3 } from 'openapi-types';
import { $Refs, resolve } from '@apidevtools/swagger-parser';
import { kebabCase, pascalCase } from '@sap-cloud-sdk/util';
import { isReferenceObject } from '../schema-util';
import { SchemaNaming } from '../openapi-types';
import { SchemaRefMapping } from './parsing-info';
import { ensureUniqueNames } from './unique-naming';

/**
 * Check whether the given object is a reference object and resolve if necessary.
 * This operates only on the current level and does not resolve the object recursively.
 * @param obj Object to resolve if necessary.
 * @param refs References to resolve by.
 * @returns A resolved object.
 */
export function resolveObject<T>(
  obj: T | OpenAPIV3.ReferenceObject,
  refs: $Refs
): T {
  return isReferenceObject(obj) ? refs.get(obj.$ref) : obj;
}

export async function createRefs(
  document: OpenAPIV3.Document
): Promise<OpenApiDocumentRefs> {
  const $refs = await resolve(document);
  return new OpenApiDocumentRefs($refs, parseSchemaRefMapping(document));
}

export class OpenApiDocumentRefs {
  constructor(
    private refs: $Refs,
    private schemaRefMapping: SchemaRefMapping
  ) {}

  /**
   * Check whether the given object is a reference object and resolve if necessary.
   * This operates only on the current level and does not resolve the object recursively.
   * @param obj Object to resolve if necessary.
   * @returns A resolved object.
   */
  resolveObject<T>(obj: T | OpenAPIV3.ReferenceObject): T {
    return isReferenceObject(obj) ? this.refs.get(obj.$ref) : obj;
  }

  /**
   * Parse the type name of a reference object.
   * @param obj Reference object or reference path to get the type name from.
   * @returns Parsed type name.
   */
  getSchemaNaming(obj: OpenAPIV3.ReferenceObject | string): SchemaNaming {
    const ref = isReferenceObject(obj) ? obj.$ref : obj;

    if (!ref.startsWith('#/components/schemas')) {
      throw new Error(
        `Could not get schema naming for reference path '${ref}'. Path does not reference a schema.`
      );
    }

    const schemaNaming = this.schemaRefMapping[ref];
    if (!schemaNaming) {
      throw new Error(
        `Could not find schema naming for reference path '${ref}'. Schema does not exist.`
      );
    }
    return schemaNaming;
  }
}

function parseSchemaRefMapping(document: OpenAPIV3.Document): SchemaRefMapping {
  const originalNames = Object.keys(document.components?.schemas || {});

  const schemaNames = ensureUniqueNames(originalNames, {
    formatName: pascalCase,
    getName: item => item,
    transformItem: (originalName, schemaName) => ({ originalName, schemaName })
  });

  const schemaNamesWithFileNames = ensureUniqueNames(schemaNames, {
    transformItem: (item, name) => ({
      originalName: item.originalName,
      schemaNaming: {
        schemaName: item.schemaName,
        fileName: name
      }
    }),
    getName: ({ originalName }) => originalName,
    formatName: kebabCase,
    reservedWords: ['index']
  });

  return schemaNamesWithFileNames.reduce(
    (mapping, { originalName, schemaNaming }) => ({
      ...mapping,
      [`#/components/schemas/${originalName}`]: schemaNaming
    }),
    {}
  );
}
