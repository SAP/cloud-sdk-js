import type { EdmTypeShared } from '../edm-types';

/**
 * Internal representation of operation parameters. It adds metadata to the value.
 * @typeParam ValueT - Type of the value.
 */
export class OperationParameter<ValueT> {
  /**
   * Creates an instance of OperationParameter.
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
 * Internal representation of all parameters of an operation as a map.
 * @typeParam ParametersT - External representation of all parameters
 */
export type OperationParameters<ParametersT> = {
  [K in keyof ParametersT]: OperationParameter<ParametersT[K]>;
};
