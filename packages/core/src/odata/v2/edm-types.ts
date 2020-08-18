/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EdmTypeCommon, ExclusiveEdmTypeV2 } from '../common';

/**
 * Allowed Edm types for OData v2.
 */
export type EdmTypeV2 = EdmTypeCommon | ExclusiveEdmTypeV2;

export { EdmTypeV2 as EdmType };
