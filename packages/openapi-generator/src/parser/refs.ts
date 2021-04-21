import { OpenAPIV3 } from 'openapi-types';
import { $Refs, resolve } from '@apidevtools/swagger-parser';
import { pascalCase, kebabCase } from '@sap-cloud-sdk/util';
import { isReferenceObject } from '../schema-util';
import { SchemaNaming } from '../openapi-types';
import { SchemaRefMapping } from './parsing-info';
import { ensureUniqueNames } from './unique-naming';

/**
 * Convenience function to invoke the creation of the OpenApiDocumentRefs builder.
 * @param document The original OpenAPI document.
 * @returns A promise to the reference representation.
 */
export async function createRefs(
  document: OpenAPIV3.Document
): Promise<OpenApiDocumentRefs> {
  return OpenApiDocumentRefs.createRefs(document);
}

/**
 * Representation of cross references within a document.
 * Useful when resolving references or getting schema names for referenced schemas.
 */
export class OpenApiDocumentRefs {
  /**
   * Create a representation of references within a document.
   * @param document The original OpenAPI document.
   * @returns A promise to the reference representation.
   */
  static async createRefs(
    document: OpenAPIV3.Document
  ): Promise<OpenApiDocumentRefs> {
    return new OpenApiDocumentRefs(
      await resolve(document),
      OpenApiDocumentRefs.parseSchemaRefMapping(document)
    );
  }

  /**
   * Parse mapping between schema references and their unique names.
   * @param document The original OpenAPI document.
   * @returns A mapping from schema references to schema naming objects.
   */
  private static parseSchemaRefMapping(
    document: OpenAPIV3.Document
  ): SchemaRefMapping {
    const originalNames = Object.keys(document.components?.schemas || {});

    const schemaNames = ensureUniqueNames(originalNames, {
      formatName: pascalCase,
      getName: item => item,
      transformItem: (originalName, schemaName) => ({
        originalName,
        schemaName
      })
    });

    const schemaNamesWithFileNames = ensureUniqueNames(schemaNames, {
      transformItem: (item, name) => ({
        originalName: item.originalName,
        schemaNaming: {
          schemaName: item.schemaName,
          fileName: name
        }
      }),
      getName: ({ schemaName }) => schemaName,
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

  /**
   * Creates a new instance of `OpenApiDocumentRefs`.
   * @param refs Object representing the OpenAPI cross references.
   * @param schemaRefMapping Mapping between schema references and schema naming.
   */
  private constructor(
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
