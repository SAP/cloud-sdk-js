import { promises } from 'fs';
import { parse } from 'path';
import { convert } from 'swagger2openapi';
import { load } from 'js-yaml';
import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import type { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
const { readFile } = promises;
const logger = createLogger('openapi-generator');

/**
 * Load an OpenAPI specification from a file path, parse it from JSON or YAML,
 * and ensure it is an OpenAPI 3.x document (converts Swagger 2.0 to OAS 3.0;
 * passes OAS 3.x through unchanged).
 * @param filePath - Path to the JSON or YAML spec file.
 * @internal
 */
export async function loadOpenApiSpec(
  filePath: string
): Promise<OpenAPIV3.Document | OpenAPIV3_1.Document> {
  try {
    const file = await parseFileAsJson(filePath);
    return convertToOpenApiV3xDocument(file);
  } catch (err) {
    throw new ErrorWithCause(
      'Could not convert document to the format needed for parsing and generation.',
      err as Error
    );
  }
}

/**
 * Parse a JSON or YAML file and return it as JSON.
 * @param filePath - Path to the file.
 * @returns JSON representation of the given file.
 * @internal
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
 * Ensure a raw parsed document is an OpenAPI 3.x document.
 * - Swagger 2.0 (`swagger: "2.0"`) is converted to OAS 3.0 via `swagger2openapi`.
 * - OAS 3.x documents are returned as-is; 3.1 features are handled natively by
 *   the downstream parser.
 * @param document - Raw parsed document object.
 * @returns A promise of an OpenAPI 3.x document.
 * @internal
 */
export async function convertToOpenApiV3xDocument(
  openApiDocument: Record<string, any>
): Promise<OpenAPIV3.Document | OpenAPIV3_1.Document> {
  // Swagger 2.0 uses the 'swagger' field; OAS 3.x uses 'openapi'.
  const version =
    typeof openApiDocument.openapi === 'string'
      ? openApiDocument.openapi
      : typeof openApiDocument.swagger === 'string'
        ? openApiDocument.swagger
        : 'unknown';

  logger.info(`Detected specification version ${version}.`);

  if (version.startsWith('3.')) {
    return openApiDocument as OpenAPIV3.Document | OpenAPIV3_1.Document;
  }

  // Swagger 2.0 requires an explicit conversion step to produce an OAS 3.0 document.
  try {
    return (await convert(openApiDocument as OpenAPIV2.Document, {}))
      .openapi as OpenAPIV3.Document;
  } catch (err) {
    throw new ErrorWithCause(
      `Could not convert Swagger document to OpenAPI 3. ${(err as Error).message}`,
      err as Error
    );
  }
}
