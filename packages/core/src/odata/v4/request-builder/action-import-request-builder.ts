/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { DestinationOptions } from '../../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../../scp-cf/destination-service-types';
import { MethodRequestBuilderBase } from '../../common/request-builder/request-builder-base';
import { oDataUri } from '../uri-conversion';
import { ODataActionImportRequestConfig } from '../request/odata-action-import-request-config';
import { ActionImportParameters } from '../request/action-import-parameter';

/**
 * Create OData request to execute a action import.
 * @typeparam ParametersT - Type of the function import parameters
 * @typeparam ReturnT - Type of the function import return value
 */
export class ActionImportRequestBuilder<
  ParametersT,
  ReturnT
> extends MethodRequestBuilderBase<
  ODataActionImportRequestConfig<ParametersT>
> {
  /**
   * Creates an instance of ActionImportRequestBuilder.
   * @param defaultServicePath - Default path for the service the action belongs to
   * @param actionImportName - The name of the function import.
   * @param responseTransformer - Transformation function for the response
   * @param parameters - Parameters to be set in the action
   */
  constructor(
    defaultServicePath: string,
    actionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: ActionImportParameters<ParametersT>
  ) {
    super(
      new ODataActionImportRequestConfig(
        defaultServicePath,
        actionImportName,
        parameters,
        oDataUri
      )
    );
  }

  /**
   * Execute request
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the requested return type
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<ReturnT> {
    return this.build(destination, options)
      .then(request => request.execute())
      .then(({ data }) => this.responseTransformer(data));
  }
}
