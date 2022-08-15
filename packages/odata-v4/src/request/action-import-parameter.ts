/**
 * Internal representation of function import parameters. It adds metadata to the value.
 * @typeParam ValueT - Type of the value.
 */
import { EdmTypeShared } from '@sap-cloud-sdk/odata-common';

export class ActionImportParameter<ValueT> {
  /**
   * Creates an instance of FunctionImportParameter.
   * @param originalName - The original name of the parameter in the OData service.
   * @param edmType - Original EDM type.
   * @param value - Value to be used as parameter.
   */
  constructor(
    public originalName: string,
    public edmType: EdmTypeShared<'any'>,
    public value: ValueT
  ) {}
}

/**
 * Internal representation of all parameters of a function import as a map.
 * @typeParam ParametersT - External representation of all parameters.
 */
export type ActionImportParameters<ParametersT> = {
  [K in keyof ParametersT]: ActionImportParameter<ParametersT[K]>;
};
