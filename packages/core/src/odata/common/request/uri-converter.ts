/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EdmTypeShared } from '../edm-types';

/**
 * @experimental
 */
export interface UriConverter {
  convertToUriFormat(value: any, edmType: EdmTypeShared<'v2'>): string;
  convertToUriForEdmString(value: any): string;
}
