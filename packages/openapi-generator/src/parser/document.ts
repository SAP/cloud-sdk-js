import { basename } from 'path';
import SwaggerParser, { parse, resolve } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import {
  pascalCase,
  removeFileExtension,
  kebabCase
} from '@sap-cloud-sdk/util';
import { OpenApiDocument, OpenApiPersistedSchema } from '../openapi-types';
import { ServiceMapping } from '../service-mapping';
import { parseSchema } from './schema';
import { parseApis } from './api';
import { ensureUniqueNames } from './unique-naming';
import { SchemaInfo, SchemaRefMapping } from './parsing-info';
import { resolveObject } from './refs';

/**
 * Parse the original OpenAPI document and return an SDK compliant document.
 * @param fileContent The OpenAPI document representation.
 * @param serviceName The name of the service.
 * @param filePath The path of the OpenAPI document.
 * @param serviceMapping A file representing a custom mapping of directory and npm package names.
 * @returns The parsed document
 */
export async function parseOpenApiDocument(
  fileContent: OpenAPIV3.Document,
  serviceName: string,
  filePath: string,
  serviceMapping: ServiceMapping
): Promise<OpenApiDocument> {
  const clonedContent = JSON.parse(JSON.stringify(fileContent));
  const document = (await parse(clonedContent)) as OpenAPIV3.Document;
  const refs = await resolve(document);
  const originalFileName = removeFileExtension(basename(filePath));
  const schemaInfo = parseSchemaInfo(document);
  const schemaRefMapping = parseSchemaRefMapping(schemaInfo);

  return {
    apis: parseApis(document, refs, schemaRefMapping),
    serviceName: pascalCase(serviceName),
    npmPackageName: serviceMapping[originalFileName]
      ? serviceMapping[originalFileName].npmPackageName
      : originalFileName,
    directoryName: serviceMapping[originalFileName]
      ? serviceMapping[originalFileName].directoryName
      : originalFileName,
    originalFileName,
    schemas: parseSchemas(schemaInfo, schemaRefMapping, refs)
  };
}

function parseSchemaInfo(document: OpenAPIV3.Document): SchemaInfo[] {
  const schemaInfo = Object.entries(document.components?.schemas || {}).map(
    ([name, schema]) => ({
      name,
      refPath: `#/components/schemas/${name}`,
      schema
    })
  );

  return ensureUniqueNames(schemaInfo, {
    formatName: pascalCase
  });
}

export function parseSchemas(
  schemaInfo: SchemaInfo[],
  schemaRefMapping: SchemaRefMapping,
  refs: SwaggerParser.$Refs
): OpenApiPersistedSchema[] {
  return schemaInfo.map(({ schema, refPath }) => ({
    ...schemaRefMapping[refPath],
    schema: parseSchema(schema, schemaRefMapping),
    description: resolveObject(schema, refs).description
  }));
}

function parseSchemaRefMapping(schemaInfo: SchemaInfo[]): SchemaRefMapping {
  const schemaInfoWithFileNames = ensureUniqueNames(schemaInfo, {
    transformItem: (item, name) => ({
      ...item,
      schemaNaming: {
        schemaName: item.name,
        fileName: name
      }
    }),
    formatName: kebabCase,
    reservedWords: ['index']
  });

  return schemaInfoWithFileNames.reduce(
    (mapping, { refPath, schemaNaming }) => ({
      ...mapping,
      [refPath]: schemaNaming
    }),
    {}
  );
}
