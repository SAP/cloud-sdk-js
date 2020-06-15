/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  EdmxMetadataBaseExtended,
  SwaggerMetadata
} from './parser-types-common';

export interface ParsedServiceMetadata {
  edmx: EdmxMetadataBaseExtended;
  swagger?: SwaggerMetadata;
}
