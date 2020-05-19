/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EdmTypeShared } from '../edm-types';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export interface UriConverter {
  convertToUriFormat(value: any, edmType: EdmTypeShared<'v2'>): string;
  convertToUriForEdmString(value: any): string;
}
