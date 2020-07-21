/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

/* eslint-disable valid-jsdoc */

import { PathLike, readFileSync } from 'fs';
import path from 'path';
import { SwaggerMetadata } from './common';
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function parseSwaggerFromPath(swaggerPath: PathLike): SwaggerMetadata {
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
