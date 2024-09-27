/**
 * Internal representation of function import parameters. It adds metadata to the value.
 * @typeParam ValueT - Type of the value.
 */
import type { EdmTypeShared } from '@sap-cloud-sdk/odata-common';

/**
 * @deprecated Since 3.3.0. Use {@link OperationParameter} instead.
 */
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
 * @deprecated Since 3.3.0. Use {@link OperationParameter} instead.
 */
export type ActionImportParameters<ParametersT> = {
  [K in keyof ParametersT]: ActionImportParameter<ParametersT[K]>;
};
