/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EdmTypeCommon, ExclusiveEdmTypeV4 } from '../common';

/**
 * Allowed Edm types for OData v4.
 */
export type EdmTypeV4 = EdmTypeCommon | ExclusiveEdmTypeV4;
