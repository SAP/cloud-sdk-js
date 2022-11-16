import { DestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import { v4 as uuid } from 'uuid';
import { ODataRequestConfig } from '../request/odata-request-config';
import { BatchReference, WithBatchReference } from '../request';
import { MethodRequestBuilder } from './request-builder-base';

/**
 * Create OData request to execute a action or function import.
 * @typeParam ReturnT - Type of the function import return value.
 */
export abstract class ActionFunctionImportRequestBuilderBase<
    ReturnT,
    RequestConfigT extends ODataRequestConfig
  >
  extends MethodRequestBuilder<RequestConfigT>
  implements WithBatchReference
{
  private _batchReference: BatchReference;
  /**
   * Base class for function  and actions imports.
   * @param responseTransformer - Transformation function for the response.
   * @param requestConfig - Request config for a action or function import.
   */
  protected constructor(
    readonly responseTransformer: (data: any) => ReturnT,
    requestConfig: RequestConfigT
  ) {
    super(requestConfig);
  }
  /**
   * Execute request.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @param dataAccessor - A function to modify the received response data.
   * @returns A promise resolving to the requested return type.
   */
  async execute(
    destination: DestinationOrFetchOptions,
    dataAccessor?: (data: any) => any
  ): Promise<ReturnT> {
    return this.executeRaw(destination).then(response => {
      const data = dataAccessor
        ? { d: dataAccessor(response.data) }
        : response.data;
      return this.responseTransformer(data);
    });
  }

  /**
   * Execute request and return an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   */
  async executeRaw(
    destination: DestinationOrFetchOptions
  ): Promise<HttpResponse> {
    return this.build(destination).then(request => request.execute());
  }

  /**
   * Gets identifier for the batch request.
   * @returns Batch request identifier.
   */
  getBatchReference(): BatchReference {
    if (!this._batchReference) {
      this.setBatchId(uuid());
    }
    return this._batchReference;
  }

  /**
   * Sets user-defined identifier for the batch reference.
   * @param id - User-defined batch reuest identifier.
   */
  setBatchId(id: string): void {
    this._batchReference = { id };
  }
}
