/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  ActionImportParameters,
  ODataActionImportRequestConfig
} from '../request';
import { ActionFunctionImportRequestBuilderBase } from '../../common/request-builder/action-function-import-request-builder-base';

/**
 * Create OData request to execute a action import.
 * @typeparam ParametersT - Type of the function import parameters
 * @typeparam ReturnT - Type of the function import return value
 */
export class ActionImportRequestBuilder<
  ParametersT,
  ReturnT
> extends ActionFunctionImportRequestBuilderBase<ParametersT, ReturnT> {
  /**
   * Creates an instance of ActionImportRequestBuilder.
   * @param defaultServicePath - Default path for the service the action belongs to
   * @param actionImportName - The name of the function import.
   * @param responseTransformer - Transformation function for the response
   * @param payload - Payload to be set in the action
   */
  constructor(
    defaultServicePath: string,
    actionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    payload: ActionImportParameters<ParametersT>
  ) {
    super(
      responseTransformer,
      new ODataActionImportRequestConfig(
        defaultServicePath,
        actionImportName,
        payload
      )
    );
  }
}
