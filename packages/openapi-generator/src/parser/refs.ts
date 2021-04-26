import { OpenAPIV3 } from 'openapi-types';
import { $Refs, resolve } from '@apidevtools/swagger-parser';
import { pascalCase, kebabCase } from '@sap-cloud-sdk/util';
import { isReferenceObject } from '../schema-util';
import { SchemaNaming } from '../openapi-types';
import { SchemaRefMapping } from './parsing-info';
import { ensureUniqueNames } from './unique-naming';
import { ParserOptions } from './options';

/**
 * Convenience function to invoke the creation of the OpenApiDocumentRefs builder.
 * @param document The original OpenAPI document.
 * @param options Parser options.
 * @returns A promise to the reference representation.
 */
export async function createRefs(
  document: OpenAPIV3.Document,
  options: ParserOptions
): Promise<OpenApiDocumentRefs> {
  return OpenApiDocumentRefs.createRefs(document, options);
}

/**
 * Representation of cross references within a document.
 * Useful when resolving references or getting schema names for referenced schemas.
 */
export class OpenApiDocumentRefs {
  /**
   * Create a representation of references within a document.
   * @param document The original OpenAPI document.
   * @param options Parser options.
   * @returns A promise to the reference representation.
   */
  static async createRefs(
    document: OpenAPIV3.Document,
    options: ParserOptions
  ): Promise<OpenApiDocumentRefs> {
    return new OpenApiDocumentRefs(
      await resolve(document),
      OpenApiDocumentRefs.parseSchemaRefMapping(document, options)
    );
  }

  /**
   *  This method takes a list of names and adjusts them so that they are allowed as schema names.
   *  For example in TypeScript a type definition must not start with integer.
   *
   * @param names List of names to be adjusted.
   * @param options Parser options.
   * @returns A list of strings which are possible for schema names.
   */
  private static getValidSchemaNames(
    names: string[],
    options: ParserOptions
  ): string[] {
    return names.map(name => {
      if (!name.match(/^\d+/)) {
        return name;
      }

      if (options.strictNaming) {
        throw new Error(
          "Your OpenApi definition contains a schema starting with an integer which is not possible in TypeScript. The SDK generator can adjust such names once you disable the 'strictNaming' or you adjust the schema."
        );
      }
      return `schema${name}`;
    });
  }

  /**
   * Parse mapping between schema references and their unique names.
   * @param document The original OpenAPI document.
   * @param options Parser options.
   * @returns A mapping from schema references to schema naming objects.
   */
  private static parseSchemaRefMapping(
    document: OpenAPIV3.Document,
    options: ParserOptions
  ): SchemaRefMapping {
    const originalNames = Object.keys(document.components?.schemas || {});
    const validSchemaNames = OpenApiDocumentRefs.getValidSchemaNames(
      originalNames,
      options
    );

    const schemaNames = ensureUniqueNames(validSchemaNames, options, {
      format: pascalCase,
      separator: OpenApiDocumentRefs.getSeperator(validSchemaNames)
    });
    const fileNames = ensureUniqueNames(schemaNames, options, {
      format: kebabCase,
      reservedWords: ['index']
    });

    return originalNames.reduce(
      (mapping, originalName, i) => ({
        ...mapping,
        [`#/components/schemas/${originalName}`]: {
          schemaName: schemaNames[i],
          fileName: fileNames[i]
        }
      }),
      {}
    );
  }

  /**
   * If names end with integers it is better to use a separator to easy the mapping between the original and new object.
   * @param names List of names investigated to find the best separator.
   * @returns Either '' or '_' depending on the names.
   */
  private static getSeperator(names: string[]) {
    return names.find(name => name.match(/\d+$/)) ? '_' : '';
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
