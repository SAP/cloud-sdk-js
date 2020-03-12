/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EdmType } from '../../edm-types';

/**
 * Internal representation of function import parameters. It adds metadata to the value.
 * @typeparam ValueT - Type of the value
 */
export class FunctionImportParameter<ValueT> {
  /**
   * Creates an instance of FunctionImportParameter.
   * @param originalName - The original name of the parameter in the OData service
   * @param edmType - Original edm Type
   * @param value - Value to be used as parameter
   */
  constructor(public originalName: string, public edmType: EdmType, public value: ValueT) {}
}

/**
 * Internal representation of all parameters of a function import as a map
 * @typeparam ParametersT - External represenation of all parameters
 */
export type FunctionImportParameters<ParametersT> = { [K in keyof ParametersT]: FunctionImportParameter<ParametersT[K]> };
