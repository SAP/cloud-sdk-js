/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  EdmxMetadataBaseExtended,
  SwaggerMetadata
} from './parser-types-common';
import { EdmxMetadata as EdmxMetadataV2 } from './parser-types-v2';
import { EdmxMetadata as EdmxMetadataV4 } from './parser-types-v4';

export interface ParsedServiceMetadata<
  T extends 'v2' | 'v4' | unknown = unknown
> {
  edmx: T extends 'v2'
    ? EdmxMetadataV2
    : T extends 'v4'
    ? EdmxMetadataV4
    : EdmxMetadataBaseExtended;
  swagger?: SwaggerMetadata;
}
