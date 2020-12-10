import { promises } from 'fs';
import { parse } from 'path';
import { OpenAPIV3 } from 'openapi-types';
import { convert } from 'swagger2openapi';
import { safeLoad } from 'js-yaml';
import { errorWithCause } from '@sap-cloud-sdk/util';
const { readFile } = promises;

/**
 * Convert an OpenApi document to ensure smooth parsing and generation thereafter.
 * Documents are expected to be formatted as JSON, OpenApi version 3 and only have one "default" tag.
 * @param filePath File content of the original spec.
 * @param ouputFilePath Path to write the altered spec to.
 */
export async function convertOpenApiSpec(
  filePath: string
): Promise<OpenAPIV3.Document> {
  let file;
  try {
    file = await parseFileAsJson(filePath);
  } catch (err) {
    throw errorWithCause('Could not parse OpenApi specification.', err);
  }
  const openApiDocument = await convertDocToOpenApi3(file);
  return convertDocToGlobalTag(openApiDocument);
}

/**
 * Parse a JSON or YAML file and return it as JSON.
 * @param filePath Path to the file
 * @returns JSON representation of the given file.
 */
export async function parseFileAsJson(
  filePath: string
): Promise<Record<string, any>> {
  const fileContent = await readFile(filePath, 'utf8');
  return parse(filePath).ext === '.json'
    ? JSON.parse(fileContent)
    : safeLoad(fileContent);
}

/**
 * Convert Swagger documents to OpenApi documents.
 * If an OpenApi document is passed it is not modified.
 * @param openApiDocument OpenApi version 2 (Swagger) or 3 document to be converted to version 3.
 * @returns A promise of an OpenApi version 3 document.
 */
export async function convertDocToOpenApi3(
  openApiDocument: Record<string, any>
): Promise<OpenAPIV3.Document> {
  // This is a hidden cast to OpenAPIV3.Document
  return (await convert(openApiDocument, {})).openapi;
}

/**
 * Workaround for OpenApi generation to build one and only one API for all tags.
 * Modify spec to contain only one 'default' tag.
 * @param openApiDocument OpenApi JSON document.
 * @returns The modified document.
 */
export function convertDocToGlobalTag(
  openApiDocument: OpenAPIV3.Document
): OpenAPIV3.Document {
  const tag = 'default';
  openApiDocument.tags = [{ name: tag }];

  Object.values(openApiDocument.paths).forEach(
    (pathDefinition: Record<string, any>) => {
      Object.values(pathDefinition).forEach(methodDefinition => {
        methodDefinition.tags = [tag];
      });
    }
  );

  return openApiDocument;
}
