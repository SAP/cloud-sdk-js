/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { PathLike, readFileSync } from 'fs';
import path from 'path';
import { SwaggerMetadata } from './parser-types';

export function parseSwaggerFromPath(swaggerPath: PathLike): SwaggerMetadata {
  const swaggerFile = readFileSync(path.resolve(swaggerPath.toString()), {
    encoding: 'utf-8'
  });
  return parseSwaggerFile(swaggerFile);
}

function parseSwaggerFile(swaggerFile: string): SwaggerMetadata {
  const swaggerMetaData = JSON.parse(swaggerFile);
  // Get definitions from schema, this is typically the case for openapi files
  swaggerMetaData.definitions = swaggerMetaData.definitions || swaggerMetaData?.components?.schemas;
  return swaggerMetaData;
}
