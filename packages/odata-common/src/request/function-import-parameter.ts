import { EdmTypeShared } from '../edm-types';

/**
 * Internal representation of function import parameters. It adds metadata to the value.
 * @typeparam ValueT - Type of the value
 */
export class FunctionImportParameter<ValueT> {
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
 * Internal representation of all parameters of a function import as a map
 * @typeparam ParametersT - External representation of all parameters
 * @internal
 */
export type FunctionImportParameters<ParametersT> = {
  [K in keyof ParametersT]: FunctionImportParameter<ParametersT[K]>;
};
