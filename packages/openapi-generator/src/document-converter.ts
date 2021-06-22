import { promises } from 'fs';
import { parse } from 'path';
import { OpenAPIV3 } from 'openapi-types';
import { convert } from 'swagger2openapi';
import { load } from 'js-yaml';
import { ErrorWithCause } from '@sap-cloud-sdk/util';
const { readFile } = promises;

/**
 * Convert an OpenAPI document to ensure smooth parsing and generation thereafter.
 * Documents are transformed to JSON and compliant with OpenAPI version 3.
 * @param filePath File content of the original spec.
 */
export async function convertOpenApiSpec(
  filePath: string
): Promise<OpenAPIV3.Document> {
  try {
    const file = await parseFileAsJson(filePath);
    return convertDocToOpenApiV3(file);
  } catch (err) {
    throw new ErrorWithCause(
      'Could not convert document to the format needed for parsing and generation.',
      err
    );
  }
}

/**
 * Parse a JSON or YAML file and return it as JSON.
 * @param filePath Path to the file.
 * @returns JSON representation of the given file.
 */
export async function parseFileAsJson(
  filePath: string
): Promise<Record<string, any>> {
  const fileContent = await readFile(filePath, 'utf8');
  const extension = parse(filePath).ext.toLowerCase();
  if (extension === '.json') {
    return JSON.parse(fileContent);
  }
  if (['.yaml', '.yml'].includes(extension)) {
    return load(fileContent) as Record<string, any>;
  }

  throw new Error(
    `Could not parse OpenAPI specification at ${filePath}. Only JSON and YAML files are allowed.`
  );
}

/**
 * Convert Swagger documents to OpenAPI documents.
 * If an OpenAPI document is passed it is not modified.
 * @param openApiDocument OpenAPI version 2 (Swagger) or 3 document to be converted to version 3.
 * @returns A promise of an OpenAPI version 3 document.
 */
export async function convertDocToOpenApiV3(
  openApiDocument: Record<string, any>
): Promise<OpenAPIV3.Document> {
  // This is a hidden cast to OpenAPIV3.Document
  try {
    return (await convert(openApiDocument, {})).openapi;
  } catch (err) {
    throw new ErrorWithCause(
      `Could not convert OpenAPI specification to OpenAPI version 3. ${err.message}`,
      err
    );
  }
}
