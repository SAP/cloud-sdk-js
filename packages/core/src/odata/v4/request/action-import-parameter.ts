/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EdmTypeShared } from '../../common/edm-types';

/**
 * Internal representation of action import parameters. It adds metadata to the value.
 * @typeparam ValueT - Type of the value
 */
export class ActionImportParameter<ValueT> {
  /**
   * Creates an instance of ActionImportParameter.
   * @param originalName - The original name of the parameter in the OData service
   * @param edmType - Original edm Type
   * @param value - Value to be used as parameter
   */
  constructor(
    public originalName: string,
    public edmType: EdmTypeShared<'any'>,
    public value: ValueT
  ) {}
}

/**
 * Internal representation of all parameters of a action import as a map
 * @typeparam ParametersT - External represenation of all parameters
 */
export type ActionImportParameters<ParametersT> = {
  [K in keyof ParametersT]: ActionImportParameter<ParametersT[K]>;
};
