import { PathLike, readFileSync } from 'fs';
import path from 'path';
import { SwaggerMetadata, SwaggerPath } from './swagger-types';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function readSwaggerFile(swaggerPath: PathLike): SwaggerMetadata {
  const swaggerFile = readFileSync(path.resolve(swaggerPath.toString()), {
    encoding: 'utf-8'
  });
  return parseSwaggerFile(swaggerFile);
}

function parseSwaggerFile(swaggerFile: string): SwaggerMetadata {
  const swaggerMetaData = JSON.parse(swaggerFile);
  // Get definitions from schema in case there are no definitions present, this is typically the case for openapi files (version >= 3.0.0)
  swaggerMetaData.definitions =
    swaggerMetaData.definitions || swaggerMetaData?.components?.schemas;
  return swaggerMetaData;
}
/**
 * @internal
 */
export function swaggerDefinitionForFunctionImport(
  originalName: string,
  httpMethod: string,
  swaggerMetadata: SwaggerMetadata | undefined
): SwaggerPath | undefined {
  if (swaggerMetadata) {
    const paths = swaggerMetadata.paths;
    const entryPath = Object.keys(paths).find(p => p === `/${originalName}`);
    if (entryPath) {
      const key = Object.keys(paths[entryPath]).find(
        k => k.toLowerCase() === httpMethod.toLowerCase()
      );
      if (key) {
        return paths[entryPath][key];
      }
    }
  }
}
