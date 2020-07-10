/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EdmxMetadataBaseExtended, SwaggerMetadata } from './common';
/* eslint-disable valid-jsdoc */

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface ParsedServiceMetadata {
  edmx: EdmxMetadataBaseExtended;
  swagger?: SwaggerMetadata;
}
