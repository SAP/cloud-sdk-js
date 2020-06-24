/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EdmxMetadataBaseExtended, SwaggerMetadata } from './common';

export interface ParsedServiceMetadata {
  edmx: EdmxMetadataBaseExtended;
  swagger?: SwaggerMetadata;
}
